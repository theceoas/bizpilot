import { HeroSection } from "@/components/sections/hero-section"
import { PainAgitateSolution } from "@/components/sections/pain-agitate-solution"
import { SolutionSection } from "@/components/sections/solution-section"
import { StandoutSection } from "@/components/sections/standout-section"
import { BeforeAfterSection } from "@/components/sections/before-after"
import { ThreePillarsSection } from "@/components/sections/three-pillars"
import { Testimonials } from "@/components/sections/testimonials"
import { GuaranteeSection } from "@/components/sections/guarantee-section"
import { ScarcitySection } from "@/components/sections/scarcity-section"
import { CTASection } from "@/components/sections/cta-section"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PainAgitateSolution />
      <SolutionSection />
      <StandoutSection />
      <BeforeAfterSection />
      <ThreePillarsSection />
      <Testimonials />
      <GuaranteeSection />
      <ScarcitySection />
      <CTASection />
    </main>
  )
}
