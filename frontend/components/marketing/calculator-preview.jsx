'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

export function CalculatorPreview() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedRate, setExpectedRate] = useState(12);
  const [years, setYears] = useState(10);

  // SIP Math Calculation
  const monthlyRate = expectedRate / 12 / 100;
  const totalMonths = years * 12;
  const investedAmount = monthlyInvestment * totalMonths;
  
  const estimatedReturnsValue = 
    monthlyInvestment * 
    (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));

  const wealthGained = Math.max(0, estimatedReturnsValue - investedAmount);

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            Interactive Financial Planning
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Calculate your Future Wealth & SIP Returns
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            See how disciplined monthly investments grow with the power of compound interest.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-6 lg:p-10 border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Input Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <label className="text-slate-700 dark:text-slate-300">Monthly SIP Amount</label>
                  <span className="text-primary-600 dark:text-primary-400">{formatCurrency(monthlyInvestment)}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full accent-primary-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <label className="text-slate-700 dark:text-slate-300">Expected Return Rate (p.a)</label>
                  <span className="text-emerald-600 dark:text-emerald-400">{expectedRate}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={expectedRate}
                  onChange={(e) => setExpectedRate(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <label className="text-slate-700 dark:text-slate-300">Time Horizon (Years)</label>
                  <span className="text-indigo-600 dark:text-indigo-400">{years} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Results Box */}
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 p-6 border border-slate-200 dark:border-slate-700 space-y-6">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Projected Value</p>
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {formatCurrency(estimatedReturnsValue)}
                </h3>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3 text-sm font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-500">Invested Amount:</span>
                  <span className="text-slate-900 dark:text-white font-semibold">{formatCurrency(investedAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Est. Compound Wealth Gained:</span>
                  <span className="text-emerald-500 font-bold">+{formatCurrency(wealthGained)}</span>
                </div>
              </div>
            </div>

          </div>
        </Card>

      </div>
    </section>
  );
}
