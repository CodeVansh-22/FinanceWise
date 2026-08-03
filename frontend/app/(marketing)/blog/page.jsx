import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Blog & Articles | FinanceWise',
  description: 'Insights on financial automation, GST updates, tax optimization strategies, and corporate accounting.',
};

export default function BlogPage() {
  const posts = [
    { title: 'Top 5 GST Filing Errors Small Businesses Make in 2026', date: 'Aug 01, 2026', category: 'Tax & GST', readTime: '5 min read' },
    { title: 'How AI Automation is Transforming Modern CA Practice', date: 'Jul 28, 2026', category: 'AI Finance', readTime: '7 min read' },
    { title: 'Understanding Input Tax Credit (ITC) Reconciliation', date: 'Jul 20, 2026', category: 'Accounting', readTime: '4 min read' },
    { title: 'Building a Resilient Cash Flow Model for Tech Startups', date: 'Jul 15, 2026', category: 'Financial Strategy', readTime: '6 min read' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="emerald" className="px-3 py-1">FinanceWise Blog</Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Latest Insights & Financial Strategy
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Expert articles on tax compliance, startup CFO guides, and smart accounting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, idx) => (
              <Card key={idx} className="p-8 space-y-4 border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span>{post.date} • {post.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white hover:text-primary-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm">
                  Learn actionable strategies to streamline your financial records and ensure zero penalty tax compliance.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
