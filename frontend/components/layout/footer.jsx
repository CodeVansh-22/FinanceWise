'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, ShieldCheck, Mail, Lock, Globe, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-800 via-primary-950/40 to-slate-800 p-8 lg:p-12 border border-slate-700/60 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Stay ahead in Accounting & Tax Compliance
            </h3>
            <p className="text-slate-400 text-sm">
              Get weekly CA updates, GST policy changes, and automated financial insights straight to your inbox.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold px-4 py-3 bg-emerald-950/50 rounded-xl border border-emerald-800">
                <CheckCircle2 className="w-5 h-5" /> You are subscribed to FinanceWise updates!
              </div>
            ) : (
              <>
                <Input
                  type="email"
                  placeholder="Enter your work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-950/80 border-slate-700 text-white placeholder:text-slate-500 min-w-[280px]"
                />
                <Button type="submit" variant="primary" className="whitespace-nowrap">
                  Subscribe Newsletter
                </Button>
              </>
            )}
          </form>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          
          {/* Col 1: Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FinanceWise</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm">
              The next-generation Accounting & Finance Platform built for Individuals, Freelancers, CA Firms, Startups, and MSMEs.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> SOC2 Type II Certified
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-primary-400" /> 256-Bit Encrypted
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/services" className="hover:text-white transition-colors">Automated Accounting</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Smart Bookkeeping</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">GST & Tax Filing</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Full-Stack Payroll</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Invoicing & Billing</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">CA Audit Support</Link></li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">Solutions</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/solutions" className="hover:text-white transition-colors">For Freelancers</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">For Startups</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">For Small Businesses</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">For CA Firms</Link></li>
              <li><Link href="/industries" className="hover:text-white transition-colors">Industries</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Col 4: Resources & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog & News</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers <span className="text-xs px-1.5 py-0.5 rounded bg-primary-900/60 text-primary-300 ml-1">Hiring</span></Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FinanceWise Platform Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="/help" className="hover:text-slate-400">Security</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
