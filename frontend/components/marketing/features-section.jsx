'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Receipt, 
  Landmark, 
  Users, 
  FileText, 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export function FeaturesSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald" className="px-3 py-1">Complete Enterprise Suite</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Everything your financial ecosystem needs
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Replace fragmented spreadsheets, clunky software, and manual entries with a single intelligent financial platform.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: AI Accounting & Ledger */}
          <motion.div whileHover={{ y: -6 }} className="md:col-span-2">
            <Card className="h-full border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-primary-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-primary-950/20 p-8 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-600/10 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Automated Double-Entry Accounting</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Real-time journal posting, automatic trial balance reconciliation, and instant Profit & Loss generation without manual bookkeeping errors.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-sm font-semibold text-primary-600 dark:text-primary-400">
                <span>Explore Accounting Module</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </motion.div>

          {/* Card 2: 1-Click GST Compliance */}
          <motion.div whileHover={{ y: -6 }}>
            <Card className="h-full border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 p-8 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">GST & GSTR-3B Auto-Filing</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Auto-reconcile Input Tax Credit (ITC), detect mismatches early, and export ready-to-upload GST returns.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <span>View Tax Compliance</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </motion.div>

          {/* Card 3: AI Advisor 24/7 */}
          <motion.div whileHover={{ y: -6 }}>
            <Card className="h-full border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-indigo-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/20 p-8 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">24/7 AI Financial Advisor</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Ask questions in plain English: "What is my Q3 tax liability?" or "How can I optimize my monthly burn rate?"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Try AI Chatbot</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </motion.div>

          {/* Card 4: Full-Stack Payroll & Invoicing */}
          <motion.div whileHover={{ y: -6 }} className="md:col-span-2">
            <Card className="h-full border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-cyan-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/20 p-8 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Smart Invoicing & Automated Dunning</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Create branded GST-compliant invoices, send auto-reminders via WhatsApp & email, and get paid 3x faster with integrated payment gateways.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                <span>Explore Invoicing & Payroll</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
