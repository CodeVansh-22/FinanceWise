import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PLATFORM_SERVICES } from '@/lib/constants';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const dynamicParams = true;

export function generateStaticParams() {
  return (PLATFORM_SERVICES || []).map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const service = (PLATFORM_SERVICES || []).find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <main className="flex-grow py-24 text-center space-y-4">
          <h1 className="text-3xl font-bold">Service Solution</h1>
          <p className="text-slate-500">Service module information page.</p>
          <Link href="/services"><Button>Back to All Services</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  const features = service.features || ['Automated workflow', 'Enterprise security', 'Audit compliant'];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <Link href="/services" className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline">
            ← Back to Services
          </Link>

          <div className="space-y-4">
            <Badge variant="emerald" className="px-3 py-1">Enterprise Solution</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
              {service.title || service.name}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              {service.description}
            </p>
          </div>

          <Card className="p-8 lg:p-12 border-slate-200 dark:border-slate-800 space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Key Features & Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/70">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{feature}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automated workflow with 99.99% accuracy</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Ready to get started?</p>
                <p className="text-xs text-slate-500">14-day free trial. No credit card required.</p>
              </div>
              <Link href="/register">
                <Button size="lg" variant="primary">
                  Try {service.title || service.name} Free <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}
