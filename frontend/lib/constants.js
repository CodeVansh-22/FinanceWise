export const NAV_LINKS = [
  { name: 'Solutions', href: '/solutions' },
  { name: 'Services', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
];

export const SIDEBAR_NAV = [
  { name: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
  { name: 'Bookkeeping & Ledgers', href: '/dashboard/bookkeeping', icon: 'Receipt' },
  { name: 'Double-Entry Accounting', href: '/dashboard/accounting', icon: 'Calculator' },
  { name: 'GST Invoices', href: '/dashboard/invoices', icon: 'FileText' },
  { name: 'AI Finance Assistant', href: '/dashboard/ai-assistant', icon: 'Bot' },
  { name: 'Budget Envelopes', href: '/dashboard/budget', icon: 'PieChart' },
  { name: 'Financial Planning', href: '/dashboard/financial-planning', icon: 'TrendingUp' },
  { name: 'Goals & Loans', href: '/dashboard/goals-loans', icon: 'Target' },
  { name: 'GST & Tax Center', href: '/dashboard/gst-tax', icon: 'Landmark' },
  { name: 'Academy', href: '/dashboard/learn', icon: 'GraduationCap' },
  { name: 'Notifications', href: '/dashboard/notifications', icon: 'Bell' },
  { name: 'Statutory Reports', href: '/dashboard/reports', icon: 'BarChart3' },
  { name: 'Payroll', href: '/dashboard/payroll', icon: 'Users' },
  { name: 'Tasks', href: '/dashboard/tasks', icon: 'Calendar' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
];

export const DASHBOARD_NAV = SIDEBAR_NAV;

export const TRUSTED_COMPANIES = [
  { name: 'Stripe' },
  { name: 'Razorpay' },
  { name: 'Zomato' },
  { name: 'ClearTax' },
  { name: 'Swiggy' },
  { name: 'AWS' }
];

export const PRICING_TIERS = [
  {
    id: 'starter',
    name: 'Starter Freelancer',
    priceMonthly: 0,
    priceYearly: 0,
    description: 'Perfect for solo professionals, consultants, and individuals tracking personal & business finances.',
    features: [
      'Up to 100 Transactions/mo',
      'Smart Invoicing (5/mo)',
      'Basic Expense Tracking',
      'SIP & Loan Calculators',
      'Community Support'
    ],
    ctaText: 'Get Started Free'
  },
  {
    id: 'growth',
    name: 'Growth & Business',
    priceMonthly: 999,
    priceYearly: 799,
    popular: true,
    description: 'For growing startups, MSMEs, and small businesses needing full accounting & GST automation.',
    features: [
      'Unlimited Transactions',
      'Unlimited GST Invoices',
      'Automated GSTR-1 & 3B Filing',
      'Payroll for up to 15 employees',
      'AI Financial Advisor 24/7',
      'Custom Bank Feed Sync',
      'Priority Support'
    ],
    ctaText: 'Start 14-Day Free Trial'
  },
  {
    id: 'ca-firm',
    name: 'CA Firm & Enterprise',
    priceMonthly: 2999,
    priceYearly: 2399,
    description: 'For CA firms, accounting agencies, and mid-sized enterprises managing multi-tenant clients.',
    features: [
      'Multi-Client Dashboard (Up to 50 entities)',
      'Bulk GST & TDS Filing',
      'Full Audit Trail & Evidence Vault',
      'Dedicated Account Manager',
      'Custom API & ERP Integrations',
      'SOC2 & ISO Compliant Security'
    ],
    ctaText: 'Contact Enterprise Sales'
  }
];

export const PRICING_PLANS = PRICING_TIERS;

export const FAQS = [
  {
    q: 'How does FinanceWise compare to traditional software like Tally or QuickBooks?',
    a: 'FinanceWise combines the power of automated double-entry accounting with modern cloud flexibility, real-time AI assistance, automated GST filing, and intuitive UX inspired by Stripe and Notion. No complex desktop installations required.'
  },
  {
    q: 'Is my financial data secure?',
    a: 'Yes! FinanceWise uses enterprise-grade 256-bit AES encryption at rest, TLS 1.3 in transit, role-based access control, and ISO/SOC2 compliant server standards. Your data is strictly private and backup-protected.'
  },
  {
    q: 'Can I file my GST directly through FinanceWise?',
    a: 'Absolutely. FinanceWise generates 1-click GSTR-1 and GSTR-3B filings, performs automated Input Tax Credit (ITC) reconciliation, and highlights discrepancies before you submit.'
  },
  {
    q: 'Does FinanceWise support multi-user teams and CA collaboration?',
    a: 'Yes, our Growth and CA Firm plans include multi-seat permissions, allowing your accountant or CA firm to securely log in, audit your ledgers, and handle filings directly.'
  }
];

export const PLATFORM_SERVICES = [
  {
    id: 'accounting',
    slug: 'accounting',
    title: 'Automated Accounting',
    description: 'Double-entry general ledger with AI auto-categorization and real-time ledger reconciliation.',
    iconName: 'Calculator',
    features: ['Real-time Ledger Sync', 'Multi-currency Support', 'Automated Journal Entries', 'Trial Balance Statements']
  },
  {
    id: 'bookkeeping',
    slug: 'bookkeeping',
    title: 'Smart Bookkeeping',
    description: 'Automated receipt parsing, OCR expense matching, and instant bank feed sync.',
    iconName: 'Receipt',
    features: ['OCR Smart Scanner', 'Bank Feed Integration', 'Automated Reconciliations', 'Custom Rules Engine']
  },
  {
    id: 'gst-filing',
    slug: 'gst-filing',
    title: 'GST & Tax Filing',
    description: '1-Click GSTR-1, GSTR-3B generation, automatic ITC reconciliation, and e-way bill generation.',
    iconName: 'Landmark',
    features: ['GSTR-1 & 3B Auto Fill', 'ITC Match Engine', 'E-Way Bill Integration', 'Audit Trail Logs']
  },
  {
    id: 'payroll',
    slug: 'payroll',
    title: 'Full-Stack Payroll',
    description: 'Automated salary calculation, TDS deduction, PF/ESIC compliance, and 1-click payslips.',
    iconName: 'Users',
    features: ['Automated TDS Computation', 'Direct Bank Transfers', 'Compliance Filings', 'Employee Self-Serve Portal']
  },
  {
    id: 'invoices',
    slug: 'invoices',
    title: 'Smart Invoicing',
    description: 'Custom branded GST invoices, recurring subscription billing, and automated payment reminders.',
    iconName: 'FileText',
    features: ['Custom Branded Templates', 'Payment Link Attachments', 'Automated Dunning & Reminders', 'Multi-currency Support']
  },
  {
    id: 'business-registration',
    slug: 'business-registration',
    title: 'Business Registration',
    description: 'Seamless Incorporation for Pvt Ltd, LLP, Partnership, and MSME/Udyam registrations.',
    iconName: 'Building',
    features: ['DIN & Digital Signature', 'MOA & AOA Drafting', 'PAN & TAN Issuance', 'CA Consultation Included']
  },
  {
    id: 'financial-reports',
    slug: 'financial-reports',
    title: 'Financial Reports & P&L',
    description: 'Real-time Profit & Loss, Balance Sheets, Cash Flow Statements, and investor-ready reporting.',
    iconName: 'BarChart3',
    features: ['Investor Pitch Reports', 'Executive Summary PDFs', 'Scenario Modeling', 'Custom Metrics Builder']
  },
  {
    id: 'budget-planning',
    slug: 'budget-planning',
    title: 'Budgeting & Forecasting',
    description: 'AI-driven burn rate tracking, scenario planning, and department budget allocations.',
    iconName: 'PieChart',
    features: ['Burn Rate Alerts', 'Department Envelopes', 'AI Variance Analysis', 'Forecast Projections']
  },
  {
    id: 'investment-planning',
    slug: 'investment-planning',
    title: 'SIP & Wealth Advisory',
    description: 'Compound interest calculators, SIP planners, goal-based portfolio tracking.',
    iconName: 'TrendingUp',
    features: ['SIP Yield Calculators', 'Goal Tracking Widgets', 'Risk Portfolio Analysis', 'Tax Saving Advisory']
  },
  {
    id: 'loan-advisory',
    slug: 'loan-advisory',
    title: 'Loan & Debt Advisory',
    description: 'Business loan EMI calculators, debt amortization schedules, and interest optimization.',
    iconName: 'ShieldCheck',
    features: ['EMI Amortization Schedules', 'Prepayment Impact Analysis', 'Credit Score Monitoring', 'Lender Rate Comparison']
  },
  {
    id: 'consulting',
    slug: 'consulting',
    title: 'CA & Business Consulting',
    description: 'On-demand advice from certified Chartered Accountants and CFO services.',
    iconName: 'Briefcase',
    features: ['Dedicated CFO Advisor', 'Tax Optimization Audits', 'Compliance Checklists', '1-on-1 Strategy Calls']
  },
  {
    id: 'audit-support',
    slug: 'audit-support',
    title: 'Audit Support & Logs',
    description: 'Tamper-proof audit logs, compliance evidence vaults, and statutory audit readiness.',
    iconName: 'Lock',
    features: ['Tamper-proof Log Vault', 'Version Control Entries', 'Role-based Permissions', 'Statutory Readiness']
  }
];

export const SERVICES = PLATFORM_SERVICES;
