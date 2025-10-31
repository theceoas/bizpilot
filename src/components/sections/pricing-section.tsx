"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BusinessForm } from "@/components/business-form"
import { CheckCircle, X, Star, Zap, Shield, Clock, Settings, Users, BarChart3, DollarSign } from "lucide-react"

export function PricingSection() {
  const customizationFactors = [
    {
      icon: <Settings className="w-6 h-6 text-blue-600" />,
      title: "Your products and pricing structure",
      description: "We customize the AI to understand your specific products, pricing, and sales process"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Your customer volume and sales channels",
      description: "System scales based on your WhatsApp, Instagram, and website traffic"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-600" />,
      title: "Your specific automation needs",
      description: "Custom workflows for your unique business processes and customer journey"
    },
    {
      icon: <Shield className="w-6 h-6 text-orange-600" />,
      title: "The complexity of your product catalog",
      description: "Advanced features for businesses with large or complex product inventories"
    }
  ]

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            💰 Custom Pricing for Your Business
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Every business is different. Your system is customized based on your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12">
          {/* Customization Factors */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Your system is customized based on:
            </h3>
            {customizationFactors.map((factor, index) => (
              <Card key={index} className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {factor.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-gray-900">{factor.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{factor.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Explanation */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
                Get Your Custom Quote
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Personalized pricing based on your business needs
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white rounded-lg p-6 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We need to audit your business first to give you an accurate quote and show you exactly how fast you&apos;ll see ROI.
                </p>
                <p className="text-gray-900 font-semibold">
                  This isn&apos;t a one-size-fits-all template. It&apos;s YOUR system, built specifically for YOUR business.
                </p>
              </div>
              
              <BusinessForm />
              
              <p className="text-sm text-gray-500 mt-4">
                Free consultation • No obligation • Custom pricing in 24 hours
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Benefits */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-white max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Why Custom Pricing Works Better
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Pay for What You Need</h4>
                  <p className="text-gray-600 text-sm">No unnecessary features or overpaying for unused functionality</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Faster ROI</h4>
                  <p className="text-gray-600 text-sm">System designed specifically for your business model and profit margins</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Perfect Fit</h4>
                  <p className="text-gray-600 text-sm">Built to match your exact workflow and customer experience</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}