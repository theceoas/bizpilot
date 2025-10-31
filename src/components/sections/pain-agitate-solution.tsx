"use client"

import { X, CheckCircle } from "lucide-react"

export function PainAgitateSolution() {
  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Perfect For Nigerian Businesses That:
          </h2>
          <div className="flex items-center justify-center mb-8">
            <span className="text-2xl mr-2">📍</span>
            <p className="text-lg text-gray-600">
              If this is you, keep reading...
            </p>
          </div>
          
          {/* Who This Is For List */}
          <div className="max-w-2xl mx-auto text-left mb-12">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>Make at least ₦500,000 monthly in revenue</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>Sell on Instagram, WhatsApp, or their own website</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>Are overwhelmed with customer messages</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>Struggling with creating quality content on a consistent basis</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>Want to scale without hiring more staff</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>Lose sales because they respond too slowly</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - THE PROBLEM */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <X className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl font-bold text-red-800 mb-2">
                You're Losing Money Every Day
              </h3>
            </div>
            
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">•</span>
                <span>Customer messages go unanswered for hours</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">•</span>
                <span>Sales happen only when you&apos;re available</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">•</span>
                <span>You spend 4+ hours daily on repetitive DMs</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">•</span>
                <span>Your products don&apos;t get views on social media</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">•</span>
                <span>Nobody follows up with happy customers</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">•</span>
                <span>Your phone photos don&apos;t look professional</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">•</span>
                <span>You&apos;re always working, never growing</span>
              </li>
            </ul>
          </div>

          {/* Right Column - THE SOLUTION */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">
                AI That Works 24/7 For You
              </h3>
            </div>
            
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">•</span>
                <span>AI responds to every message in 8 seconds</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">•</span>
                <span>Sales close at 2AM while you sleep</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">•</span>
                <span>AI handles all of your customer conversations</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">•</span>
                <span>Automatic review collection from every buyer</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">•</span>
                <span>Professional product photos and videos in minutes</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">•</span>
                <span>Focus on growing, not grinding</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}