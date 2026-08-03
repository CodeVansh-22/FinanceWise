import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase } from 'lucide-react';

export const metadata = {
  title: 'Careers | FinanceWise - Join Our Engineering & Finance Team',
  description: 'Help us redefine financial software for millions of businesses and accountants.',
};

export default function CareersPage() {
  const jobs = [
    { title: 'Senior Staff Frontend Engineer (Next.js / React 19)', location: 'Remote / Gurugram', dept: 'Engineering' },
    { title: 'Senior Python Backend Architect (Flask / Microservices)', location: 'Remote / Bengaluru', dept: 'Engineering' },
    { title: 'Lead Chartered Accountant & Tax Policy Expert', location: 'Gurugram', dept: 'Tax & Compliance' },
    { title: 'Enterprise Account Executive (CA & Agency Sales)', location: 'Mumbai / Remote', dept: 'Sales' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="emerald" className="px-3 py-1">We Are Hiring!</Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Join the team building Next-Gen Finance Software
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Work with world-class engineers, designers, and CA specialists to solve complex financial challenges at scale.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {jobs.map((job, idx) => (
              <Card key={idx} className="p-6 border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <Badge variant="secondary" className="mb-2">{job.dept}</Badge>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{job.location}</p>
                </div>
                <Button variant="outline" size="sm">
                  Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
