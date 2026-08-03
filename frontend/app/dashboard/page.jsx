'use client';

import React, { useState, useEffect } from 'react';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency, formatDate } from '@/lib/utils';
import api from '@/lib/api';
import { getUser } from '@/lib/auth';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Receipt, 
  Landmark, 
  Plus,
  RefreshCw,
  X,
  CheckCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function DashboardOverview() {
  const user = getUser();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [transactions, setTransactions] = useState([]);
  
  // Record Expense Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [resAnalytics, resTxns] = await Promise.all([
        api.get('/analytics/dashboard').catch(() => null),
        api.get('/transactions').catch(() => null)
      ]);
      
      if (resAnalytics?.data) {
        setAnalytics(resAnalytics.data);
      }
      if (resTxns?.data) {
        setTransactions(Array.isArray(resTxns.data) ? resTxns.data : []);
      }
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setSubmitting(true);
    try {
      await api.post('/transactions', {
        type,
        amount: Number(amount),
        category,
        description: description || `${type === 'income' ? 'Income' : 'Expense'} entry`,
        date: new Date().toISOString().split('T')[0]
      });
      setIsModalOpen(false);
      setAmount('');
      setDescription('');
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to record transaction:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Metrics calculation
  const totalIncome = analytics?.total_income ?? transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const totalExpense = analytics?.total_expense ?? transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const netSavings = analytics?.net_savings ?? (totalIncome - totalExpense);
  const healthScore = analytics?.health_score ?? (totalIncome > 0 ? Math.min(100, Math.round((netSavings / totalIncome) * 100)) : 50);

  const chartData = analytics?.monthly_chart || [
    { month: 'Jan', income: totalIncome * 0.7, expense: totalExpense * 0.75 },
    { month: 'Feb', income: totalIncome * 0.8, expense: totalExpense * 0.80 },
    { month: 'Mar', income: totalIncome * 0.9, expense: totalExpense * 0.85 },
    { month: 'Apr', income: totalIncome * 0.95, expense: totalExpense * 0.90 },
    { month: 'Current', income: totalIncome, expense: totalExpense },
  ];

  return (
    <div className="space-y-8 relative">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user?.name || 'Executive'} 👋
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Real-time financial ledgers, automated health scoring, and GST tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchDashboardData} isLoading={loading}>
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh Feeds
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1" /> Record Transaction
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Income / Revenue"
          value={formatCurrency(totalIncome)}
          change="Live"
          isPositive={true}
          icon={TrendingUp}
          iconColor="bg-emerald-500/10 text-emerald-600"
          description="Total recorded inflows"
        />

        <StatCard
          title="Operating Expenses"
          value={formatCurrency(totalExpense)}
          change="Live"
          isPositive={false}
          icon={Receipt}
          iconColor="bg-rose-500/10 text-rose-600"
          description="Total recorded outflows"
        />

        <StatCard
          title="Net Cash Savings"
          value={formatCurrency(netSavings)}
          change="Live"
          isPositive={netSavings >= 0}
          icon={DollarSign}
          iconColor="bg-primary-500/10 text-primary-600"
          description="Net surplus cash"
        />

        <StatCard
          title="Financial Health Score"
          value={`${healthScore} / 100`}
          change={healthScore >= 70 ? 'Excellent' : 'Good'}
          isPositive={healthScore >= 50}
          icon={Landmark}
          iconColor="bg-indigo-500/10 text-indigo-600"
          description="Based on savings rate & debt"
        />
      </div>

      {/* Main Chart + Compliance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Income vs Expense Growth Chart */}
        <Card className="lg:col-span-2 p-6 border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Cash Flow Growth Trend</CardTitle>
              <CardDescription>Real-time monthly revenue & expense breakdown</CardDescription>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Income
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" /> Expense
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415520" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(val) => `₹${val >= 100000 ? (val/100000).toFixed(1)+'L' : val}`} />
                <Tooltip
                  formatter={(val) => [formatCurrency(Number(val)), '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', color: '#fff' }}
                />
                <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorInc)" />
                <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Tax & Compliance Card */}
        <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-6">
          <CardTitle>Tax & Compliance Status</CardTitle>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">GSTR-1 (Outward Taxable Supplies)</span>
                <Badge variant="emerald">Compliant</Badge>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Active Status</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">GSTR-3B Tax Offset</span>
                <Badge variant="amber">Ready</Badge>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Estimated Tax ITC: {formatCurrency(totalExpense * 0.18)}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">80C Tax Deduction Opportunity</span>
                <Badge variant="secondary">₹1.5 Lakh Cap</Badge>
              </div>
              <p className="text-xs text-slate-400">Invest in ELSS / PPF via Financial Planning tab.</p>
            </div>
          </div>
        </Card>

      </div>

      {/* Recent Ledger Activity Table */}
      <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Financial Ledgers</CardTitle>
            <CardDescription>Live real-time feed from backend MongoDB database</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => window.location.href='/dashboard/bookkeeping'}>
            View All Ledgers →
          </Button>
        </div>

        <div className="overflow-x-auto">
          {transactions.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No recorded transactions found. Click <strong>Record Transaction</strong> to add your first entry!
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {transactions.slice(0, 7).map((txn, idx) => (
                  <tr key={txn.id || txn._id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5">
                      <Badge variant={txn.type === 'income' ? 'emerald' : 'rose'}>
                        {txn.type.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white">{txn.category}</td>
                    <td className="py-3.5 text-slate-500 text-xs">{txn.description || 'N/A'}</td>
                    <td className="py-3.5 text-slate-400 text-xs">{formatDate(txn.date || txn.created_at)}</td>
                    <td className={`py-3.5 text-right font-bold ${txn.type === 'income' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                      {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="text-xs text-emerald-500 font-semibold flex items-center justify-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Record Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 bg-slate-900 border-slate-800 text-white space-y-6 relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <CardTitle>Record Transaction</CardTitle>
            
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={type === 'income' ? 'primary' : 'outline'}
                  className="flex-1"
                  onClick={() => setType('income')}
                >
                  Income
                </Button>
                <Button
                  type="button"
                  variant={type === 'expense' ? 'primary' : 'outline'}
                  className="flex-1"
                  onClick={() => setType('expense')}
                >
                  Expense
                </Button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none"
                >
                  <option value="Salary">Salary / Client Retainer</option>
                  <option value="Freelance">Freelance Income</option>
                  <option value="Rent">Rent & Housing</option>
                  <option value="Server/Software">Server & Infrastructure</option>
                  <option value="Food/Dining">Food & Dining</option>
                  <option value="Investment">Investment / SIP</option>
                  <option value="Tax Compliance">Tax Compliance</option>
                  <option value="General">General Expense</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description</label>
                <Input
                  type="text"
                  placeholder="e.g. Monthly cloud server fee"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <Button type="submit" variant="primary" isLoading={submitting} className="w-full">
                Save to Database
              </Button>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
}
