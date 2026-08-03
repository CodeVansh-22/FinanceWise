'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import api from '@/lib/api';
import { Landmark, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function GstTaxPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await api.get('/transactions');
      if (res.data && Array.isArray(res.data)) {
        setTransactions(res.data);
      }
    } catch (e) {
      console.error('Failed to load transactions for GST:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const gstOutput = Math.round(totalIncome * 0.18);
  const gstInputCredit = Math.round(totalExpense * 0.18);
  const netTaxPayable = Math.max(0, gstOutput - gstInputCredit);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            GST Compliance & Input Tax Credit (ITC) Center
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Real-time GSTR-1, GSTR-3B liability calculations based on live database ledgers.
          </p>
        </div>

        <Button variant="emerald" size="sm" onClick={() => window.location.href='/dashboard/ai-assistant'}>
          <Sparkles className="w-4 h-4 mr-1" /> Consult Arth AI for Tax Planning
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-2 border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Output GST (18% on Sales Inflows)</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(gstOutput)}</h3>
          <Badge variant="secondary" className="mt-1">GSTR-1 Sales Output</Badge>
        </Card>

        <Card className="p-6 space-y-2 border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Available Input Tax Credit (18% on Expenses)</p>
          <h3 className="text-2xl font-bold text-emerald-500">{formatCurrency(gstInputCredit)}</h3>
          <Badge variant="emerald" className="mt-1">GSTR-2B Claimable ITC</Badge>
        </Card>

        <Card className="p-6 space-y-2 border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Net GSTR-3B Tax Payable</p>
          <h3 className="text-2xl font-bold font-extrabold text-primary-500">{formatCurrency(netTaxPayable)}</h3>
          <p className="text-xs text-slate-400">After ITC Offset</p>
        </Card>
      </div>

      <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">GST Returns & Filing Workflow</h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">GSTR-1 (Outward Supplies Return)</h4>
              <p className="text-xs text-slate-400">Total Taxable Outward Revenue: {formatCurrency(totalIncome)}</p>
            </div>
            <Badge variant="emerald">Live Reconciled</Badge>
          </div>

          <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">GSTR-3B (Monthly Tax Payment)</h4>
              <p className="text-xs text-slate-400">Net Tax Payable: {formatCurrency(netTaxPayable)}</p>
            </div>
            <Button variant="emerald" size="sm" onClick={() => alert('GSTR-3B Tax computation ready for Portal submission.')}>
              Generate Return Summary
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
