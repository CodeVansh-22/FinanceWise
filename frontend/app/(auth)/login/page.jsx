'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { setToken, setUser } from '@/lib/auth';
import { TrendingUp, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data && res.data.token) {
        setToken(res.data.token);
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setUser({ name: email.split('@')[0], email });
        }
        router.push('/dashboard');
      } else {
        setError('Login failed: Token not received');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errMsg = err.response?.data?.error || err.response?.data?.message || 'Invalid email or password';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      <div className="ambient-blur w-96 h-96 bg-primary-600/20 top-1/4 left-1/4" />
      <div className="ambient-blur w-96 h-96 bg-emerald-600/15 bottom-1/4 right-1/4" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">FinanceWise</span>
          </Link>
          <h2 className="text-xl font-bold text-slate-200">Welcome Back</h2>
          <p className="text-xs text-slate-400">Log in to manage your accounting & financial ledgers</p>
        </div>

        <Card className="p-8 border-slate-800 bg-slate-950/80 backdrop-blur-2xl shadow-2xl space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Work Email</label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-slate-900 border-slate-800 text-white"
                />
                <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <Link href="/forgot-password" className="text-xs text-primary-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-slate-900 border-slate-800 text-white"
                />
                <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full">
              Log In to Platform <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
            Don't have an account yet?{' '}
            <Link href="/register" className="text-primary-400 font-bold hover:underline">
              Create Free Account
            </Link>
          </div>
        </Card>

      </div>
    </div>
  );
}
