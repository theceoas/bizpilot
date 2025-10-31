"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BusinessForm } from "@/components/business-form"
import { Briefcase, Clock, Users, Calendar, CheckCircle } from "lucide-react"

export function CTASection() {
  return (
    <section id="apply" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-slate-700 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-slate-600 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl mb-6 sm:mb-8">
            <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            Ready to Get Your{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              AI System?
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 px-4">
            Fill out the form below and we'll create a custom proposal for your business
          </p>
        </div>

        {/* Business Form */}
        <div className="mb-8 sm:mb-12">
          <BusinessForm />
        </div>

        <div className="text-center text-slate-400 mb-12 sm:mb-16 px-4">
          <p className="text-sm sm:text-base mb-2">
            Questions? WhatsApp us or email us
          </p>
          <p className="text-xs sm:text-sm">
            Available Monday-Saturday, 9AM-6PM WAT
          </p>
        </div>

        {/* Footer */}
        <div className="pt-8 sm:pt-12 border-t border-white/20">
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-slate-300 text-sm sm:text-base font-medium">
              Built for Nigerian E-Commerce Businesses
            </span>
          </div>
          <p className="text-center text-slate-400 text-xs sm:text-sm">
            Powered by OpenAI, Meta Business API, Paystack
          </p>
        </div>
      </div>
    </section>
  )
}