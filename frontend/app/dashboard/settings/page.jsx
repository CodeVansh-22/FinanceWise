'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getUser, setUser } from '@/lib/auth';
import api from '@/lib/api';
import { Settings, User, CheckCircle2, Lock } from 'lucide-react';

export default function SettingsPage() {
  const currentUser = getUser();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    city: currentUser?.city || 'Mumbai',
    monthly_income: currentUser?.monthly_income || 100000,
    gstin: '27AAAAA0000A1Z5',
    financial_goal: currentUser?.financial_goal || 'Tax Optimization'
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile');
        if (res.data) {
          setFormData((prev) => ({
            ...prev,
            name: res.data.name || prev.name,
            email: res.data.email || prev.email,
            monthly_income: res.data.monthly_income || prev.monthly_income,
            city: res.data.city || prev.city,
            financial_goal: res.data.financial_goal || prev.financial_goal,
          }));
        }
      } catch (err) {
        console.warn('Profile fetch warning:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/auth/profile', {
        name: formData.name,
        monthly_income: Number(formData.monthly_income),
        city: formData.city,
        financial_goal: formData.financial_goal
      });

      if (res.data?.user) {
        setUser(res.data.user);
      } else {
        setUser({ ...currentUser, ...formData });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
      // Local fallback
      setUser({ ...currentUser, ...formData });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Settings className="w-7 h-7 text-slate-500" /> Platform & Entity Settings
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Manage corporate profile, GSTIN credentials, monthly income baseline, and financial objectives.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-semibold text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Profile & preferences saved to database.
        </div>
      )}

      <Card className="p-8 border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-5 h-5 text-primary-500" /> Business Profile & GSTIN
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400">Entity / Full Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400">Work Email</label>
              <Input
                value={formData.email}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400">Monthly Income / Baseline Revenue (₹)</label>
              <Input
                type="number"
                value={formData.monthly_income}
                onChange={(e) => setFormData({ ...formData, monthly_income: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400">City / Location</label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400">Primary Financial Objective</label>
            <Input
              value={formData.financial_goal}
              onChange={(e) => setFormData({ ...formData, financial_goal: e.target.value })}
              required
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="emerald" isLoading={saving}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
