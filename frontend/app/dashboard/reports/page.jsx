'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { exportToPDF, exportToExcel } from '@/lib/exportUtils';
import api from '@/lib/api';
import { BarChart3, Download, FileText, Share2, CheckCircle2 } from 'lucide-react';

export default function ReportsPage() {
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resTxn, resAna] = await Promise.all([
        api.get('/transactions').catch(() => null),
        api.get('/analytics/dashboard').catch(() => null)
      ]);

      if (resTxn?.data) setTransactions(Array.isArray(resTxn.data) ? resTxn.data : []);
      if (resAna?.data) setAnalytics(resAna.data);
    } catch (e) {
      console.error('Reports data fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalIncome = analytics?.total_income || transactions.filter(t => t.type === 'income').reduce((a, b) => a + Number(b.amount || 0), 0);
  const totalExpense = analytics?.total_expense || transactions.filter(t => t.type === 'expense').reduce((a, b) => a + Number(b.amount || 0), 0);
  const netSavings = totalIncome - totalExpense;

  const handleDownloadPDF = (title) => {
    const headers = ["Date", "Type", "Category", "Description", "Amount (₹)"];
    const rows = transactions.map(t => [
      formatDate(t.date || t.created_at),
      t.type.toUpperCase(),
      t.category,
      t.description || '',
      `₹${t.amount}`
    ]);
    exportToPDF(title, headers, rows, `${title.replace(/\s+/g, '_')}`);
  };

  const handleDownloadExcel = () => {
    const data = transactions.map(t => ({
      Date: formatDate(t.date || t.created_at),
      Type: t.type,
      Category: t.category,
      Description: t.description,
      Amount: t.amount
    }));
    exportToExcel(data, 'FinanceWise_Full_Financial_Report');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Investor & Statutory Financial Reports
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            1-click audit-ready P&L statements, balance sheets, and investor export packages.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleDownloadExcel}>
          <Download className="w-4 h-4 mr-1" /> Export Full Financial Package (Excel)
        </Button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-semibold">Total Audited Inflow</p>
          <h3 className="text-2xl font-bold text-emerald-500">{formatCurrency(totalIncome)}</h3>
        </Card>

        <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-semibold">Total Audited Outflow</p>
          <h3 className="text-2xl font-bold text-rose-500">{formatCurrency(totalExpense)}</h3>
        </Card>

        <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-semibold">Net Operating Surplus</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(netSavings)}</h3>
        </Card>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <Badge variant="emerald">Executive PDF</Badge>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Profit & Loss Statement (P&L)</h3>
              <p className="text-xs text-slate-400">Calculated from verified income and expense entries</p>
            </div>
            <FileText className="w-6 h-6 text-primary-500 shrink-0" />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDownloadPDF('Profit and Loss Statement')}>
              <Download className="w-3.5 h-3.5 mr-1" /> Download PDF
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <Badge variant="emerald">General Ledger</Badge>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Cash Flow & Capital Reserve Report</h3>
              <p className="text-xs text-slate-400">Statement of net cash position and monthly growth rate</p>
            </div>
            <FileText className="w-6 h-6 text-primary-500 shrink-0" />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDownloadPDF('Cash Flow Statement')}>
              <Download className="w-3.5 h-3.5 mr-1" /> Download PDF
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
