'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  BarChart3, 
  DollarSign, 
  Receipt,
  Users
} from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      {/* Glow Orbs */}
      <div className="ambient-blur w-96 h-96 bg-primary-500/20 top-0 left-1/4" />
      <div className="ambient-blur w-96 h-96 bg-emerald-500/15 top-32 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Pill */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="default" className="px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-500 animate-pulse" />
              <span>Introducing FinanceWise 2.0 AI Accounting Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Badge>
          </motion.div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
          >
            Accounting & Finance{' '}
            <span className="bg-gradient-to-r from-primary-600 via-indigo-500 to-emerald-400 bg-clip-text text-transparent">
              Automated for Modern Growth
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal"
          >
            The all-in-one financial operating system for Freelancers, Startups, CA Firms, and MSMEs. Streamline bookkeeping, GST filings, invoicing, and real-time cash flow.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-xl shadow-primary-500/25">
                Start Free 14-Day Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-300 dark:border-slate-700">
                Explore Live Demo
              </Button>
            </Link>
          </motion.div>

          {/* Trust bullets */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> GST & GSTR-3B Compliant
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1-Click CA Audit Reports
            </div>
          </div>
        </div>

        {/* Dashboard Preview UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 relative max-w-5xl mx-auto rounded-3xl p-3 bg-gradient-to-b from-slate-200/80 via-slate-300/40 to-slate-200/80 dark:from-slate-800 dark:via-slate-900/50 dark:to-slate-800 border border-slate-300/50 dark:border-slate-700/50 shadow-2xl"
        >
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-inner border border-slate-100 dark:border-slate-800 space-y-6">
            
            {/* Top Bar of Mockup */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-mono text-slate-400">financewise.app/dashboard</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Live Sync Active
              </div>
            </div>

            {/* Quick KPI Row inside mockup */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                <p className="text-xs text-slate-400 font-medium">Monthly Revenue</p>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1">₹ 24,85,000</h4>
                <p className="text-xs text-emerald-500 font-semibold mt-1">↑ +18.4% vs last month</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                <p className="text-xs text-slate-400 font-medium">Net Profit Margin</p>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1">₹ 14,20,500</h4>
                <p className="text-xs text-emerald-500 font-semibold mt-1">↑ 57.1% margin</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                <p className="text-xs text-slate-400 font-medium">GST Input Credit (ITC)</p>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1">₹ 2,12,400</h4>
                <p className="text-xs text-primary-500 font-semibold mt-1">Ready to offset</p>
              </div>
            </div>

            {/* Mock Visual Graph Area */}
            <div className="h-44 sm:h-52 w-full rounded-xl bg-gradient-to-r from-primary-950/20 via-indigo-950/20 to-emerald-950/20 p-4 border border-primary-500/20 flex items-end justify-between gap-2">
              {[40, 65, 55, 80, 75, 90, 85, 100, 95, 110, 105, 125].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    style={{ height: `${height}%` }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary-600 via-indigo-500 to-emerald-400 hover:brightness-125 transition-all"
                  />
                  <span className="text-[10px] text-slate-400 hidden sm:inline">M{i+1}</span>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
