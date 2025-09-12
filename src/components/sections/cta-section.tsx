"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ApplicationForm } from "@/components/application-form"
import { Briefcase, Clock, Users, Calendar } from "lucide-react"

export function CTASection() {
  const urgencyItems = [
    { icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Only 3 Deployment Slots Left" },
    { icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />, text: "This Month Only" },
    { icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />, text: "10-Day Launch Guarantee" }
  ]

  return (
    <section id="apply" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-slate-700 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-slate-600 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl mb-6 sm:mb-8">
            <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
          Ready to Scale Your Store{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Without the Chaos?
          </span>
        </h2>

        <div className="flex flex-col gap-3 sm:gap-4 items-center justify-center mb-8 sm:mb-12 px-4">
          {urgencyItems.map((item, index) => (
            <Badge 
              key={index}
              variant="secondary"
              className="bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium w-full max-w-xs sm:max-w-none sm:w-auto"
            >
              <span className="flex items-center gap-2 justify-center">
                {item.icon}
                {item.text}
              </span>
            </Badge>
          ))}
        </div>

        <div className="mb-6 sm:mb-8 px-4">
          <ApplicationForm>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 animate-pulse w-full sm:w-auto"
            >
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
              Apply for Your AI System Today →
            </Button>
          </ApplicationForm>
        </div>

        <div className="text-center text-slate-300 mb-12 sm:mb-16">
          <p className="text-sm sm:text-base mb-2">
            Secure one of the remaining slots now — protected by our No-Stress Guarantee.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-8 sm:pt-12 border-t border-white/20">
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-lg sm:text-xl font-bold">BizPilot™</div>
              <div className="text-xs sm:text-sm text-slate-400">by MANACQ AI</div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-400">
            Your Personal Team of AI Assistants — Working 24/7
          </p>
        </div>
      </div>
    </section>
  )
}