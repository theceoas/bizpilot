'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Upload, Eye } from 'lucide-react'
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, uploadFile } from '@/lib/database'
import { Testimonial } from '@/lib/supabase'

export function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    business: '',
    content: '',
    quote: '',
    rating: 5,
    text_message_image_url: '',
    is_text_message: false,
    display_order: 0,
    is_featured: false
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    setIsLoading(true)
    const data = await getTestimonials()
    setTestimonials(data)
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      let imageUrl = formData.text_message_image_url

      // Upload image if a new file is selected
      if (imageFile) {
        const fileName = `testimonial-${Date.now()}-${imageFile.name}`
        const uploadedUrl = await uploadFile('testimonials', fileName, imageFile)
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      const testimonialData = {
        ...formData,
        text_message_image_url: imageUrl,
        is_active: true
      }

      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial.id, testimonialData)
      } else {
        await createTestimonial(testimonialData)
      }

      await loadTestimonials()
      resetForm()
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error saving testimonial:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      role: testimonial.role || '',
      company: testimonial.company || '',
      business: testimonial.business || '',
      content: testimonial.content,
      quote: testimonial.quote || '',
      rating: testimonial.rating || 5,
      text_message_image_url: testimonial.text_message_image_url || '',
      is_text_message: testimonial.is_text_message || false,
      display_order: testimonial.display_order || 0,
      is_featured: testimonial.is_featured || false
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      await deleteTestimonial(id)
      await loadTestimonials()
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      company: '',
      business: '',
      content: '',
      quote: '',
      rating: 5,
      text_message_image_url: '',
      is_text_message: false,
      display_order: 0,
      is_featured: false
    })
    setEditingTestimonial(null)
    setImageFile(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
  }

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading testimonials...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Testimonials Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role (Optional)</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., CEO, Manager"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="content">Testimonial Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  required
                  placeholder="Enter the testimonial content..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    min="0"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    placeholder="0 for default order"
                  />
                </div>
                <div className="flex items-center space-x-4 pt-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.is_text_message}
                      onChange={(e) => setFormData({ ...formData, is_text_message: e.target.checked })}
                    />
                    <span className="text-sm">Text Message</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    />
                    <span className="text-sm">Featured</span>
                  </label>
                </div>
              </div>
              <div>
                <Label htmlFor="image">Text Message Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-2"
                />
                {formData.text_message_image_url && (
                  <div className="text-sm text-gray-600">
                    Current image: <a href={formData.text_message_image_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? 'Saving...' : editingTestimonial ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <CardTitle className="text-lg">{testimonial.name}</CardTitle>
              <p className="text-sm text-gray-600">{testimonial.business}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-3">{testimonial.content || testimonial.quote}</p>
              {testimonial.rating && (
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-600 mr-2">Rating:</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {testimonial.text_message_image_url && (
                <div className="mb-4">
                  <img
                    src={testimonial.text_message_image_url}
                    alt="Text message"
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex gap-2 mb-4">
                {testimonial.is_text_message && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Text Message</span>
                )}
                {testimonial.is_featured && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Featured</span>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                {testimonial.text_message_image_url && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(testimonial.text_message_image_url, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => handleEdit(testimonial)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(testimonial.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No testimonials found. Add your first testimonial!</p>
        </div>
      )}
    </div>
  )
}