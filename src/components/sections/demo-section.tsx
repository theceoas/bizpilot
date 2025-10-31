"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Zap, Target } from "lucide-react"
import { WebhookChat } from "@/components/webhook-chat"

export function DemoSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="demo" className="py-12 sm:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-semibold mb-4 sm:mb-6 text-xs sm:text-sm">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            See It In Action
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Experience Your AI Assistant
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-4 sm:mb-6">
            This is a <strong>live demo</strong> connected to our actual AI system. Try asking about our services, pricing, or request a quote.
          </p>
          <p className="text-base text-gray-700 mb-8">
            Watch how it responds in seconds with intelligent answers. This is what YOUR customers will experience.
          </p>
        </div>

        <div className="w-full">
          <WebhookChat />
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            This exact experience can be yours in 7 days
          </div>
          <div>
            <Button 
              size="lg"
              onClick={() => scrollToSection("apply")}
              className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Get My Custom AI Solution
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}