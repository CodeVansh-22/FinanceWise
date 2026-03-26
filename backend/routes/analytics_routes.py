from flask import Blueprint, jsonify
from models.user import find_user_by_id
from models.transaction import get_transactions_by_user
from models.goal import get_goals_by_user
from flask_jwt_extended import jwt_required, get_jwt_identity

analytics_bp = Blueprint('analytics_bp', __name__)

@analytics_bp.route('/analytics/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    user_id = get_jwt_identity()
    user = find_user_by_id(user_id)
    txns = get_transactions_by_user(user_id)
    goals = get_goals_by_user(user_id)
    
    total_income = sum(t["amount"] for t in txns if t["type"] == "income")
    total_expense = sum(t["amount"] for t in txns if t["type"] == "expense")
    savings = total_income - total_expense
    savings_rate = (savings / total_income * 100) if total_income > 0 else 0
    
    return jsonify({
        "health_score": user.get("health_score", 0),
        "level": user.get("level", "Beginner"),
        "total_income": total_income,
        "total_expense": total_expense,
        "savings_rate": savings_rate,
        "active_goals_count": len(goals),
        "recent_transactions": txns[:5] # latest 5
    }), 200
