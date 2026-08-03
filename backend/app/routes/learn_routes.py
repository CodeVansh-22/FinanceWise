import random
from flask import Blueprint, jsonify, request

learn_bp = Blueprint('learn_bp', __name__)

ALL_CARDS = [
    {"id": 1, "title": "What is SIP?", "explanation": "Systematic Investment Plan allows you to invest a fixed amount regularly in mutual funds.", "tip": "Start a SIP with as low as ₹500/month."},
    {"id": 2, "title": "Emergency Fund", "explanation": "A fund kept aside to cover unexpected expenses like medical bills or job loss.", "tip": "Save at least 6 months of your expenses."},
    {"id": 3, "title": "80C Tax Deduction", "explanation": "Under Section 80C, you can reduce your taxable income by up to ₹1.5 Lakhs.", "tip": "Invest in ELSS, PPF, or EPF to claim this."},
    {"id": 4, "title": "Term Insurance", "explanation": "A life insurance product that provides financial cover to your family at a low premium.", "tip": "Buy it when you are young to lock in low premiums."},
    {"id": 5, "title": "Power of Compounding", "explanation": "Earning returns on your returns over time. It makes your money grow exponentially.", "tip": "Stay invested for long periods to see compound growth."},
    {"id": 6, "title": "Index Mutual Funds", "explanation": "Low-cost passive mutual funds tracking major indices like Nifty 50.", "tip": "Ideal for long-term wealth building with low expense ratio."},
    {"id": 7, "title": "PPF Account", "explanation": "Public Provident Fund is a sovereign guaranteed tax-free saving scheme.", "tip": "Current interest is 7.1% tax-free under EEE status."},
    {"id": 8, "title": "Sovereign Gold Bonds", "explanation": "RBI issued bonds linked to gold price plus 2.5% annual interest.", "tip": "No physical storage risk and capital gains tax exempt on maturity."},
    {"id": 9, "title": "Health Insurance", "explanation": "Covers medical expenses for hospitalization and critical care.", "tip": "Get family floater cover of minimum ₹5 Lakhs to ₹10 Lakhs."},
    {"id": 10, "title": "CIBIL Score", "explanation": "3-digit score (300-900) defining your creditworthiness.", "tip": "Keep score above 750 for low interest rates on loans."}
]

ALL_QUIZ = [
    {"id": 1, "question": "How much should an emergency fund ideally cover?", "options": ["1 month expense", "3-6 months expense", "1 year income"], "answer": "3-6 months expense"},
    {"id": 2, "question": "What is the maximum annual tax deduction under Section 80C?", "options": ["₹1 Lakh", "₹1.5 Lakhs", "₹2.5 Lakhs"], "answer": "₹1.5 Lakhs"},
    {"id": 3, "question": "What is the mandatory lock-in period for ELSS mutual funds?", "options": ["1 year", "3 years", "5 years"], "answer": "3 years"},
    {"id": 4, "question": "What does SIP stand for?", "options": ["Savings Investment Plan", "Systematic Investment Plan", "Simple Interest Payment"], "answer": "Systematic Investment Plan"},
    {"id": 5, "question": "A healthy CIBIL score is generally considered to be above?", "options": ["500", "650", "750"], "answer": "750"}
]

@learn_bp.route('/learn/cards', methods=['GET'])
def get_cards():
    count = int(request.args.get('count', 6))
    count = min(count, len(ALL_CARDS))
    selected = random.sample(ALL_CARDS, count)
    return jsonify(selected), 200

@learn_bp.route('/learn/quiz', methods=['GET'])
def get_quiz():
    count = int(request.args.get('count', 5))
    count = min(count, len(ALL_QUIZ))
    selected = random.sample(ALL_QUIZ, count)
    return jsonify(selected), 200
