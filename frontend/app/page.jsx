import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/marketing/hero-section';
import { TrustSection } from '@/components/marketing/trust-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { CalculatorPreview } from '@/components/marketing/calculator-preview';
import { PricingTable } from '@/components/marketing/pricing-table';
import { TestimonialSlider } from '@/components/marketing/testimonial-slider';
import { FaqAccordion } from '@/components/marketing/faq-accordion';
import { CtaBanner } from '@/components/marketing/cta-banner';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <TrustSection />
        <FeaturesSection />
        <CalculatorPreview />
        <PricingTable />
        <TestimonialSlider />
        <FaqAccordion />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
