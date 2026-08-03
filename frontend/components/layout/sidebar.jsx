'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DASHBOARD_NAV } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  LayoutDashboard, 
  Calculator, 
  Receipt, 
  FileText, 
  Landmark, 
  Users, 
  PieChart, 
  Target, 
  BarChart3, 
  Bot, 
  GraduationCap, 
  Calendar, 
  Bell, 
  Settings,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { removeToken, getUser } from '@/lib/auth';

const ICON_MAP = {
  LayoutDashboard,
  Calculator,
  Receipt,
  FileText,
  Landmark,
  Users,
  PieChart,
  TrendingUp,
  Target,
  BarChart3,
  Bot,
  GraduationCap,
  Calendar,
  Bell,
  Settings
};

export function Sidebar({ className, onClose }) {
  const pathname = usePathname();
  const user = getUser();

  const handleLogout = () => {
    removeToken();
    window.location.href = '/login';
  };

  return (
    <aside className={cn("w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col justify-between h-full select-none", className)}>
      
      {/* Top Header */}
      <div className="p-5 space-y-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-primary-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight">FinanceWise</h2>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Enterprise OS</span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
          {DASHBOARD_NAV.map((item) => {
            const Icon = ICON_MAP[item.icon] || LayoutDashboard;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150",
                  isActive
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                )}
              >
                <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-slate-400")} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile & Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Enterprise User'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || 'user@financewise.app'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

    </aside>
  );
}
