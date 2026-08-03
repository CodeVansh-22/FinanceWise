from flask import Blueprint, request, jsonify
try:
    from flask_jwt_extended import jwt_required, get_jwt_identity
except ImportError:
    def jwt_required(*args, **kwargs):
        def decorator(fn): return fn
        return decorator
    def get_jwt_identity(): return "dummy_user_id"

from app.models.goal import create_goal, get_goals_by_user, update_goal_amount
from app.models.loan import create_loan, get_loans_by_user
from app.models.transaction import create_transaction

goals_loans_bp = Blueprint('goals_loans_bp', __name__)

@goals_loans_bp.route('/goals', methods=['GET', 'POST'])
@jwt_required()
def handle_goals():
    user_id = get_jwt_identity()
    
    if request.method == 'POST':
        data = request.get_json() or {}
        required = ["title", "target_amount", "deadline"]
        for f in required:
            if f not in data:
                return jsonify({"error": f"Missing field: {f}"}), 400

        goal_data = {
            "user_id": user_id,
            "title": data["title"],
            "target_amount": float(data["target_amount"]),
            "current_amount": float(data.get("current_amount", 0)),
            "category": data.get("category", "General"),
            "deadline": data["deadline"]
        }

        goal_id = create_goal(goal_data)
        return jsonify({"message": "Financial Goal created", "id": goal_id}), 201

    elif request.method == 'GET':
        goals = get_goals_by_user(user_id)
        return jsonify(goals), 200

@goals_loans_bp.route('/goals/<goal_id>/add-funds', methods=['PUT', 'POST'])
@jwt_required()
def add_funds(goal_id):
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    amount = float(data.get("amount", 0))
    
    if amount <= 0:
        return jsonify({"error": "Amount must be greater than 0"}), 400

    success = update_goal_amount(goal_id, user_id, amount)
    if not success:
        return jsonify({"error": "Goal not found"}), 404

    # Record expense transaction
    txn_data = {
        "user_id": user_id,
        "type": "expense",
        "amount": amount,
        "category": "Goal Savings",
        "description": f"Contribution to goal savings"
    }
    create_transaction(txn_data)

    return jsonify({"message": "Funds added successfully to goal"}), 200

@goals_loans_bp.route('/loans', methods=['GET', 'POST'])
@jwt_required()
def handle_loans():
    user_id = get_jwt_identity()

    if request.method == 'POST':
        data = request.get_json() or {}
        required = ["type", "principal", "emi", "remaining_months"]
        for f in required:
            if f not in data:
                return jsonify({"error": f"Missing field: {f}"}), 400

        loan_data = {
            "user_id": user_id,
            "title": data.get("title", f"{data['type']} Loan"),
            "type": data["type"],
            "principal": float(data["principal"]),
            "emi": float(data["emi"]),
            "interest_rate": float(data.get("interest_rate", 10.5)),
            "remaining_months": int(data["remaining_months"])
        }

        loan_id = create_loan(loan_data)
        return jsonify({"message": "Loan record created", "id": loan_id}), 201

    elif request.method == 'GET':
        loans = get_loans_by_user(user_id)
        return jsonify(loans), 200
