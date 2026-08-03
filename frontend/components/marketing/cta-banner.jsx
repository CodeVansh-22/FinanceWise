import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="ambient-blur w-96 h-96 bg-primary-600/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> 14-Day Unlimited Free Trial
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          Ready to automate your accounting & tax compliance?
        </h2>

        <p className="text-slate-300 text-lg max-w-xl mx-auto font-normal">
          Join over 10,000+ businesses and CA firms saving over 20 hours every single week with FinanceWise.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" variant="emerald" className="w-full sm:w-auto text-base">
              Create Your Free Account <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 text-white hover:bg-slate-800">
              Talk to CA Specialist
            </Button>
          </Link>
        </div>

        <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
          <span>✓ Cancel anytime</span>
          <span>✓ Instant setup in 2 minutes</span>
          <span>✓ Free bank feeds</span>
        </div>
      </div>
    </section>
  );
}
