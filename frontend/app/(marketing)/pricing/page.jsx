import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PricingTable } from '@/components/marketing/pricing-table';
import { FaqAccordion } from '@/components/marketing/faq-accordion';

export const metadata = {
  title: 'Pricing | FinanceWise - Transparent Accounting & Tax Plans',
  description: 'Choose the right FinanceWise plan for your business. Affordable pricing for freelancers, growing startups, and enterprise CA firms.',
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow">
        <PricingTable />
        <FaqAccordion />
      </main>
      <Footer />
    </div>
  );
}
