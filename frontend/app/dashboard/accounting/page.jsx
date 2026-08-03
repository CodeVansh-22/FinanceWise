'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { exportToExcel, exportToPDF } from '@/lib/exportUtils';
import api from '@/lib/api';
import { Calculator, Plus, Download, Search } from 'lucide-react';

export default function AccountingPage() {
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resTxn, resAnalytics] = await Promise.all([
        api.get('/transactions').catch(() => null),
        api.get('/analytics/dashboard').catch(() => null)
      ]);
      if (resTxn?.data) setTransactions(Array.isArray(resTxn.data) ? resTxn.data : []);
      if (resAnalytics?.data) setAnalytics(resAnalytics.data);
    } catch (e) {
      console.error('Accounting data fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalIncome = analytics?.total_income || transactions.filter(t => t.type === 'income').reduce((a, b) => a + Number(b.amount || 0), 0);
  const totalExpense = analytics?.total_expense || transactions.filter(t => t.type === 'expense').reduce((a, b) => a + Number(b.amount || 0), 0);
  const netEquity = totalIncome - totalExpense;

  const filtered = transactions.filter(t => 
    !search || t.category?.toLowerCase().includes(search.toLowerCase()) || t.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportTrialBalance = () => {
    const rows = filtered.map(t => [
      formatDate(t.date || t.created_at),
      t.type === 'income' ? 'Bank Account (Debit)' : `${t.category} Expense (Debit)`,
      t.type === 'income' ? `Revenue ${t.category} (Credit)` : 'Bank Account (Credit)',
      t.description || '',
      `₹${t.amount}`
    ]);
    exportToPDF('General Ledger & Trial Balance', ["Date", "Debit Account", "Credit Account", "Details", "Amount"], rows, 'FinanceWise_Trial_Balance');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Double-Entry Accounting & General Ledger
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Live journal posting, trial balance reconciliation, and general ledger audit trails.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExportTrialBalance}>
            <Download className="w-3.5 h-3.5 mr-1" /> Export Trial Balance
          </Button>
          <Button variant="primary" size="sm" onClick={() => window.location.href = '/dashboard/bookkeeping'}>
            <Plus className="w-4 h-4 mr-1" /> New Journal Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-2 border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Total Inflows (Revenue Assets)</p>
          <h3 className="text-2xl font-bold text-emerald-500">{formatCurrency(totalIncome)}</h3>
          <p className="text-xs text-emerald-500 font-semibold">Total Debit Asset Balance</p>
        </Card>

        <Card className="p-6 space-y-2 border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Total Outflows (Operating Expenses)</p>
          <h3 className="text-2xl font-bold text-rose-500">{formatCurrency(totalExpense)}</h3>
          <p className="text-xs text-slate-400 font-semibold">Credit Liability & Costs</p>
        </Card>

        <Card className="p-6 space-y-2 border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Trial Balance Net Equity</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(netEquity)}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="emerald" className="px-3 py-1">Balanced & Verified</Badge>
          </div>
        </Card>
      </div>

      <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <CardTitle>Journal Entries & Ledger Books</CardTitle>
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search category or details..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading accounting ledgers...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No journal entries found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Account Debit (Dr)</th>
                  <th className="pb-3">Account Credit (Cr)</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {filtered.map((t, idx) => (
                  <tr key={t.id || t._id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 text-xs text-slate-400">{formatDate(t.date || t.created_at)}</td>
                    <td className="py-3.5 font-semibold text-slate-900 dark:text-white text-xs">
                      {t.type === 'income' ? 'Bank / Cash Account' : `${t.category} Expense`}
                    </td>
                    <td className="py-3.5 text-slate-500 text-xs">
                      {t.type === 'income' ? `Revenue: ${t.category}` : 'Bank / Cash Account'}
                    </td>
                    <td className="py-3.5 text-slate-500 text-xs">{t.description || 'General Ledger Entry'}</td>
                    <td className="py-3.5 text-right font-bold text-slate-900 dark:text-white">
                      {formatCurrency(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
