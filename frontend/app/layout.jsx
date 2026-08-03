import './globals.css';
import { Providers } from '@/components/providers';

export const metadata = {
  title: 'FinanceWise - Premium Enterprise Accounting & Finance Platform',
  description: 'All-in-one Accounting, GST Filing, Automated Bookkeeping, Invoicing & Financial AI Platform for Individuals, Freelancers, CA Firms, Small Businesses & MSMEs.',
  keywords: ['FinanceWise', 'Accounting Software', 'GST Filing', 'Bookkeeping', 'Invoicing', 'CA Platform', 'MSME Finance', 'SIP Calculator', 'AI Finance'],
  authors: [{ name: 'FinanceWise Team' }],
  openGraph: {
    title: 'FinanceWise - Enterprise Accounting & Finance Platform',
    description: 'Automate your bookkeeping, GST filings, payroll, and financial reports with AI-powered intelligence.',
    url: 'https://financewise.app',
    siteName: 'FinanceWise',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinanceWise - Next-Gen Accounting & Finance Platform',
    description: 'Modern, fast, and automated accounting & finance platform for businesses and CA firms.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
