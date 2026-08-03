'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { setToken, setUser } from '@/lib/auth';
import { TrendingUp, ArrowRight, Lock, Mail, User, DollarSign, MapPin, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    monthly_income: '100000',
    city: 'Mumbai',
    financial_goal: 'Tax Optimization & Growth'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        monthly_income: parseFloat(formData.monthly_income) || 0,
        city: formData.city,
        financial_goal: formData.financial_goal
      });

      if (res.data && res.data.token) {
        setToken(res.data.token);
        setUser({
          name: formData.name,
          email: formData.email,
          monthly_income: parseFloat(formData.monthly_income),
          city: formData.city,
          financial_goal: formData.financial_goal
        });
        router.push('/dashboard');
      } else {
        setError('Registration successful, please log in.');
        router.push('/login');
      }
    } catch (err) {
      console.error('Register error:', err);
      const errMsg = err.response?.data?.error || err.response?.data?.details || 'Registration failed. Please check inputs.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      <div className="ambient-blur w-96 h-96 bg-primary-600/20 top-1/4 left-1/4" />
      <div className="ambient-blur w-96 h-96 bg-emerald-600/15 bottom-1/4 right-1/4" />

      <div className="w-full max-w-lg space-y-6 relative z-10 my-8">
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">FinanceWise</span>
          </Link>
          <h2 className="text-xl font-bold text-slate-200">Start Your 14-Day Free Trial</h2>
          <p className="text-xs text-slate-400">Join thousands of businesses & accountants automating ledgers</p>
        </div>

        <Card className="p-8 border-slate-800 bg-slate-950/80 backdrop-blur-2xl shadow-2xl space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name / Entity Name</label>
              <div className="relative">
                <Input
                  name="name"
                  placeholder="Rahul Sharma / Acme Corp"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="pl-10 bg-slate-900 border-slate-800 text-white"
                />
                <User className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Work Email</label>
              <div className="relative">
                <Input
                  name="email"
                  type="email"
                  placeholder="rahul@acme.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 bg-slate-900 border-slate-800 text-white"
                />
                <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 bg-slate-900 border-slate-800 text-white"
                />
                <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Monthly Revenue (₹)</label>
                <Input
                  name="monthly_income"
                  type="number"
                  placeholder="100000"
                  value={formData.monthly_income}
                  onChange={handleChange}
                  required
                  className="bg-slate-900 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">City</label>
                <Input
                  name="city"
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="bg-slate-900 border-slate-800 text-white"
                />
              </div>
            </div>

            <Button type="submit" variant="emerald" size="lg" isLoading={loading} className="w-full">
              Create Enterprise Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-400 font-bold hover:underline">
              Log In Here
            </Link>
          </div>
        </Card>

      </div>
    </div>
  );
}
