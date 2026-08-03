'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { exportToPDF } from '@/lib/exportUtils';
import api from '@/lib/api';
import { FileText, Plus, Download, Send, CheckCircle2, Trash2 } from 'lucide-react';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/invoices');
      if (res.data) setInvoices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    if (!clientName || !amount) return;
    setSubmitting(true);
    try {
      const baseAmt = parseFloat(amount) || 0;
      const taxAmt = baseAmt * (parseFloat(gstRate) / 100);
      const totalAmt = baseAmt + taxAmt;

      await api.post('/invoices', {
        client_name: clientName,
        client_email: clientEmail,
        amount: totalAmt,
        status: 'pending',
        due_date: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
        notes: notes || `Base Amount: ₹${baseAmt}, GST (${gstRate}%): ₹${taxAmt}`
      });

      setClientName('');
      setClientEmail('');
      setAmount('');
      setNotes('');
      setShowModal(false);
      fetchInvoices();
    } catch (err) {
      console.error('Failed to create invoice:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/invoices/${id}/status`, { status: newStatus });
      fetchInvoices();
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return;
    try {
      await api.delete(`/invoices/${id}`);
      fetchInvoices();
    } catch (err) {
      console.error('Delete invoice failed:', err);
    }
  };

  const handleDownloadPDF = (inv) => {
    const headers = ["Item / Description", "Status", "Due Date", "Total Value"];
    const rows = [
      [
        `Invoice #${inv.invoice_number || inv.id || inv._id} - ${inv.client_name}`,
        (inv.status || 'pending').toUpperCase(),
        formatDate(inv.due_date || inv.date),
        `₹${inv.amount}`
      ]
    ];
    exportToPDF(`Invoice ${inv.invoice_number || inv.id}`, headers, rows, `Invoice_${inv.invoice_number || 'Doc'}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            GST Invoicing & Client Billing
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Create branded GST-compliant invoices, track payment status, and download PDF copies.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-1" /> Create New Invoice
        </Button>
      </div>

      {/* Modal for Create Invoice */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-lg p-6 space-y-4 border-slate-700 bg-slate-900 text-white">
            <h3 className="text-xl font-bold">Generate GST Invoice</h3>
            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300">Client / Company Name</label>
                <Input
                  placeholder="e.g. Swiggy India Ltd"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300">Client Email (Optional)</label>
                <Input
                  type="email"
                  placeholder="billing@client.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300">Base Amount (₹)</label>
                  <Input
                    type="number"
                    placeholder="100000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300">GST Rate (%)</label>
                  <select
                    value={gstRate}
                    onChange={(e) => setGstRate(e.target.value)}
                    className="flex h-11 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white focus:outline-none"
                  >
                    <option value="18">18% GST (Standard)</option>
                    <option value="12">12% GST</option>
                    <option value="5">5% GST</option>
                    <option value="0">0% Exempt</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 space-y-1 text-xs text-slate-300">
                <p>Tax Amount: <span className="font-bold text-emerald-400">{formatCurrency((parseFloat(amount)||0)*(parseFloat(gstRate)/100))}</span></p>
                <p>Total Invoice Value: <span className="font-bold text-white">{formatCurrency((parseFloat(amount)||0)* (1 + parseFloat(gstRate)/100))}</span></p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">Cancel</Button>
                <Button type="submit" variant="emerald" isLoading={submitting} className="flex-1">Generate & Save</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Invoice Table */}
      <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-6">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading invoices...</div>
          ) : invoices.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No invoices generated yet. Click <strong>Create New Invoice</strong>!</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3">Invoice #</th>
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Due Date</th>
                  <th className="pb-3 text-right">Total Value</th>
                  <th className="pb-3 text-center">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {invoices.map((inv) => {
                  const id = inv.id || inv._id;
                  const invNum = inv.invoice_number || `INV-${id.slice(-6)}`;
                  const isPaid = inv.status === 'paid';
                  return (
                    <tr key={id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-3.5 font-mono text-xs font-bold text-primary-500">{invNum}</td>
                      <td className="py-3.5 font-semibold text-slate-900 dark:text-white">{inv.client_name || inv.client}</td>
                      <td className="py-3.5 text-xs text-slate-400">{formatDate(inv.due_date || inv.date)}</td>
                      <td className="py-3.5 text-right font-bold text-slate-900 dark:text-white">{formatCurrency(inv.amount)}</td>
                      <td className="py-3.5 text-center">
                        <button 
                          onClick={() => handleUpdateStatus(id, isPaid ? 'pending' : 'paid')}
                          className="focus:outline-none"
                          title="Click to toggle Paid/Pending"
                        >
                          <Badge variant={isPaid ? 'emerald' : 'amber'}>
                            {inv.status}
                          </Badge>
                        </button>
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <Button variant="ghost" size="sm" title="Download PDF" onClick={() => handleDownloadPDF(inv)}>
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Delete" onClick={() => handleDelete(id)}>
                          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
