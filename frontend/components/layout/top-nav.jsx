'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { checkBackendHealth } from '@/lib/api';
import { getUser } from '@/lib/auth';
import { 
  Sun, 
  Moon, 
  Search, 
  Bell, 
  Plus, 
  Menu, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export function TopNav({ onMenuToggle }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [backendOnline, setBackendOnline] = useState(true);
  const user = getUser();

  useEffect(() => {
    setMounted(true);
    const ping = async () => {
      const ok = await checkBackendHealth();
      setBackendOnline(ok);
    };
    ping();
  }, []);

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      
      {/* Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Financial Operating System</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {backendOnline ? 'Render Backend Connected' : 'Local Data Mode'}
          </div>
        </div>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-3">
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="Search invoices, GST returns, transactions..."
            className="w-64 h-9 pl-9 pr-4 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
        </div>

        {/* Create Invoice Quick Action */}
        <Link href="/dashboard/invoices">
          <Button size="sm" variant="emerald" className="hidden sm:flex">
            <Plus className="w-4 h-4 mr-1" /> Create Invoice
          </Button>
        </Link>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        )}

        {/* Notifications */}
        <Link href="/dashboard/notifications" className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
        </Link>

      </div>

    </header>
  );
}
