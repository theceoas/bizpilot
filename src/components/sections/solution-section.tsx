import { Bot, Globe, MessageCircle, BarChart3, Monitor } from "lucide-react"

export function SolutionSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-4xl mb-4">🤖</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Your Complete AI Business System
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Everything you need to automate your business and scale without the stress
          </p>
          
          {/* Benefits */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="font-semibold text-blue-900 mb-1">⚡ Goes Live Fast</div>
                <div className="text-blue-700">Ready in 7-10 days</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="font-semibold text-green-900 mb-1">🔄 Easy Integration</div>
                <div className="text-green-700">Works with your existing tools</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="font-semibold text-purple-900 mb-1">👥 No Tech Skills</div>
                <div className="text-purple-700">We handle everything</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="font-semibold text-orange-900 mb-1">💰 One Payment</div>
                <div className="text-orange-700">Yours forever</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* WhatsApp & Instagram AI Sales Agent */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Bot className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                1. WhatsApp & Instagram AI Sales Agent
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">→</span>
                <span>Answers questions, sends prices, takes orders, processes payments</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">→</span>
                <span>Works 24/7, never sleeps, responds in seconds</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">→</span>
                <span>Handles 10+ conversations simultaneously</span>
              </li>
            </ul>
          </div>

          {/* Professional Product Catalog */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                2. Professional Product Catalog & Media
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">→</span>
                <span>AI-enhanced product photos and videos (backgrounds, lighting)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">→</span>
                <span>Auto-generated descriptions and captions</span>
              </li>
            </ul>
          </div>

          {/* Smart Follow-Up System */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                3. Smart Follow-Up System
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 mt-1">→</span>
                <span>Automatically requests reviews after delivery</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 mt-1">→</span>
                <span>Collects testimonials and customer photos</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 mt-1">→</span>
                <span>Builds your social proof on autopilot</span>
              </li>
            </ul>
          </div>

          {/* Real-Time Dashboard */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                4. Real-Time Dashboard
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2 mt-1">→</span>
                <span>See every sale as it happens</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2 mt-1">→</span>
                <span>Track AI performance and conversions</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2 mt-1">→</span>
                <span>Know exactly what&apos;s making you money</span>
              </li>
            </ul>
          </div>

          {/* Professional Website - Centered */}
          <div className="md:col-span-2 md:max-w-lg md:mx-auto bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                <Monitor className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                5. High-Quality Professional Website
              </h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-teal-600 mr-2 mt-1">→</span>
                <span>Mobile-optimized shopping experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2 mt-1">→</span>
                <span>Professional design that builds trust</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2 mt-1">→</span>
                <span>Easy browsing and purchasing for customers</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}