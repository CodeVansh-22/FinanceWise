import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'Terms of Service | FinanceWise',
  description: 'Terms and conditions governing the use of FinanceWise accounting software.',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 dark:text-slate-300">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Terms of Service</h1>
          <p className="text-sm text-slate-400">Last updated: August 01, 2026</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. Platform Usage</h2>
            <p className="text-sm leading-relaxed">
              By registering an account on FinanceWise, you agree to comply with all applicable tax laws and maintain accurate financial input data for automated ledgers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. Subscriptions & Billing</h2>
            <p className="text-sm leading-relaxed">
              Paid plans are billed on a recurring monthly or annual basis. You may upgrade, downgrade, or cancel your subscription at any time without penalty.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
