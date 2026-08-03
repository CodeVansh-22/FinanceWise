'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, ShieldCheck, DollarSign, Calculator, Sparkles } from 'lucide-react';

export default function FinancialPlanningPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(15000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);

  // SIP Compound Interest Calculation formula
  // FV = P * [({1 + i}^n - 1) / i] * (1 + i)
  const i = returnRate / 12 / 100;
  const n = years * 12;
  const totalInvested = monthlyInvestment * n;
  
  const estimatedMaturity = monthlyInvestment * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const estimatedReturns = Math.max(0, estimatedMaturity - totalInvested);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Financial Planning & SIP Compound Yield Calculator
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Model long-term wealth growth, SIP compound returns, and corporate reserve funds.
        </p>
      </div>

      {/* Interactive SIP Calculator */}
      <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-6 bg-slate-900 text-white">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
          <Calculator className="w-6 h-6 text-emerald-400" />
          <div>
            <h3 className="text-lg font-bold">Interactive SIP & Wealth Compounder</h3>
            <p className="text-xs text-slate-400">Calculate corpus accumulated through systematic monthly investments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-5 lg:col-span-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Monthly SIP Amount (₹)</span>
                <span className="text-emerald-400 font-bold">{formatCurrency(monthlyInvestment)}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="200000"
                step="1000"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Expected Annual Return Rate (%)</span>
                <span className="text-emerald-400 font-bold">{returnRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="0.5"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Investment Tenure (Years)</span>
                <span className="text-emerald-400 font-bold">{years} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Total Invested Amount:</span>
                <span className="font-bold text-white">{formatCurrency(totalInvested)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Est. Wealth Gain (Returns):</span>
                <span className="font-bold text-emerald-400">+{formatCurrency(estimatedReturns)}</span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-xs text-slate-300 font-bold">Total Expected Value:</span>
                <span className="text-xl font-extrabold text-white">{formatCurrency(estimatedMaturity)}</span>
              </div>
            </div>

            <Button variant="emerald" className="w-full" onClick={() => window.location.href='/dashboard/ai-assistant'}>
              <Sparkles className="w-4 h-4 mr-2" /> Ask Arth AI for Custom Allocation
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3 border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white">Mutual Fund SIPs</h4>
          <p className="text-xs text-slate-500">Automated monthly SIP allocations with tax-saving ELSS schemes.</p>
        </Card>

        <Card className="p-6 space-y-3 border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white">Treasury Fixed Deposits</h4>
          <p className="text-xs text-slate-500">Secure corporate liquidity in high-yield bank FDs earning 7.8% p.a.</p>
        </Card>

        <Card className="p-6 space-y-3 border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white">Emergency Reserve Fund</h4>
          <p className="text-xs text-slate-500">Maintain 6 months of operational runway in liquid liquid debt funds.</p>
        </Card>
      </div>
    </div>
  );
}
