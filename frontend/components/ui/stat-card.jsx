'use client';

import React from 'react';
import { Card } from './card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  iconColor = 'bg-primary-500/10 text-primary-600',
  description,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="w-full"
    >
      <Card className="p-6 relative overflow-hidden border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          {Icon && (
            <div className={cn('p-3 rounded-2xl flex items-center justify-center', iconColor)}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            {value}
          </h3>
          {change && (
            <span
              className={cn(
                'inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full',
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
              )}
            >
              {isPositive ? '↑' : '↓'} {change}
            </span>
          )}
        </div>

        {description && (
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{description}</p>
        )}
      </Card>
    </motion.div>
  );
};
