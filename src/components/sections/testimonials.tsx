'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Quote, MessageSquare } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { getTestimonials } from '@/lib/database'
import { Testimonial } from '@/lib/supabase'

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      const data = await getTestimonials()
      setTestimonials(data)
    } catch (error) {
      console.error('Error loading testimonials:', error)
      // Fallback to static testimonials if database fails
      setTestimonials([
        {
          id: '1',
          content: "The AI Business OS team delivered exactly what they promised. Professional, reliable, and results-driven.",
          quote: "The AI Business OS team delivered exactly what they promised. Professional, reliable, and results-driven.",
          name: "Chioma",
          business: "Beauty Products Seller",
          company: "Beauty Products Seller",
          rating: 5,
          text_message_image_url: undefined,
          created_at: new Date().toISOString(),
          is_active: true
        },
        {
          id: '2',
          content: "AI Business OS saved me 25 hours every week and boosted my sales by 40% in the first month.",
          quote: "AI Business OS saved me 25 hours every week and boosted my sales by 40% in the first month.",
          name: "Ada",
          business: "Fashion Seller",
          company: "Fashion Seller",
          rating: 5,
          text_message_image_url: undefined,
          created_at: new Date().toISOString(),
          is_active: true
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  if (isLoading) {
    return (
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-gray-100 p-6 rounded-lg">
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 ml-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              🎯 We&apos;re Building Systems Right Now
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              We&apos;re currently deploying AI systems for multiple Nigerian e-commerce businesses across different industries.
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Our clients are seeing their systems handle customer conversations, close sales automatically, and collect reviews - all while they focus on growing their business.
            </p>
            <p className="text-xl font-semibold text-gray-900 mb-8">
              Want to see how this works for YOUR business?
            </p>
            <Button 
              onClick={() => scrollToSection("apply")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Get My Custom AI Solution
            </Button>
          </div>
          
          {/* Fallback testimonials if database has content */}
          {testimonials.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <Quote className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg text-gray-700 leading-relaxed mb-4 italic">
                        &ldquo;{testimonial.content || testimonial.quote}&rdquo;
                      </p>
                      {testimonial.text_message_image_url && (
                        <div className="mb-4">
                          <button
                            onClick={() => openImageModal(testimonial.text_message_image_url!)}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
                          >
                            <MessageSquare className="h-4 w-4" />
                            View Text Message
                          </button>
                        </div>
                      )}
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">— {testimonial.name}</p>
                        <p className="text-gray-600">{testimonial.company || testimonial.business}</p>
                        {testimonial.role && (
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={closeImageModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Customer Text Message</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="flex justify-center">
              <div className="relative max-w-full">
                <Image
                  src={selectedImage}
                  alt="Customer text message"
                  width={600}
                  height={400}
                  className="h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}