"""
API routes for managing financial goals and loans.
Handles user financial tracking operations.
"""

from bson import ObjectId
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

# Local models
from models.goal import (
    create_goal,
    get_goals_by_user,
    get_goals_collection,
    update_goal_amount
)
from models.loan import create_loan, get_loans_by_user
from models.transaction import create_transaction

goals_loans_bp = Blueprint("goals_loans_bp", __name__)


@goals_loans_bp.route("/goals", methods=["GET", "POST"])
@jwt_required()
def handle_goals():
    """Handle goal creation and listing."""
    user_id = get_jwt_identity()
    try:
        if request.method == "POST":
            data = request.get_json()
            if data is None:
                return jsonify({"error": "No data provided"}), 400

            required = ["title", "target_amount", "deadline"]
            for field in required:
                if field not in data:
                    return jsonify({"error": f"Missing {field}"}), 400

            goal_data = {
                "user_id": ObjectId(user_id),
                "title": data["title"],
                "target_amount": float(data["target_amount"]),
                "deadline": data["deadline"]
            }
            goal_id = create_goal(goal_data)
            return jsonify({"message": "Goal created", "id": goal_id}), 201

        if request.method == "GET":
            goals = get_goals_by_user(user_id)
            return jsonify(goals), 200

        return jsonify({"error": "Method not allowed"}), 405
    except (ValueError, TypeError) as err:
        return jsonify({"error": f"Invalid data: {str(err)}"}), 400
    except Exception as err:  # pylint: disable=broad-except
        return jsonify({"error": f"Server error: {str(err)}"}), 500


@goals_loans_bp.route("/goals/<goal_id>", methods=["PUT"])
@jwt_required()
def add_funds_to_goal(goal_id):
    """Add funds to a goal and record an expense."""
    user_id = get_jwt_identity()
    try:
        data = request.get_json()
        if data is None:
            return jsonify({"error": "No data provided"}), 400

        amount_to_add = float(data.get("amount", 0))
        if amount_to_add <= 0:
            return jsonify({"error": "Amount must be > 0"}), 400

        update_goal_amount(goal_id, amount_to_add)

        # Create a transaction entry for the fund addition
        goal = get_goals_collection().find_one({"_id": ObjectId(goal_id)})
        goal_title = "Goal"
        if goal is not None:
            goal_title = goal.get("title", "Goal")

        txn_data = {
            "user_id": ObjectId(user_id),
            "type": "expense",
            "amount": amount_to_add,
            "category": "Goal",
            "description": f"Added funds to goal: {goal_title}"
        }
        create_transaction(txn_data)

        return jsonify({"message": "Updated and recorded"}), 200
    except (ValueError, TypeError) as err:
        return jsonify({"error": f"Invalid fund data: {str(err)}"}), 400
    except Exception as err:  # pylint: disable=broad-except
        return jsonify({"error": f"Add funds failed: {str(err)}"}), 500


@goals_loans_bp.route("/loans", methods=["GET", "POST"])
@jwt_required()
def handle_loans():
    """Handle loan tracking and retrieval."""
    user_id = get_jwt_identity()
    try:
        if request.method == "POST":
            data = request.get_json()
            if data is None:
                return jsonify({"error": "No data provided"}), 400

            required = ["type", "principal", "emi", "remaining_months"]
            for field in required:
                if field not in data:
                    return jsonify({"error": f"Missing {field}"}), 400

            loan_data = {
                "user_id": ObjectId(user_id),
                "type": data["type"],
                "principal": float(data["principal"]),
                "emi": float(data["emi"]),
                "remaining_months": int(data["remaining_months"])
            }
            loan_id = create_loan(loan_data)
            return jsonify({"message": "Loan created", "id": loan_id}), 201

        if request.method == "GET":
            loans = get_loans_by_user(user_id)
            return jsonify(loans), 200

        return jsonify({"error": "Method not allowed"}), 405
    except (ValueError, TypeError) as err:
        return jsonify({"error": f"Invalid loan data: {str(err)}"}), 400
    except Exception as err:  # pylint: disable=broad-except
        return jsonify({"error": f"Loan error: {str(err)}"}), 500
