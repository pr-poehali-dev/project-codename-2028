import HeroSection from "@/components/sections/HeroSection"
import PricingSection from "@/components/sections/PricingSection"
import GallerySection from "@/components/sections/GallerySection"
import JourneyFaqSection from "@/components/sections/JourneyFaqSection"
import ContactSection from "@/components/sections/ContactSection"

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0B0F12] text-white">
      <HeroSection />
      <PricingSection />
      <GallerySection />
      <JourneyFaqSection />
      <ContactSection />
    </div>
  )
}

export default Index