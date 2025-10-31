'use client'

import { useState, useEffect } from 'react'
import { getBeforeAfterImages } from '@/lib/database'
import { BeforeAfterImage } from '@/lib/supabase'
import { TransformationCard } from '@/components/transformation-card'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TransformationsPage() {
  const [images, setImages] = useState<BeforeAfterImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const data = await getBeforeAfterImages()
      setImages(data)
    } catch (error) {
      console.error('Error loading before/after images:', error)
      setImages([])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Transformations
          </h1>
          <p className="text-lg text-gray-600">
            Explore all our AI-powered product transformations
          </p>
        </div>

        {/* Transformations Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <TransformationCard key={image.id} transformation={image} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No transformations yet
              </h3>
              <p className="text-gray-600 mb-6">
                Check back soon to see amazing AI-powered transformations!
              </p>
              <Link href="/">
                <Button>
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}