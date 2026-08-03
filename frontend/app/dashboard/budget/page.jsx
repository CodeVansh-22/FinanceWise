'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import api from '@/lib/api';
import { Plus, CheckCircle2 } from 'lucide-react';

const DEFAULT_ENVELOPES = [
  { category: 'Software/Server', limit: 100000 },
  { category: 'Rent/Housing', limit: 150000 },
  { category: 'Food/Dining', limit: 25000 },
  { category: 'Tax Compliance', limit: 50000 },
  { category: 'General', limit: 50000 }
];

export default function BudgetPage() {
  const [budgets, setBudgets] = useState(DEFAULT_ENVELOPES);
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await api.get('/transactions');
      if (res.data && Array.isArray(res.data)) {
        setTransactions(res.data.filter(t => t.type === 'expense'));
      }
    } catch (e) {
      console.error('Failed to load transactions for budget:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!category || !limit) return;
    const newB = { category, limit: parseFloat(limit) || 0 };
    setBudgets([...budgets, newB]);
    setCategory('');
    setLimit('');
  };

  // Group real expenses by category
  const expenseByCategory = {};
  transactions.forEach(t => {
    const cat = t.category || 'General';
    expenseByCategory[cat] = (expenseByCategory[cat] || 0) + Number(t.amount || 0);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Category Budget Envelopes & Burn Tracking
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Set spending limits by category and track live expense burn from your database transactions.
          </p>
        </div>
      </div>

      {/* Add Budget Envelope Form */}
      <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create Budget Envelope</h3>
        <form onSubmit={handleAddBudget} className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Category Name (e.g. Travel, Marketing)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="Monthly Spending Limit (₹)"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" variant="primary">
            <Plus className="w-4 h-4 mr-1" /> Add Envelope
          </Button>
        </form>
      </Card>

      {/* Budget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((b, idx) => {
          const spent = expenseByCategory[b.category] || 0;
          const pct = Math.min(100, Math.round((spent / (b.limit || 1)) * 100));
          return (
            <Card key={idx} className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 dark:text-white">{b.category}</h4>
                <Badge variant={pct > 90 ? 'rose' : pct > 75 ? 'amber' : 'emerald'}>
                  {pct}% Spent
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Actual Spent: <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(spent)}</span></span>
                  <span>Cap: <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(b.limit)}</span></span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${pct}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct > 90 ? 'bg-rose-500' : pct > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Headroom available: <span className="font-bold text-emerald-500">{formatCurrency(Math.max(0, b.limit - spent))}</span>
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
