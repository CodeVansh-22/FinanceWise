# 💰 FinanceWise — Personal Finance Management Platform

> A **production-ready**, full-stack personal finance platform built for the modern user. Track budgets, manage goals, handle loans & EMIs, generate invoices, and get AI-powered financial advice — all in one place.

![Version](https://img.shields.io/badge/version-2.0.0-blue?style=flat-square)
![Frontend](https://img.shields.io/badge/frontend-Next.js%2015-black?style=flat-square&logo=next.js)
![Backend](https://img.shields.io/badge/backend-Flask-green?style=flat-square&logo=flask)
![Database](https://img.shields.io/badge/database-MongoDB%20Atlas-47A248?style=flat-square&logo=mongodb)
![AI](https://img.shields.io/badge/AI-Gemini%20%7C%20OpenRouter-orange?style=flat-square&logo=google)
![License](https://img.shields.io/badge/license-MIT-yellow?style=flat-square)

---

## ✨ Features

| Module | Description |
|---|---|
| 🔐 **Auth** | JWT-based registration, login, and session management |
| 📊 **Dashboard** | Real-time overview of income, expenses, net worth & trends |
| 💳 **Transactions** | Add, filter, and categorize all income/expense transactions |
| 🎯 **Goals & Loans** | Set savings goals, track EMIs, and manage loan repayments |
| 📦 **Budget Planner** | Category-wise monthly budget tracking with visual progress |
| 🧾 **Invoice Generator** | Create, send & export professional invoices as PDF/Excel |
| 📚 **Learn** | Curated financial literacy content and tips |
| 🤖 **AI Financial Advisor** | Chat with a Gemini-powered AI for personalized financial guidance |
| 🔔 **Notifications** | Real-time alerts for bill due dates, goal milestones, and more |
| 📈 **Reports & Analytics** | Detailed charts and breakdowns for spending patterns |
| 🧮 **GST & Tax Tools** | GST calculator and tax planning utilities |
| 📋 **Financial Planning** | SIP calculator, retirement planner, and investment projections |
| 👥 **Payroll** | Basic payroll management and salary slip generation |
| 📁 **File Uploads** | Upload bank statements for automatic transaction parsing |

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | Core React framework with SSR/SSG |
| **React 19** | UI component library |
| **TailwindCSS 3** | Utility-first styling |
| **Framer Motion** | Animations and page transitions |
| **Recharts** | Data visualisation charts |
| **TanStack Query** | Server-state management & caching |
| **Lucide React** | Icon library |
| **jsPDF + AutoTable** | Client-side PDF generation |
| **XLSX** | Excel export support |
| **Axios** | HTTP client |

### Backend
| Technology | Purpose |
|---|---|
| **Python Flask** | REST API with App Factory pattern |
| **PyMongo** | MongoDB driver |
| **Flask-JWT-Extended** | JWT authentication |
| **Flask-Limiter** | Rate limiting |
| **Flask-CORS** | Cross-origin resource sharing |
| **Google Generative AI (Gemini)** | AI financial advisor |
| **ReportLab** | Server-side PDF generation |
| **OpenPyXL** | Excel file generation |
| **Gunicorn** | WSGI production server |

### Infrastructure
| Technology | Purpose |
|---|---|
| **MongoDB Atlas** | Cloud-hosted NoSQL database |
| **Render.com** | Hosting (Backend + Frontend) |
| **OpenRouter API** | Fallback LLM provider |

---

## 📁 Project Structure

```
FinanceWise/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # App factory (create_app)
│   │   ├── auth/                # JWT manager
│   │   ├── config/              # Environment configs (dev/prod/test)
│   │   ├── database/            # MongoDB connection pooling
│   │   ├── middleware/          # Error handlers & request logger
│   │   ├── models/              # Data schemas (User, Transaction, Goal, Loan, Invoice, ...)
│   │   ├── routes/              # Blueprints (auth, transactions, goals, AI, invoices, ...)
│   │   ├── ai/                  # Gemini AI integration & prompt engineering
│   │   └── utils/               # Helpers & shared utilities
│   ├── app.py                   # Entry point
│   └── requirements.txt
│
├── frontend/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/              # Login & Register pages
│   │   ├── (marketing)/         # Landing page
│   │   └── dashboard/           # All authenticated dashboard pages
│   │       ├── page.jsx         # Main dashboard
│   │       ├── budget/
│   │       ├── goals-loans/
│   │       ├── invoices/
│   │       ├── ai-assistant/
│   │       ├── reports/
│   │       ├── gst-tax/
│   │       ├── financial-planning/
│   │       ├── payroll/
│   │       ├── learn/
│   │       ├── notifications/
│   │       ├── tasks/
│   │       └── settings/
│   ├── components/              # Reusable UI components
│   ├── lib/                     # API client & utility functions
│   └── public/                  # Static assets
│
├── render.yaml                  # One-click Render deployment config
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- **Python** 3.10+
- **Node.js** 18+ & **npm**
- A **MongoDB Atlas** cluster (free tier works)
- A **Google Gemini API key** (or OpenRouter API key)

---

### 🔧 Backend Setup

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Create and activate a virtual environment
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create your .env file (create manually)
```

Populate `backend/.env`:
```env
MONGO_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/financewise"
JWT_SECRET_KEY="your-super-secret-jwt-key"
GOOGLE_API_KEY="your-gemini-api-key"
OPENROUTER_API_KEY="sk-or-v1-..."
FLASK_ENV="dev"
```

```bash
# 5. Start the development server
python app.py
# API will be available at http://localhost:5000
```

---

### 🎨 Frontend Setup

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Create your .env.local file
```

Populate `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
# 4. Start the Next.js dev server
npm run dev
# App will be available at http://localhost:3000
```

---

## 🌐 Deployment (Render.com)

This repo ships with a `render.yaml` for **one-click deployment**.

1. Fork this repository
2. Connect the repo to your [Render](https://render.com) account
3. Click **"New Blueprint"** and select this repo
4. Set the following environment variables in your Render dashboard:

| Service | Variable | Description |
|---|---|---|
| `financewise-server` | `MONGO_URI` | MongoDB Atlas connection string |
| `financewise-server` | `GOOGLE_API_KEY` | Gemini API key |
| `financewise-server` | `OPENROUTER_API_KEY` | OpenRouter API key (optional) |

> `JWT_SECRET_KEY` is auto-generated by Render.

Render will spin up:
- **`financewise-server`** — Flask backend (Python web service)
- **`financewise-ui`** — Next.js frontend (static site)

---

## 🔌 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login & receive JWT |
| `GET/POST` | `/api/transactions` | List or create transactions |
| `GET/POST` | `/api/goals` | Manage savings goals |
| `GET/POST` | `/api/loans` | Manage loans & EMIs |
| `GET/POST` | `/api/invoices` | Invoice CRUD |
| `GET` | `/api/analytics` | Spending analytics & chart data |
| `POST` | `/api/ai/chat` | Chat with AI financial advisor |
| `GET` | `/api/learn` | Financial literacy content |
| `GET` | `/api/notifications` | User notifications |
| `POST` | `/api/upload` | Upload bank statement |
| `GET` | `/api/health` | Health check endpoint |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

<p align="center">
  Made with ❤️ for smarter personal finance
</p>
