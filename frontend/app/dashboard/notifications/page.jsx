'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { Bell, AlertTriangle, CheckCircle2, Check } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/notifications');
      if (res?.data) {
        setNotifications(Array.isArray(res.data) ? res.data : []);
      }
    } catch (e) {
      console.error('Failed to load notifications:', e);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => (Array.isArray(prev) ? prev : []).map(n => (n.id === id || n._id === id) ? { ...n, read: true } : n));
    } catch (e) {
      console.error('Failed to mark notification as read:', e);
    }
  };

  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Bell className="w-7 h-7 text-primary-500" /> Notifications & System Alerts
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Real-time alerts on bank feed syncs, GST deadlines, and unusual expense spikes.
        </p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <Card className="p-8 text-center text-slate-400">Loading system notifications...</Card>
        ) : safeNotifications.length === 0 ? (
          <Card className="p-8 text-center text-slate-400">No active notifications found.</Card>
        ) : (
          safeNotifications.map((n, idx) => {
            const id = n.id || n._id || idx;
            const isRead = n.read;
            const nType = n.type || 'info';
            return (
              <Card key={id} className={`p-6 border-slate-200 dark:border-slate-800 flex items-start gap-4 transition-all ${isRead ? 'opacity-60' : 'opacity-100'}`}>
                <div className={`p-3 rounded-2xl shrink-0 ${
                  nType === 'emerald' || nType === 'info' ? 'bg-emerald-500/10 text-emerald-600' :
                  nType === 'rose' ? 'bg-rose-500/10 text-rose-600' : 'bg-amber-500/10 text-amber-600'
                }`}>
                  {nType === 'rose' ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </div>

                <div className="space-y-1 flex-grow">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{n.title}</h4>
                    <span className="text-xs text-slate-400 font-mono">{n.created_at || n.time || 'Just now'}</span>
                  </div>
                  <p className="text-sm text-slate-500">{n.message || n.desc}</p>
                </div>

                {!isRead && (
                  <Button variant="ghost" size="sm" onClick={() => handleMarkRead(id)} title="Mark as read">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </Button>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
