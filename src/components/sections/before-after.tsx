'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getBeforeAfterImages } from '@/lib/database'
import { BeforeAfterImage } from '@/lib/supabase'
import { TransformationCard } from '@/components/transformation-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function BeforeAfterSection() {
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
      // Fallback to static text comparisons if database fails
      setImages([])
    } finally {
      setIsLoading(false)
    }
  }

  // Get featured transformations (max 3)
  const featuredImages = images.filter(img => img.is_featured).slice(0, 3)
  const hasFeaturedImages = featuredImages.length > 0

  // Fallback static comparisons for when no images are available
  const fallbackComparisons = [
    {
      before: "Constantly switching between WhatsApp and Instagram to reply to messages",
      after: "Every message auto-answered instantly"
    },
    {
      before: "Manually sending bank details and confirming payments",
      after: "Payments auto-confirmed and tracked"
    },
    {
      before: "Hiring staff to manage DMs and posting",
      after: "AI team works 24/7, no salaries needed"
    },
    {
      before: "Growth capped by time and chaos",
      after: "Easily scale to 10x orders without extra effort"
    }
  ]

  if (isLoading) {
    return (
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-gray-100 p-6 rounded-lg">
                    <div className="h-40 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Use images if available, otherwise fallback to text comparisons
  const hasImages = images.length > 0

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {hasFeaturedImages ? 'Featured Transformations' : hasImages ? 'Product Transformations' : 'Before vs After AI Business OS'}
          </h2>
          <p className="text-lg text-gray-600">
            {hasFeaturedImages ? 'See our best transformation results' : hasImages ? 'See how our AI transforms your products' : 'Transform your business operations'}
          </p>
        </div>

        {hasFeaturedImages ? (
          /* Featured Transformations */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredImages.map((image) => (
                <TransformationCard key={image.id} transformation={image} />
              ))}
            </div>
            <div className="text-center">
              <Link href="/transformations">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Show More Transformations
                </Button>
              </Link>
            </div>
          </>
        ) : hasImages ? (
          /* Image-based Before/After */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {images.map((image) => (
              <div key={image.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{image.title}</h3>
                  {image.description && (
                    <p className="text-gray-600 mb-4">{image.description}</p>
                  )}
                </div>
                <div className="grid grid-cols-2">
                  <div className="bg-red-50 p-4">
                    <h4 className="text-lg font-semibold text-red-600 mb-3">Before</h4>
                    <div className="relative w-full h-48">
                      <Image
                        src={image.before_image_url}
                        alt="Before"
                        fill
                        className="object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="bg-green-50 p-4">
                    <h4 className="text-lg font-semibold text-green-600 mb-3">After</h4>
                    <div className="relative w-full h-48">
                      <Image
                        src={image.after_image_url}
                        alt="After"
                        fill
                        className="object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Fallback Text-based Before/After */
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-4 border-b-2 border-gray-200">
                        <h2 className="text-2xl sm:text-3xl font-bold text-red-600">Before AI Business OS</h2>
                      </th>
                      <th className="text-left p-4 border-b-2 border-gray-200">
                        <h2 className="text-2xl sm:text-3xl font-bold text-green-600">After AI Business OS</h2>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fallbackComparisons.map((comparison, index) => (
                      <tr key={index} className={index % 2 === 0 ? "border-b border-gray-100" : "border-b border-gray-100 bg-gray-50"}>
                        <td className="p-4 text-gray-700 leading-relaxed">
                          {comparison.before}
                        </td>
                        <td className="p-4 text-gray-700 leading-relaxed">
                          {comparison.after}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-6">
              {fallbackComparisons.map((comparison, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-red-50 border-b border-red-100 p-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">Before AI Business OS</h3>
                    <p className="text-gray-700 leading-relaxed">{comparison.before}</p>
                  </div>
                  <div className="bg-green-50 p-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">After AI Business OS</h3>
                    <p className="text-gray-700 leading-relaxed">{comparison.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}