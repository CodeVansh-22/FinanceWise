from flask import Blueprint, request, jsonify, Response
try:
    from flask_jwt_extended import jwt_required, get_jwt_identity
except ImportError:
    def jwt_required(*args, **kwargs):
        def decorator(fn): return fn
        return decorator
    def get_jwt_identity(): return "dummy_user_id"

from app.models.transaction import (
    create_transaction,
    get_transactions_by_user,
    delete_transaction_by_id,
    update_transaction,
    get_transaction_by_id
)
from app.utils.validators import validate_transaction_data
from app.utils.export_helpers import generate_transactions_excel, generate_transactions_pdf
from app.utils.json_encoder import serialize_doc

transactions_bp = Blueprint('transactions_bp', __name__)

@transactions_bp.route('/transactions', methods=['GET', 'POST'])
@jwt_required()
def transactions():
    user_id = get_jwt_identity()

    if request.method == 'POST':
        data = request.get_json() or {}
        errors = validate_transaction_data(data)
        if errors:
            return jsonify({"error": errors[0], "details": errors}), 400

        txn_data = {
            "user_id": user_id,
            "type": data["type"],
            "amount": float(data["amount"]),
            "category": data["category"],
            "description": data.get("description", ""),
            "date": data.get("date") or data.get("created_at") or "",
            "status": data.get("status", "completed")
        }

        txn_id = create_transaction(txn_data)
        return jsonify({"message": "Transaction recorded successfully", "id": txn_id}), 201

    elif request.method == 'GET':
        txns = get_transactions_by_user(user_id)
        return jsonify(txns), 200

@transactions_bp.route('/transactions/<txn_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def transaction_detail(txn_id):
    user_id = get_jwt_identity()

    if request.method == 'GET':
        txn = get_transaction_by_id(txn_id, user_id)
        if not txn:
            return jsonify({"error": "Transaction not found"}), 404
        return jsonify(txn), 200

    elif request.method == 'PUT':
        data = request.get_json() or {}
        success = update_transaction(txn_id, user_id, data)
        if not success:
            return jsonify({"error": "Failed to update transaction"}), 400
        return jsonify({"message": "Transaction updated successfully"}), 200

    elif request.method == 'DELETE':
        deleted = delete_transaction_by_id(txn_id, user_id)
        if not deleted:
            return jsonify({"error": "Transaction not found or unauthorized"}), 404
        return jsonify({"message": "Transaction deleted successfully"}), 200

@transactions_bp.route('/transactions/summary', methods=['GET'])
@jwt_required()
def transaction_summary():
    user_id = get_jwt_identity()
    txns = get_transactions_by_user(user_id)

    total_income = sum(float(t.get("amount", 0)) for t in txns if t.get("type") == "income")
    total_expense = sum(float(t.get("amount", 0)) for t in txns if t.get("type") == "expense")

    category_breakdown = {}
    for t in txns:
        if t.get("type") == "expense":
            cat = t.get("category", "General")
            category_breakdown[cat] = category_breakdown.get(cat, 0) + float(t.get("amount", 0))

    summary = {
        "total_income": total_income,
        "total_expense": total_expense,
        "savings": total_income - total_expense,
        "category_breakdown": category_breakdown,
        "transaction_count": len(txns)
    }

    return jsonify(summary), 200

@transactions_bp.route('/transactions/export/excel', methods=['GET'])
@jwt_required()
def export_excel():
    user_id = get_jwt_identity()
    txns = get_transactions_by_user(user_id)
    excel_bytes = generate_transactions_excel(txns)
    return Response(
        excel_bytes,
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment;filename=FinanceWise_Transactions.xlsx"}
    )

@transactions_bp.route('/transactions/export/pdf', methods=['GET'])
@jwt_required()
def export_pdf():
    user_id = get_jwt_identity()
    txns = get_transactions_by_user(user_id)
    pdf_bytes = generate_transactions_pdf(txns, "Transactions Statement")
    return Response(
        pdf_bytes,
        mimetype="application/pdf",
        headers={"Content-Disposition": "attachment;filename=FinanceWise_Statement.pdf"}
    )
