'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import api from '@/lib/api';
import { Target, CreditCard, Plus, CheckCircle2, DollarSign, Calculator } from 'lucide-react';

export default function GoalsLoansPage() {
  const [goals, setGoals] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Goal Form State
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('2026-12-31');
  const [submittingGoal, setSubmittingGoal] = useState(false);

  // Loan Form State
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [loanTitle, setLoanTitle] = useState('');
  const [loanType, setLoanType] = useState('Business');
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('10.5');
  const [months, setMonths] = useState('36');
  const [submittingLoan, setSubmittingLoan] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [gRes, lRes] = await Promise.all([
        api.get('/goals').catch(() => null),
        api.get('/loans').catch(() => null)
      ]);
      if (gRes?.data && Array.isArray(gRes.data)) setGoals(gRes.data);
      if (lRes?.data && Array.isArray(lRes.data)) setLoans(lRes.data);
    } catch (err) {
      console.error('Goals/Loans fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    if (!goalTitle || !goalTarget) return;
    setSubmittingGoal(true);
    try {
      await api.post('/goals', {
        title: goalTitle,
        target_amount: Number(goalTarget),
        current_amount: 0,
        deadline: goalDeadline
      });
      setGoalTitle('');
      setGoalTarget('');
      setShowGoalModal(false);
      fetchData();
    } catch (err) {
      console.error('Failed to create goal:', err);
    } finally {
      setSubmittingGoal(false);
    }
  };

  const handleAddFunds = async (goalId) => {
    const amountStr = prompt('Enter amount (₹) to add to goal:');
    if (!amountStr || isNaN(amountStr) || Number(amountStr) <= 0) return;
    try {
      await api.put(`/goals/${goalId}/add-funds`, { amount: Number(amountStr) });
      fetchData();
    } catch (err) {
      console.error('Failed to add funds:', err);
    }
  };

  const handleCreateLoan = async (e) => {
    e.preventDefault();
    if (!principal || !months) return;
    setSubmittingLoan(true);
    try {
      const p = Number(principal);
      const r = Number(interestRate) / 12 / 100;
      const m = Number(months);
      // EMI formula = [P x R x (1+R)^N]/[(1+R)^N-1]
      const emiVal = r > 0 ? (p * r * Math.pow(1 + r, m)) / (Math.pow(1 + r, m) - 1) : p / m;

      await api.post('/loans', {
        title: loanTitle || `${loanType} Loan`,
        type: loanType,
        principal: p,
        emi: Math.round(emiVal),
        interest_rate: Number(interestRate),
        remaining_months: m
      });

      setLoanTitle('');
      setPrincipal('');
      setShowLoanModal(false);
      fetchData();
    } catch (err) {
      console.error('Failed to create loan:', err);
    } finally {
      setSubmittingLoan(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Financial Goals & Debt Amortization Tracker
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Monitor strategic target goals and optimize business loan EMI repayment schedules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setShowGoalModal(true)}>
            <Plus className="w-4 h-4 mr-1" /> New Goal
          </Button>
          <Button variant="primary" size="sm" onClick={() => setShowLoanModal(true)}>
            <Plus className="w-4 h-4 mr-1" /> Track Loan EMI
          </Button>
        </div>
      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 bg-slate-900 border-slate-800 text-white space-y-4">
            <h3 className="text-lg font-bold">Add New Financial Goal</h3>
            <form onSubmit={handleCreateGoal} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300">Goal Title</label>
                <Input
                  placeholder="e.g. Office Building Fund"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  required
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">Target Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="1000000"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  required
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">Target Deadline</label>
                <Input
                  type="date"
                  value={goalDeadline}
                  onChange={(e) => setGoalDeadline(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setShowGoalModal(false)} className="flex-1">Cancel</Button>
                <Button type="submit" variant="emerald" isLoading={submittingGoal} className="flex-1">Save Goal</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Loan Modal */}
      {showLoanModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 bg-slate-900 border-slate-800 text-white space-y-4">
            <h3 className="text-lg font-bold">Track Business Loan</h3>
            <form onSubmit={handleCreateLoan} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300">Loan Title</label>
                <Input
                  placeholder="e.g. HDFC Business Loan"
                  value={loanTitle}
                  onChange={(e) => setLoanTitle(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300">Principal (₹)</label>
                  <Input
                    type="number"
                    placeholder="500000"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    required
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300">Interest Rate (% p.a)</label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="10.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    required
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-300">Tenure (Months)</label>
                <Input
                  type="number"
                  placeholder="36"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  required
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setShowLoanModal(false)} className="flex-1">Cancel</Button>
                <Button type="submit" variant="emerald" isLoading={submittingLoan} className="flex-1">Save Loan</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Goals Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-500" /> Strategic Financial Goals
        </h3>

        {goals.length === 0 ? (
          <Card className="p-8 text-center text-slate-400">
            No active goals found. Click <strong>New Goal</strong> to create your first goal!
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((g) => {
              const id = g.id || g._id;
              const target = Number(g.target_amount || 1);
              const current = Number(g.current_amount || 0);
              const pct = Math.min(100, Math.round((current / target) * 100));
              return (
                <Card key={id} className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-900 dark:text-white">{g.title}</h4>
                    <Badge variant="emerald">{pct}% Saved</Badge>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Accumulated: <span className="font-bold text-emerald-500">{formatCurrency(current)}</span></span>
                      <span>Target: <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(target)}</span></span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div style={{ width: `${pct}%` }} className="h-full bg-primary-600 rounded-full" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-400">Deadline: {g.deadline || '2026-12-31'}</span>
                    <Button size="sm" variant="outline" onClick={() => handleAddFunds(id)}>
                      + Add Contribution
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Loans Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-indigo-500" /> Business Loans & Debt Schedule
        </h3>

        {loans.length === 0 ? (
          <Card className="p-8 text-center text-slate-400">
            No tracked loan records found. Click <strong>Track Loan EMI</strong> to log a loan!
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {loans.map((l, idx) => {
              const id = l.id || l._id || idx;
              const emiVal = l.emi || 0;
              const principalVal = l.principal || l.loan_amount || 0;
              return (
                <Card key={id} className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{l.title || `${l.type} Loan`}</h4>
                      <p className="text-xs text-slate-400">Interest Rate: {l.interest_rate || 10.5}% p.a • Tenure: {l.remaining_months || 36} Months</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-slate-400">Calculated Monthly EMI</p>
                      <p className="text-xl font-extrabold text-primary-500">{formatCurrency(emiVal)}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 flex justify-between items-center text-xs font-semibold">
                    <span>Principal Sanctioned: {formatCurrency(principalVal)}</span>
                    <span className="text-amber-500">Active Repayment Phase</span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
