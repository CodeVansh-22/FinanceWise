from flask import Blueprint, request, jsonify
from models.goal import create_goal, get_goals_by_user, update_goal_amount
from models.loan import create_loan, get_loans_by_user
from flask_jwt_extended import jwt_required, get_jwt_identity

goals_loans_bp = Blueprint('goals_loans_bp', __name__)

@goals_loans_bp.route('/goals', methods=['GET', 'POST'])
@jwt_required()
def handle_goals():
    user_id = get_jwt_identity()
    if request.method == 'POST':
        data = request.json
        required = ["title", "target_amount", "deadline"]
        for field in required:
            if field not in data:
                return jsonify({"error": f"Missing {field}"}), 400
                
        from bson.objectid import ObjectId
        goal_data = {
            "user_id": ObjectId(user_id),
            "title": data["title"],
            "target_amount": float(data["target_amount"]),
            "deadline": data["deadline"]
        }
        goal_id = create_goal(goal_data)
        return jsonify({"message": "Goal created", "id": goal_id}), 201
        
    elif request.method == 'GET':
        goals = get_goals_by_user(user_id)
        return jsonify(goals), 200

@goals_loans_bp.route('/loans', methods=['GET', 'POST'])
@jwt_required()
def handle_loans():
    user_id = get_jwt_identity()
    if request.method == 'POST':
        data = request.json
        required = ["type", "principal", "emi", "remaining_months"]
        for field in required:
            if field not in data:
                return jsonify({"error": f"Missing {field}"}), 400
                
        from bson.objectid import ObjectId
        loan_data = {
            "user_id": ObjectId(user_id),
            "type": data["type"],
            "principal": float(data["principal"]),
            "emi": float(data["emi"]),
            "remaining_months": int(data["remaining_months"])
        }
        loan_id = create_loan(loan_data)
        return jsonify({"message": "Loan created", "id": loan_id}), 201
        
    elif request.method == 'GET':
        loans = get_loans_by_user(user_id)
        return jsonify(loans), 200
