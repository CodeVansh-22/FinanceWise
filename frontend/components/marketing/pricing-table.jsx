'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PRICING_PLANS } from '@/lib/constants';
import { Check, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald" className="px-3 py-1">Transparent Pricing</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Plans tailored for every growth stage
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            No hidden fees. Scale smoothly from solo freelancer to enterprise CA firm.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-800 p-1 relative transition-colors focus:outline-none"
            >
              <div
                className={`w-6 h-6 rounded-full bg-primary-600 transition-transform duration-200 ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
              Yearly <Badge variant="emerald" className="text-[10px] px-2">Save 20%</Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, index) => {
            const price = isAnnual ? plan.priceYearly : plan.priceMonthly;
            return (
              <Card
                key={plan.id || plan.name || index}
                className={`relative p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-primary-500 shadow-2xl shadow-primary-500/10 scale-105 bg-white dark:bg-slate-900'
                    : 'border border-slate-200 dark:border-slate-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary-600 to-indigo-600 text-white text-xs font-bold shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Most Popular Tier
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[36px]">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                      {price === 0 ? 'Free' : formatCurrency(price)}
                    </span>
                    {price > 0 && <span className="text-xs text-slate-400 font-semibold">/ month</span>}
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link href="/register">
                    <Button
                      variant={plan.popular ? 'primary' : 'outline'}
                      className="w-full"
                    >
                      {plan.ctaText}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
