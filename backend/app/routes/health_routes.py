from flask import Blueprint, jsonify
from app.database.connection import get_db

health_bp = Blueprint('health_bp', __name__)

@health_bp.route('/health', methods=['GET'])
def health():
    db_status = "healthy"
    try:
        db = get_db()
        db.command('ping')
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    return jsonify({
        "status": "healthy" if "unhealthy" not in db_status else "degraded",
        "service": "FinanceWise Backend API",
        "database": db_status,
        "version": "2.0.0"
    }), 200

@health_bp.route('/docs', methods=['GET'])
def docs():
    return jsonify({
        "name": "FinanceWise API Specification",
        "version": "2.0.0",
        "endpoints": [
            {"path": "/api/auth/register", "methods": ["POST"], "description": "Register user account"},
            {"path": "/api/auth/login", "methods": ["POST"], "description": "Authenticate user & issue JWT"},
            {"path": "/api/auth/profile", "methods": ["GET", "PUT"], "description": "Get or update user profile"},
            {"path": "/api/transactions", "methods": ["GET", "POST"], "description": "Income & Expense CRUD"},
            {"path": "/api/transactions/summary", "methods": ["GET"], "description": "Transaction aggregates & savings"},
            {"path": "/api/transactions/export/pdf", "methods": ["GET"], "description": "Export transactions PDF"},
            {"path": "/api/transactions/export/excel", "methods": ["GET"], "description": "Export transactions Excel"},
            {"path": "/api/invoices", "methods": ["GET", "POST"], "description": "Invoicing CRUD"},
            {"path": "/api/goals", "methods": ["GET", "POST"], "description": "Financial goals management"},
            {"path": "/api/loans", "methods": ["GET", "POST"], "description": "Loans tracking"},
            {"path": "/api/analytics/dashboard", "methods": ["GET"], "description": "Full dashboard metrics & health score"},
            {"path": "/api/ai/chat", "methods": ["POST"], "description": "Arth AI assistant interaction"},
            {"path": "/api/learn/cards", "methods": ["GET"], "description": "Financial learning flashcards"},
            {"path": "/api/learn/quiz", "methods": ["GET"], "description": "Financial quiz questions"}
        ]
    }), 200
