import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FaqAccordion } from '@/components/marketing/faq-accordion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle, FileText, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Help Center & Documentation | FinanceWise',
  description: 'Search FinanceWise knowledge base, API docs, and user guides for accounting and GST filing.',
};

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">How can we help you today?</h1>
            <div className="max-w-xl mx-auto relative">
              <Input placeholder="Search articles, GST guides, invoice tutorials..." className="pl-12 h-14 text-base rounded-2xl shadow-lg" />
              <Search className="w-5 h-5 absolute left-4 top-4 text-slate-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-3 border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-primary-500/10 text-primary-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Getting Started Guide</h3>
              <p className="text-xs text-slate-500">Step-by-step onboarding for new business accounts.</p>
            </Card>

            <Card className="p-6 text-center space-y-3 border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">GST & Tax Manuals</h3>
              <p className="text-xs text-slate-500">Detailed instructions for GSTR-1 and GSTR-3B filings.</p>
            </Card>

            <Card className="p-6 text-center space-y-3 border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">API & ERP Integration</h3>
              <p className="text-xs text-slate-500">Developer webhooks, bank feeds, and REST endpoints.</p>
            </Card>
          </div>

          <FaqAccordion />
        </div>
      </main>
      <Footer />
    </div>
  );
}
