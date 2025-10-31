"use client"

import { Button } from "@/components/ui/button"
import { BusinessForm } from "@/components/business-form"
import { Rocket } from "lucide-react"

export function HeroSection() {


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-1/4 w-72 h-72 bg-gradient-to-r from-slate-300 to-blue-300 rounded-full opacity-15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-1/4 w-64 h-64 bg-gradient-to-r from-blue-300 to-slate-300 rounded-full opacity-15 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-r from-gray-300 to-slate-300 rounded-full opacity-10 blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-20">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight px-2">
            Sell More While{" "}
            <span className="bg-gradient-to-r from-slate-600 via-blue-600 to-slate-700 bg-clip-text text-transparent">
              Working Less
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-8 sm:mb-12 leading-relaxed px-4 max-w-3xl mx-auto">
            Your complete AI system that handles orders, customers, and follow-ups 24/7 - so you can focus on growing your business
          </p>

          {/* Benefits List */}
          <div className="mb-8 sm:mb-12 px-4 max-w-2xl mx-auto">
            <p className="text-lg font-semibold text-gray-800 mb-4">Join 10+ Nigerian businesses already using AI to:</p>
            <ul className="text-left text-gray-600 space-y-2 text-base sm:text-lg">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Respond to customers in seconds (not hours)
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Close sales 24/7 (even while sleeping)
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Create engaging social media content automatically
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Generate professional product descriptions and posts
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Get 5x more reviews automatically
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Save 15-20 hours per week on manual work
              </li>
            </ul>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <BusinessForm>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                Get My Custom AI Solution
              </Button>
            </BusinessForm>
          </div>
        </div>
      </div>
    </section>
  )
}