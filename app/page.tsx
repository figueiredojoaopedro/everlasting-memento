import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { MementoSection } from "@/components/sections/MementoSection";
import { PrivacyGateSection } from "@/components/sections/PrivacyGateSection";
import { WhyNotSocialMedia } from "@/components/sections/WhyNotSocialMedia";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col items-center z-10">
        <HeroSection />
        <MementoSection />
        <PrivacyGateSection />
        <WhyNotSocialMedia />
        <HowItWorks />
        <TestimonialSection />
        {/*<ShowcaseCarousel />*/}
        <PricingSection />
        <FeatureGrid />
      </main>

      <FooterSection />
    </div>
  );
}
