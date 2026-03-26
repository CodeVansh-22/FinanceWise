from flask import Blueprint, request, jsonify
from models.transaction import create_transaction, get_transactions_by_user, delete_transaction_by_id
from flask_jwt_extended import jwt_required, get_jwt_identity

budget_bp = Blueprint('budget_bp', __name__)

@budget_bp.route('/transactions', methods=['GET', 'POST'])
@jwt_required()
def transactions():
    user_id = get_jwt_identity()
    
    if request.method == 'POST':
        data = request.json
        required_fields = ["type", "amount", "category"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing {field}"}), 400
                
        from bson.objectid import ObjectId
        txn_data = {
            "user_id": ObjectId(user_id),
            "type": data["type"],
            "amount": float(data["amount"]),
            "category": data["category"],
            "description": data.get("description", "")
        }
        
        txn_id = create_transaction(txn_data)
        return jsonify({"message": "Transaction added", "id": txn_id}), 201
        
    elif request.method == 'GET':
        txns = get_transactions_by_user(user_id)
        return jsonify(txns), 200

@budget_bp.route('/transactions/<txn_id>', methods=['DELETE'])
@jwt_required()
def delete_transaction(txn_id):
    user_id = get_jwt_identity()
    deleted = delete_transaction_by_id(txn_id, user_id)
    if not deleted:
        return jsonify({"error": "Transaction not found or unauthorized"}), 404
    return jsonify({"message": "Transaction deleted"}), 200

@budget_bp.route('/transactions/summary', methods=['GET'])
@jwt_required()
def transaction_summary():
    user_id = get_jwt_identity()
    txns = get_transactions_by_user(user_id)
    
    summary = {
        "total_income": sum(t["amount"] for t in txns if t["type"] == "income"),
        "total_expense": sum(t["amount"] for t in txns if t["type"] == "expense"),
        "category_breakdown": {}
    }
    
    for t in txns:
        if t["type"] == "expense":
            cat = t["category"]
            summary["category_breakdown"][cat] = summary["category_breakdown"].get(cat, 0) + t["amount"]
            
    summary["savings"] = summary["total_income"] - summary["total_expense"]
    
    return jsonify(summary), 200
