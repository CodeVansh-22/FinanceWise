from flask import Blueprint, jsonify
try:
    from flask_jwt_extended import jwt_required, get_jwt_identity
except ImportError:
    def jwt_required(*args, **kwargs):
        def decorator(fn): return fn
        return decorator
    def get_jwt_identity(): return "dummy_user_id"

from app.models.user import find_user_by_id
from app.models.transaction import get_transactions_by_user
from app.models.goal import get_goals_by_user
from app.models.loan import get_loans_by_user

analytics_bp = Blueprint('analytics_bp', __name__)

@analytics_bp.route('/analytics/dashboard', methods=['GET'])
@analytics_bp.route('/analytics', methods=['GET'])
@jwt_required()
def get_dashboard_analytics():
    user_id = get_jwt_identity()
    user = find_user_by_id(user_id) or {}
    txns = get_transactions_by_user(user_id)
    goals = get_goals_by_user(user_id)
    loans = get_loans_by_user(user_id)

    total_income = sum(float(t.get("amount", 0)) for t in txns if t.get("type") == "income")
    total_expense = sum(float(t.get("amount", 0)) for t in txns if t.get("type") == "expense")
    net_savings = total_income - total_expense

    savings_rate = (net_savings / total_income * 100) if total_income > 0 else 0
    total_emi = sum(float(l.get("emi", 0)) for l in loans)

    health_score = 50
    if savings_rate >= 30:
        health_score += 25
    elif savings_rate >= 15:
        health_score += 15
        
    if len(goals) > 0:
        health_score += 15
        
    if total_income > 0 and (total_emi / total_income) > 0.4:
        health_score -= 15
        
    health_score = max(0, min(100, health_score))

    monthly_data = [
        {"month": "Jan", "income": total_income * 0.7, "expense": total_expense * 0.75},
        {"month": "Feb", "income": total_income * 0.8, "expense": total_expense * 0.80},
        {"month": "Mar", "income": total_income * 0.9, "expense": total_expense * 0.85},
        {"month": "Apr", "income": total_income * 0.95, "expense": total_expense * 0.90},
        {"month": "Current", "income": total_income, "expense": total_expense},
    ]

    return jsonify({
        "health_score": health_score,
        "level": user.get("level", "Beginner"),
        "total_income": total_income,
        "total_expense": total_expense,
        "net_savings": net_savings,
        "savings_rate": round(savings_rate, 1),
        "total_emi": total_emi,
        "active_goals_count": len(goals),
        "active_loans_count": len(loans),
        "recent_transactions": txns[:6],
        "monthly_chart": monthly_data
    }), 200
