'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, ArrowRight, Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      <div className="ambient-blur w-96 h-96 bg-primary-600/20 top-1/4 left-1/4" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white">FinanceWise</span>
          </Link>
          <h2 className="text-xl font-bold text-slate-200">Reset Your Password</h2>
          <p className="text-xs text-slate-400">Enter your registered email address to receive reset link</p>
        </div>

        <Card className="p-8 border-slate-800 bg-slate-950/80 backdrop-blur-2xl shadow-2xl space-y-6">
          {sent ? (
            <div className="text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold">Check Your Email Inbox</h3>
              <p className="text-xs text-slate-400">We have sent a secure password reset link to <span className="text-white font-semibold">{email}</span>.</p>
              <Link href="/login">
                <Button variant="outline" className="w-full mt-2">Return to Login</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Registered Email</label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-900 border-slate-800 text-white"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Send Reset Instructions <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
