import React from 'react';
import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Rajesh Sharma, FCA',
    role: 'Managing Partner, Sharma & Associates CA Firm',
    content: 'FinanceWise eliminated 80% of our manual GST filing workloads across 40+ client accounts. The ITC reconciliation module alone saves us hours every single tax period.',
    rating: 5,
  },
  {
    name: 'Ananya Roy',
    role: 'Founder & CEO, TechSprout Startup',
    content: 'As a startup founder, I needed Stripe and Brex-level financial reporting without hiring a full-time CFO. FinanceWise gives us exact cash burn forecasts and clean investor PDFs.',
    rating: 5,
  },
  {
    name: 'Vikram Mehta',
    role: 'Independent Product Designer & Freelancer',
    content: 'Creating GST-compliant invoices and tracking incoming retainer payments is completely painless now. Highly recommended for any solo professional in India.',
    rating: 5,
  }
];

export function TestimonialSlider() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">Loved by Finance Professionals</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">What our users have to say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <Card key={idx} className="p-8 border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
