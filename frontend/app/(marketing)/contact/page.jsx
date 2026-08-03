'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="emerald" className="px-3 py-1">Get In Touch</Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              We are here to help your business grow
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Have questions about CA firm onboarding, enterprise pricing, or custom integrations? Contact our expert team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="p-8 space-y-6 border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Send Us a Message</h3>
              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                  <h4 className="font-bold text-lg">Message Sent Successfully!</h4>
                  <p className="text-sm">Our financial advisory team will reply within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Full Name" required />
                    <Input placeholder="Work Email" type="email" required />
                  </div>
                  <Input placeholder="Company Name / CA Firm" />
                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    required
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <Button type="submit" variant="primary" className="w-full">
                    Submit Message
                  </Button>
                </form>
              )}
            </Card>

            <div className="space-y-8 flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Email Us</h4>
                  <p className="text-slate-500 text-sm">support@financewise.app</p>
                  <p className="text-slate-500 text-sm">sales@financewise.app</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Call Us</h4>
                  <p className="text-slate-500 text-sm">+91 (1800) 266-4848 (Toll Free)</p>
                  <p className="text-slate-500 text-sm">Mon-Sat, 9:00 AM - 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Corporate Headquarters</h4>
                  <p className="text-slate-500 text-sm">FinanceWise Tech Park, Cyber City, Sector 24</p>
                  <p className="text-slate-500 text-sm">Gurugram, HR - 122002, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
