# FinanceWise - Personal Finance App
A production-ready web application designed for middle-class Indian users to track budgets, goals, EMIs, and optimize their taxes, complete with an AI Financial Advisor wrapper using Llama 3.1.

## Tech Stack
- **Frontend**: React.js (Vite), TailwindCSS, Recharts
- **Backend**: Python Flask, PyMongo, JWT Extended
- **Database**: MongoDB Atlas
- **AI**: OpenRouter API (`meta-llama/llama-3.1-8b-instruct:free`)
- **Deployment**: Render.com ready (`render.yaml` provided)

## Backend Setup (Local)
1. Navigate to the `backend` folder.
2. Initialize and activate a Python virtual environment.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy `.env.example` to `.env` and fill out your MongoDB credentials:
   ```bash
   MONGO_URI="mongodb+srv://..."
   JWT_SECRET_KEY="your-jwt-secret"
   OPENROUTER_API_KEY="sk-or-v1-..."
   ```
5. Start the server:
   ```bash
   python app.py
   ```

## Frontend Setup (Local)
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Navigate to `http://localhost:5173` to view the app!

## Deployment
This repository is configured for one-click deployment to **Render**.
By deploying using the `render.yaml` file, it will automatically spin up two services:
1. `financewise-server`: The Flask backend web service.
2. `financewise-ui`: The static site React frontend which will securely connect to the backend URL automatically.

**Note**: Remember to supply your `MONGO_URI` and `OPENROUTER_API_KEY` dashboard variables inside your Render dashboard once deployed!
