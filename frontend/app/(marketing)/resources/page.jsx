import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalculatorPreview } from '@/components/marketing/calculator-preview';
import { BookOpen, FileSpreadsheet, Download, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Resources | FinanceWise - Free Financial Calculators & Guides',
  description: 'Access free financial tools, GST return templates, SIP compound interest calculators, and CA guides.',
};

export default function ResourcesPage() {
  const downloads = [
    { title: 'GSTR-3B Filing Checklist PDF', type: 'PDF Guide' },
    { title: 'Startup Burn Rate Excel Template', type: 'Spreadsheet' },
    { title: 'Income Tax Slab Guide FY 2025-26', type: 'E-Book' },
    { title: 'Freelancer Invoice Checklist', type: 'PDF Template' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="emerald" className="px-3 py-1">Resource Center</Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Free Financial Tools & Accounting Resources
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Empower your business with downloadable templates, tax guides, and interactive calculators.
            </p>
          </div>

          <CalculatorPreview />

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Download Free Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {downloads.map((d, i) => (
                <Card key={i} className="p-6 space-y-4 border-slate-200 dark:border-slate-800">
                  <Badge variant="secondary">{d.type}</Badge>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{d.title}</h4>
                  <Button variant="outline" size="sm" className="w-full justify-between">
                    <span>Download</span>
                    <Download className="w-4 h-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
