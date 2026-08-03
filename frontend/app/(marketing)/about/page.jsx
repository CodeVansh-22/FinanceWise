import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Target, Users, Zap, Award, Globe } from 'lucide-react';

export const metadata = {
  title: 'About Us | FinanceWise - Our Mission & Vision',
  description: 'Learn about FinanceWise, our mission to democratize enterprise financial accounting, and the team driving AI finance innovation.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="emerald" className="px-3 py-1">About FinanceWise</Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Building the future of corporate & personal finance
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              We empower business owners, freelancers, and accounting firms with automated financial intelligence, bank reconciliation, and 1-click GST tax compliance.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4 border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Relentless Automation</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                We eliminate mundane data entry so business leaders can focus 100% on strategic growth and product innovation.
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Bank-Grade Security</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Your data is protected by 256-bit encryption, strict audit logging, and full ISO/SOC2 security compliance standards.
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Designed for Scale</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Whether you process 10 invoices a month or 100,000 transactions, FinanceWise scales smoothly without lag.
              </p>
            </Card>
          </div>

          {/* Stats Banner */}
          <div className="rounded-3xl bg-slate-900 text-white p-10 lg:p-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-extrabold text-primary-400">10,000+</h4>
              <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Active Businesses</p>
            </div>
            <div>
              <h4 className="text-4xl font-extrabold text-emerald-400">₹ 500 Cr+</h4>
              <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Transactions Processed</p>
            </div>
            <div>
              <h4 className="text-4xl font-extrabold text-indigo-400">99.99%</h4>
              <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Uptime SLA</p>
            </div>
            <div>
              <h4 className="text-4xl font-extrabold text-amber-400">4.9 / 5</h4>
              <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Customer Rating</p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
