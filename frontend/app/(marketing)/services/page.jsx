import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PLATFORM_SERVICES } from '@/lib/constants';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Services | FinanceWise - Comprehensive Financial & Accounting Solutions',
  description: 'Explore FinanceWise services: Accounting, Bookkeeping, GST Filing, Income Tax, Payroll, Audit Support, and Investment Planning.',
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="emerald" className="px-3 py-1">Platform Services</Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              End-to-End Accounting & Finance Services
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Automate your entire financial operation from daily expense tracking to annual CA statutory audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLATFORM_SERVICES.map((service) => (
              <Card key={service.id} className="p-8 space-y-6 flex flex-col justify-between border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{service.description}</p>
                  
                  <ul className="space-y-2 pt-2">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link href={`/services/${service.slug}`}>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Explore Feature</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
