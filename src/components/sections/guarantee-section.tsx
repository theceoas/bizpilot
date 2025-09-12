import { Badge } from "@/components/ui/badge"
import { ShieldCheck } from "lucide-react"

export function GuaranteeSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl p-6 sm:p-12 shadow-xl border">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-6 sm:mb-8">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 mb-4 sm:mb-6 text-xs sm:text-sm">
            NO-STRESS GUARANTEE
          </Badge>

          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our No-Stress Guarantee
          </h2>

          <p className="text-base sm:text-xl text-gray-600 leading-relaxed">
            We stand behind our work 100%.
            <br />
            If your system isn&apos;t delivered exactly as described,
            <br />
            or it doesn&apos;t perform the way we&apos;ve outlined during your onboarding,
            <br />
            we&apos;ll give you a full refund — <span className="font-semibold text-gray-900">no delays, no excuses</span>.
            <br /><br />
            This guarantee protects you and ensures you get exactly what we promise.
          </p>
        </div>
      </div>
    </section>
  )
}