'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, ArrowRight } from 'lucide-react'
import { BeforeAfterImage } from '@/lib/supabase'

interface TransformationCardProps {
  transformation: BeforeAfterImage
  onClick?: () => void
  featured?: boolean
}

export function TransformationCard({ transformation, onClick, featured = false }: TransformationCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showAfter, setShowAfter] = useState(false)

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-gray-100">
          {/* Before Image */}
          <img
            src={transformation.before_image_url}
            alt={`${transformation.title} - Before`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              showAfter ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* After Image */}
          <img
            src={transformation.after_image_url}
            alt={`${transformation.title} - After`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              showAfter ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white">
              <Eye className="w-5 h-5" />
              <span className="text-sm font-medium">View Details</span>
            </div>
          </div>

          {/* Before/After Toggle */}
          <div className="absolute top-3 right-3">
            <div 
              className="flex items-center gap-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium cursor-pointer hover:bg-opacity-100 transition-all"
              onMouseEnter={() => setShowAfter(true)}
              onMouseLeave={() => setShowAfter(false)}
            >
              <span className={showAfter ? 'text-green-600' : 'text-gray-600'}>
                {showAfter ? 'After' : 'Before'}
              </span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                Featured
              </Badge>
            </div>
          )}

          {/* Loading State */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400 text-sm">Loading...</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {transformation.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {transformation.description}
          </p>
          
          {/* Stats or Additional Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Transformation</span>
            <div className="flex items-center gap-1">
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}