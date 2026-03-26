import random
from flask import Blueprint, jsonify, request

learn_bp = Blueprint('learn_bp', __name__)

all_cards = [
    {"id": 1, "title": "What is SIP?", "explanation": "Systematic Investment Plan allows you to invest a fixed amount regularly in mutual funds.", "tip": "Start a SIP with as low as ₹500/month."},
    {"id": 2, "title": "Emergency Fund", "explanation": "A fund kept aside to cover unexpected expenses like medical bills or job loss.", "tip": "Save at least 6 months of your expenses."},
    {"id": 3, "title": "80C Tax Deduction", "explanation": "Under Section 80C, you can reduce your taxable income by up to ₹1.5 Lakhs.", "tip": "Invest in ELSS, PPF, or EPF to claim this."},
    {"id": 4, "title": "Term Insurance", "explanation": "A life insurance product that provides financial cover to your family at a low premium.", "tip": "Buy it when you are young to lock in low premiums."},
    {"id": 5, "title": "Compounding", "explanation": "Earning returns on your returns over time. It makes your money grow exponentially.", "tip": "Stay invested for long periods to see the magic."},
    {"id": 6, "title": "Mutual Funds", "explanation": "A pool of money from multiple investors, managed by an expert fund manager.", "tip": "Start with index funds for low cost and diversification."},
    {"id": 7, "title": "PPF Account", "explanation": "Public Provident Fund is a government-backed savings scheme with tax benefits under 80C.", "tip": "Lock-in is 15 years but partial withdrawal allowed after 7."},
    {"id": 8, "title": "Gold Investment", "explanation": "Gold is a safe-haven asset that protects against inflation and economic uncertainty.", "tip": "Try Sovereign Gold Bonds (SGBs) for extra 2.5% interest."},
    {"id": 9, "title": "Health Insurance", "explanation": "Covers medical expenses for hospitalization, surgeries, and critical illnesses.", "tip": "Buy a ₹5L+ cover with top-up for family protection."},
    {"id": 10, "title": "NPS (Pension)", "explanation": "National Pension System gives extra ₹50K tax deduction under 80CCD(1B).", "tip": "Choose aggressive allocation if you are under 35."},
    {"id": 11, "title": "CIBIL Score", "explanation": "Your credit score (300-900) impacts loan approval and interest rates.", "tip": "Keep it above 750 by paying bills on time and low utilization."},
    {"id": 12, "title": "Inflation", "explanation": "Prices increase ~6% yearly in India. Your money loses value if not invested.", "tip": "Your investments must beat inflation to grow real wealth."},
    {"id": 13, "title": "Diversification", "explanation": "Spread investments across stocks, bonds, gold, and FDs to reduce risk.", "tip": "Never put all your money in a single asset class."},
    {"id": 14, "title": "ELSS Funds", "explanation": "Equity Linked Savings Scheme: mutual funds with 3-year lock-in and 80C benefit.", "tip": "Shortest lock-in among all 80C options with equity returns."},
    {"id": 15, "title": "FD vs RD", "explanation": "Fixed Deposit is lump sum; Recurring Deposit is monthly. Both give fixed returns.", "tip": "FD/RD returns often don't beat inflation — use for short-term only."},
    {"id": 16, "title": "Debt Trap", "explanation": "When your EMIs and credit card dues exceed 50% of your income, you are in danger.", "tip": "Follow the 50-30-20 rule: Needs-Wants-Savings."},
    {"id": 17, "title": "Budgeting", "explanation": "Track your income and expenses to know exactly where your money goes.", "tip": "Use the 50-30-20 rule as a starting framework."},
    {"id": 18, "title": "EPF (PF)", "explanation": "Employee Provident Fund is a retirement corpus auto-deducted from your salary.", "tip": "Don't withdraw early — let compounding work for 20+ years."},
    {"id": 19, "title": "Sukanya Samriddhi", "explanation": "Government scheme for girl child offering ~8% interest with 80C benefit.", "tip": "Max deposit ₹1.5L/year. Matures when girl turns 21."},
    {"id": 20, "title": "Real Estate", "explanation": "Property can give rental income + appreciation but needs large capital.", "tip": "REITs let you invest in real estate with as low as ₹500."},
]

all_quiz = [
    {"question": "How much should an emergency fund be?", "options": ["1 month expense", "3-6 months expense", "1 year income"], "answer": "3-6 months expense"},
    {"question": "What is the max deduction under 80C?", "options": ["₹1 Lakh", "₹1.5 Lakhs", "₹2 Lakhs"], "answer": "₹1.5 Lakhs"},
    {"question": "What is the lock-in period of ELSS?", "options": ["1 year", "3 years", "5 years"], "answer": "3 years"},
    {"question": "What does SIP stand for?", "options": ["Savings Investment Plan", "Systematic Investment Plan", "Simple Interest Payment"], "answer": "Systematic Investment Plan"},
    {"question": "A good CIBIL score is above?", "options": ["500", "650", "750"], "answer": "750"},
    {"question": "Which is a government pension scheme?", "options": ["ULIP", "NPS", "ELSS"], "answer": "NPS"},
    {"question": "PPF lock-in period is?", "options": ["5 years", "10 years", "15 years"], "answer": "15 years"},
    {"question": "50-30-20 rule means?", "options": ["Invest-Save-Spend", "Needs-Wants-Savings", "Food-Rent-Fun"], "answer": "Needs-Wants-Savings"},
    {"question": "What is compounding?", "options": ["Earning on principal only", "Earning returns on your returns", "Fixed monthly income"], "answer": "Earning returns on your returns"},
    {"question": "Sovereign Gold Bonds give extra interest of?", "options": ["1%", "2.5%", "5%"], "answer": "2.5%"},
    {"question": "What section gives extra ₹50K NPS deduction?", "options": ["80C", "80D", "80CCD(1B)"], "answer": "80CCD(1B)"},
    {"question": "Term Insurance provides?", "options": ["Maturity bonus", "Financial cover to family", "Monthly pension"], "answer": "Financial cover to family"},
    {"question": "Inflation in India is roughly?", "options": ["2%", "6%", "12%"], "answer": "6%"},
    {"question": "Health insurance cover should be at least?", "options": ["₹1 Lakh", "₹5 Lakhs", "₹50 Lakhs"], "answer": "₹5 Lakhs"},
    {"question": "What does diversification reduce?", "options": ["Returns", "Risk", "Taxes"], "answer": "Risk"},
]

@learn_bp.route('/learn/cards', methods=['GET'])
def get_cards():
    count = int(request.args.get('count', 5))
    count = min(count, len(all_cards))
    selected = random.sample(all_cards, count)
    return jsonify(selected), 200

@learn_bp.route('/learn/quiz', methods=['GET'])
def get_quiz():
    count = int(request.args.get('count', 4))
    count = min(count, len(all_quiz))
    selected = random.sample(all_quiz, count)
    return jsonify(selected), 200
