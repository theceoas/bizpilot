'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Eye, Play, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductShowcase {
  id: string
  title: string
  description: string
  thumbnail_url: string
  before_images: string[]
  after_images: string[]
  before_videos: string[]
  after_videos: string[]
}

export function ProductGeneration() {
  const [showcases, setShowcases] = useState<ProductShowcase[]>([])
  const [selectedShowcase, setSelectedShowcase] = useState<ProductShowcase | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'before' | 'after'>('before')
  const [showModal, setShowModal] = useState(false)

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleShowcases: ProductShowcase[] = [
      {
        id: '1',
        title: 'E-commerce Website Redesign',
        description: 'Complete transformation of an outdated e-commerce platform',
        thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
        before_images: [
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop'
        ],
        after_images: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
        ],
        before_videos: [],
        after_videos: []
      },
      {
        id: '2',
        title: 'CRM Dashboard Automation',
        description: 'From manual spreadsheets to intelligent automation',
        thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
        before_images: [
          'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop'
        ],
        after_images: [
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
        ],
        before_videos: [],
        after_videos: []
      },
      {
        id: '3',
        title: 'Customer Support System',
        description: 'Automated customer service with AI integration',
        thumbnail_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=200&fit=crop',
        before_images: [
          'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&h=400&fit=crop'
        ],
        after_images: [
          'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop'
        ],
        before_videos: [],
        after_videos: []
      }
    ]
    setShowcases(sampleShowcases)
  }, [])

  const openModal = (showcase: ProductShowcase) => {
    setSelectedShowcase(showcase)
    setCurrentImageIndex(0)
    setViewMode('before')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedShowcase(null)
  }

  const getCurrentImages = () => {
    if (!selectedShowcase) return []
    return viewMode === 'before' ? selectedShowcase.before_images : selectedShowcase.after_images
  }

  const nextImage = () => {
    const images = getCurrentImages()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    const images = getCurrentImages()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Business Transformation Showcase
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See real before and after transformations from our AI automation solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcases.map((showcase) => (
              <Card key={showcase.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openModal(showcase)}>
                <div className="relative">
                  <img
                    src={showcase.thumbnail_url}
                    alt={showcase.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="text-white opacity-0 hover:opacity-100 transition-opacity h-8 w-8" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{showcase.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{showcase.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{showcase.before_images.length + showcase.after_images.length} images</span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && selectedShowcase && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{selectedShowcase.title}</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex space-x-4 mb-4">
                  <Button
                    variant={viewMode === 'before' ? 'default' : 'outline'}
                    onClick={() => {
                      setViewMode('before')
                      setCurrentImageIndex(0)
                    }}
                  >
                    Before ({selectedShowcase.before_images.length})
                  </Button>
                  <Button
                    variant={viewMode === 'after' ? 'default' : 'outline'}
                    onClick={() => {
                      setViewMode('after')
                      setCurrentImageIndex(0)
                    }}
                  >
                    After ({selectedShowcase.after_images.length})
                  </Button>
                </div>
                
                {getCurrentImages().length > 0 && (
                  <div className="relative">
                    <img
                      src={getCurrentImages()[currentImageIndex]}
                      alt={`${viewMode} image ${currentImageIndex + 1}`}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    
                    {getCurrentImages().length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {getCurrentImages().length}
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                {getCurrentImages().length > 1 && (
                  <div className="flex space-x-2 mt-4 overflow-x-auto">
                    {getCurrentImages().map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className={cn(
                          "w-16 h-16 object-cover rounded cursor-pointer border-2",
                          currentImageIndex === index ? "border-blue-500" : "border-gray-300"
                        )}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <p className="text-gray-600">{selectedShowcase.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}