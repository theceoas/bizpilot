import { Globe, Camera, Users } from "lucide-react"

export function ThreePillarsSection() {
  const pillars = [
    {
      icon: Globe,
      title: "Smart Shopping Website",
      description: "Sell through your own branded website or keep taking orders through WhatsApp and Instagram with AI-powered checkout.",
      benefit: "No missed orders, professional experience, and faster payment flow."
    },
    {
      icon: Camera,
      title: "AI Image Generator",
      description: "Upload raw product photos → AI transforms them into professional, ready-to-post images and ads automatically.",
      benefit: "Look like a big brand without paying for designers or wasting hours editing."
    },
    {
      icon: Users,
      title: "AI Team (Virtual Employees)",
      description: "24/7 AI assistants handle customer replies, track orders, run promos, and even give you internal business insights.",
      benefit: "Like hiring a full team — without paying salaries or managing people."
    }
  ]

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The Three Pillars
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your complete AI-powered business system
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-4 font-bold text-gray-900 border-b border-gray-200">
                    Part of the System
                  </th>
                  <th className="text-left p-4 font-bold text-gray-900 border-b border-gray-200">
                    What It Does
                  </th>
                  <th className="text-left p-4 font-bold text-gray-900 border-b border-gray-200">
                    Why It Matters
                  </th>
                </tr>
              </thead>
              <tbody>
                {pillars.map((pillar, index) => {
                  const IconComponent = pillar.icon
                  return (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-900">{pillar.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700 leading-relaxed border-b border-gray-100">
                        {pillar.description}
                      </td>
                      <td className="p-4 text-gray-700 leading-relaxed border-b border-gray-100">
                        {pillar.benefit}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-6">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-blue-50 border-b border-blue-100 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{pillar.title}</h3>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">What It Does</h4>
                    <p className="text-gray-700 leading-relaxed">{pillar.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Why It Matters</h4>
                    <p className="text-gray-700 leading-relaxed">{pillar.benefit}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}