import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Laptop, HeartPulse, HardHat, Factory, Utensils } from 'lucide-react';

export const metadata = {
  title: 'Industries | FinanceWise - Industry-Specific Financial Automation',
  description: 'Specialized accounting workflows for E-commerce, SaaS, Healthcare, Construction, Manufacturing, and Hospitality.',
};

export default function IndustriesPage() {
  const industries = [
    { name: 'E-Commerce & D2C', desc: 'Automated sales reconciliation across Amazon, Shopify, and Razorpay feeds.', icon: ShoppingBag },
    { name: 'SaaS & Tech Startups', desc: 'Subscription billing, MRR metrics, burn rate analytics, and R&D tax credits.', icon: Laptop },
    { name: 'Healthcare & Clinics', desc: 'Multi-doctor payout processing, pharmacy inventory accounting, and compliance.', icon: HeartPulse },
    { name: 'Real Estate & Construction', desc: 'Project cost accounting, contractor TDS management, and material procurement ledgers.', icon: HardHat },
    { name: 'Manufacturing & MSME', desc: 'Raw material stock ledgers, GST e-way bill generation, and jobwork billing.', icon: Factory },
    { name: 'Hospitality & Restaurants', desc: 'Daily POS reconciliation, food inventory cost tracking, and GST filings.', icon: Utensils },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="emerald" className="px-3 py-1">Industry Solutions</Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Accounting tailored to your industry verticals
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Pre-configured charts of accounts, tax compliance templates, and integrations for every major sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <Card key={idx} className="p-8 space-y-4 border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{ind.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{ind.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
