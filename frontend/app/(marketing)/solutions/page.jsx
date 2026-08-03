import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Briefcase, Building, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Solutions | FinanceWise - Tailored for Freelancers, Startups & CA Firms',
  description: 'Discover specialized accounting solutions designed for individuals, freelancers, CA firms, small businesses, and MSMEs.',
};

export default function SolutionsPage() {
  const solutions = [
    {
      title: 'For Solo Freelancers & Creators',
      desc: 'Simple expense tracking, GST invoices, quarterly tax estimations, and automated client payment reminders.',
      icon: User,
      badge: 'Freelancers'
    },
    {
      title: 'For Startups & MSMEs',
      desc: 'Full cash flow visibility, burn rate alerts, direct bank reconciliation, and automated GSTR-3B filings.',
      icon: Briefcase,
      badge: 'Startups & MSMEs'
    },
    {
      title: 'For CA & Accounting Firms',
      desc: 'Multi-client portal, bulk filing automation, tamper-proof audit trails, and client invitation links.',
      icon: Building,
      badge: 'CA Firms'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="emerald" className="px-3 py-1">Tailored Financial Operating System</Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Solutions crafted for your exact workflow
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Whether you are a solo consultant or an enterprise CA agency, FinanceWise fits your financial needs perfectly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Card key={idx} className="p-8 space-y-6 flex flex-col justify-between border-slate-200 dark:border-slate-800">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary">{s.badge}</Badge>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{s.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>

                  <Link href="/register">
                    <Button variant="primary" className="w-full">
                      Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
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
