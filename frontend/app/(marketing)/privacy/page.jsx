import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'Privacy Policy | FinanceWise',
  description: 'Learn how FinanceWise collects, protects, and handles user financial data with enterprise security.',
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 dark:text-slate-300">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
          <p className="text-sm text-slate-400">Last updated: August 01, 2026</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. Information Collection</h2>
            <p className="text-sm leading-relaxed">
              FinanceWise collects personal and business information necessary to render financial accounting, GST filing, and bookkeeping services. This includes name, email, business registration details, and bank feed tokens.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. Data Encryption & Storage</h2>
            <p className="text-sm leading-relaxed">
              All financial transaction records and passwords are encrypted using 256-bit AES encryption at rest and TLS 1.3 in transit. We do not sell or monetize user financial data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. Third-Party Integrations</h2>
            <p className="text-sm leading-relaxed">
              When you connect bank feeds or GST portal APIs, tokenized authorization is used. You can revoke access at any time through your Account Settings.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
