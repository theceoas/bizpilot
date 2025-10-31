import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BusinessForm } from "@/components/business-form"
import { Calendar, Settings, Rocket } from "lucide-react"

export function FeaturesSection() {
  const steps = [
    {
      step: "Step 1",
      title: "Submit Your Business Information",
      duration: "2 minutes",
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      description: "Fill out our form with your business details and we'll create a custom proposal for your AI system",
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "Step 2", 
      title: "We Build Your Custom System",
      duration: "7-10 days",
      icon: <Settings className="w-8 h-8 text-purple-600" />,
      description: "We create your AI, website, and dashboard customized for your products and customers - you approve everything before launch",
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "Step 3",
      title: "Go Live & Start Selling",
      duration: "Week 2",
      icon: <Rocket className="w-8 h-8 text-green-600" />,
      description: "Your AI starts working 24/7. We support you for 90 days and train you on everything.",
      color: "from-green-500 to-green-600"
    }
  ]

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 mb-6">
            HOW IT WORKS
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Get Your AI System in 3 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From application to launch, we handle everything while you focus on your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
                    {step.icon}
                  </div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {step.duration}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to get started with your AI system?
          </p>
          <BusinessForm />
        </div>
      </div>
    </section>
  )
}