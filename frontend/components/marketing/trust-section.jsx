import React from 'react';
import { TRUSTED_COMPANIES } from '@/lib/constants';

export function TrustSection() {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Trusted by 10,000+ Fast-Growing Businesses, CA Firms & Freelancers
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all">
          {TRUSTED_COMPANIES.map((company, index) => (
            <div key={index} className="flex items-center gap-2 text-lg font-bold text-slate-700 dark:text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white text-xs">
                {company.name[0]}
              </div>
              <span>{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
