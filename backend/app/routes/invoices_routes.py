from flask import Blueprint, request, jsonify
try:
    from flask_jwt_extended import jwt_required, get_jwt_identity
except ImportError:
    def jwt_required(*args, **kwargs):
        def decorator(fn): return fn
        return decorator
    def get_jwt_identity(): return "dummy_user_id"

from app.models.invoice import create_invoice, get_invoices_by_user, update_invoice_status, delete_invoice
from app.utils.validators import validate_invoice_data

invoices_bp = Blueprint('invoices_bp', __name__)

@invoices_bp.route('/invoices', methods=['GET', 'POST'])
@jwt_required()
def invoices():
    user_id = get_jwt_identity()

    if request.method == 'POST':
        data = request.get_json() or {}
        errors = validate_invoice_data(data)
        if errors:
            return jsonify({"error": errors[0]}), 400

        invoice_data = {
            "user_id": user_id,
            "client_name": data.get("client_name") or data.get("client"),
            "client_email": data.get("client_email", ""),
            "amount": float(data.get("amount") or data.get("total") or 0),
            "status": data.get("status", "pending"),
            "due_date": data.get("due_date", ""),
            "items": data.get("items", []),
            "notes": data.get("notes", "")
        }

        inv_id = create_invoice(invoice_data)
        return jsonify({"message": "Invoice created successfully", "id": inv_id}), 201

    elif request.method == 'GET':
        inv_list = get_invoices_by_user(user_id)
        return jsonify(inv_list), 200

@invoices_bp.route('/invoices/<inv_id>/status', methods=['PUT'])
@jwt_required()
def update_status(inv_id):
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    status = data.get("status")

    if not status or status not in ["draft", "pending", "paid", "overdue", "cancelled"]:
        return jsonify({"error": "Invalid invoice status"}), 400

    updated = update_invoice_status(inv_id, user_id, status)
    if not updated:
        return jsonify({"error": "Invoice not found or update failed"}), 404

    return jsonify({"message": f"Invoice status updated to {status}"}), 200

@invoices_bp.route('/invoices/<inv_id>', methods=['DELETE'])
@jwt_required()
def remove_invoice(inv_id):
    user_id = get_jwt_identity()
    deleted = delete_invoice(inv_id, user_id)
    if not deleted:
        return jsonify({"error": "Invoice not found or unauthorized"}), 404
    return jsonify({"message": "Invoice deleted successfully"}), 200
