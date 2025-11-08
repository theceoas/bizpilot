import { HeroSection } from "@/components/sections/hero-section"
import { PainAgitateSolution } from "@/components/sections/pain-agitate-solution"
import { SolutionSection } from "@/components/sections/solution-section"
import { StandoutSection } from "@/components/sections/standout-section"
import { BeforeAfterSection } from "@/components/sections/before-after"
import { Testimonials } from "@/components/sections/testimonials"
import { GuaranteeSection } from "@/components/sections/guarantee-section"
import { DemoSection } from "@/components/sections/demo-section"

import { CTASection } from "@/components/sections/cta-section"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <main className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
      <Navigation />
      <HeroSection />
      <PainAgitateSolution />
      <SolutionSection />
      <StandoutSection />
      <BeforeAfterSection />
      <Testimonials />
      <DemoSection />

      <GuaranteeSection />
      <CTASection />
    </main>
  )
}
