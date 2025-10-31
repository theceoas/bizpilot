'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Eye, Star } from 'lucide-react'
import { getBeforeAfterImages, createBeforeAfterImage, updateBeforeAfterImage, deleteBeforeAfterImage, uploadFile } from '@/lib/database'
import { BeforeAfterImage } from '@/lib/supabase'

export function BeforeAfterManager() {
  const [images, setImages] = useState<BeforeAfterImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<BeforeAfterImage | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    before_image_url: '',
    after_image_url: '',
    is_featured: false
  })
  const [beforeImageFile, setBeforeImageFile] = useState<File | null>(null)
  const [afterImageFile, setAfterImageFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    setIsLoading(true)
    const data = await getBeforeAfterImages()
    setImages(data)
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      let beforeImageUrl = formData.before_image_url
      let afterImageUrl = formData.after_image_url

      // Upload before image if a new file is selected
      if (beforeImageFile) {
        const fileName = `before-${Date.now()}-${beforeImageFile.name}`
        const uploadedUrl = await uploadFile('before-after', fileName, beforeImageFile)
        if (uploadedUrl) {
          beforeImageUrl = uploadedUrl
        }
      }

      // Upload after image if a new file is selected
      if (afterImageFile) {
        const fileName = `after-${Date.now()}-${afterImageFile.name}`
        const uploadedUrl = await uploadFile('before-after', fileName, afterImageFile)
        if (uploadedUrl) {
          afterImageUrl = uploadedUrl
        }
      }

      const imageData = {
        ...formData,
        before_image_url: beforeImageUrl,
        after_image_url: afterImageUrl,
        is_active: true
      }

      if (editingImage) {
        await updateBeforeAfterImage(editingImage.id, imageData)
      } else {
        await createBeforeAfterImage(imageData)
      }

      await loadImages()
      resetForm()
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error saving before/after image:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleEdit = (image: BeforeAfterImage) => {
    setEditingImage(image)
    setFormData({
      title: image.title,
      description: image.description || '',
      before_image_url: image.before_image_url,
      after_image_url: image.after_image_url,
      is_featured: image.is_featured || false
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this before/after image?')) {
      await deleteBeforeAfterImage(id)
      await loadImages()
    }
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', before_image_url: '', after_image_url: '', is_featured: false })
    setEditingImage(null)
    setBeforeImageFile(null)
    setAfterImageFile(null)
  }

  const handleBeforeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setBeforeImageFile(file)
  }

  const handleAfterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setAfterImageFile(file)
  }

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading before/after images...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Before/After Images Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Before/After
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingImage ? 'Edit Before/After Image' : 'Add New Before/After Image'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="before-image">Before Image</Label>
                  <Input
                    id="before-image"
                    type="file"
                    accept="image/*"
                    onChange={handleBeforeImageChange}
                    className="mb-2"
                  />
                  {formData.before_image_url && (
                    <div className="text-sm text-gray-600">
                      Current: <a href={formData.before_image_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="after-image">After Image</Label>
                  <Input
                    id="after-image"
                    type="file"
                    accept="image/*"
                    onChange={handleAfterImageChange}
                    className="mb-2"
                  />
                  {formData.after_image_url && (
                    <div className="text-sm text-gray-600">
                      Current: <a href={formData.after_image_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="featured" className="text-sm font-medium">
                  Feature this transformation (max 3 will be shown)
                </Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? 'Saving...' : editingImage ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="relative">
            {image.is_featured && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg">{image.title}</CardTitle>
              {image.description && (
                <p className="text-sm text-gray-600">{image.description}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Before</h4>
                  <div className="relative w-full h-32">
                    <Image
                      src={image.before_image_url}
                      alt="Before"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">After</h4>
                  <div className="relative w-full h-32">
                    <Image
                      src={image.after_image_url}
                      alt="After"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(image.before_image_url, '_blank')}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Before
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(image.after_image_url, '_blank')}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  After
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(image)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(image.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No before/after images found. Add your first comparison!</p>
        </div>
      )}
    </div>
  )
}