import { Rocket, Clock } from "lucide-react"

export function ScarcitySection() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl p-6 sm:p-12 shadow-xl border border-red-100">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl mb-6 sm:mb-8">
            <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            🚀 Only 3 Deployment Slots Remaining
          </h2>

          <p className="text-base sm:text-xl text-gray-600 leading-relaxed mb-6">
            We only onboard a few sellers each month to ensure top-quality results.
            <br />
            Once these slots are filled, onboarding closes until the next month.
          </p>

          <div className="flex items-center justify-center gap-2 text-red-600">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Limited availability — secure your spot now</span>
          </div>
        </div>
      </div>
    </section>
  )
}