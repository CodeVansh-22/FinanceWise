from flask import Blueprint, request, jsonify
try:
    from flask_jwt_extended import jwt_required, get_jwt_identity
except ImportError:
    def jwt_required(*args, **kwargs):
        def decorator(fn): return fn
        return decorator
    def get_jwt_identity(): return "dummy_user_id"

from app.models.user import create_user, find_user_by_email, find_user_by_id, update_user_profile
from app.auth.password_hasher import hash_password, check_password
from app.auth.jwt_manager import generate_tokens
from app.utils.validators import validate_email, validate_password
from app.utils.json_encoder import serialize_doc
import logging

logger = logging.getLogger(__name__)
auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json() or {}
        email = data.get('email', '').strip()
        name = data.get('name', '').strip()
        password = data.get('password', '')

        if not name:
            return jsonify({"error": "Name is required"}), 400
        if not validate_email(email):
            return jsonify({"error": "Valid email is required"}), 400
        if not validate_password(password):
            return jsonify({"error": "Password must be at least 6 characters"}), 400

        if find_user_by_email(email):
            return jsonify({"error": "An account with this email already exists"}), 400

        user_data = {
            "name": name,
            "email": email.lower(),
            "password_hash": hash_password(password),
            "monthly_income": float(data.get("monthly_income", 0)),
            "city": data.get("city", "Mumbai"),
            "financial_goal": data.get("financial_goal", "Wealth Building"),
            "role": data.get("role", "user"),
            "level": "Beginner"
        }

        user_id = create_user(user_data)
        tokens = generate_tokens(user_id, role=user_data["role"])

        return jsonify({
            "message": "User registered successfully",
            "token": tokens["access_token"],
            "access_token": tokens["access_token"],
            "refresh_token": tokens["refresh_token"],
            "user": {
                "id": user_id,
                "name": name,
                "email": email,
                "monthly_income": user_data["monthly_income"],
                "role": user_data["role"],
                "level": "Beginner"
            }
        }), 201

    except Exception as e:
        logger.error(f"Registration Error: {e}", exc_info=True)
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json() or {}
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        user = find_user_by_email(email)
        if not user or not check_password(password, user.get("password_hash", "")):
            return jsonify({"error": "Invalid email or password"}), 401

        user_id = str(user["_id"])
        role = user.get("role", "user")
        tokens = generate_tokens(user_id, role=role)

        return jsonify({
            "message": "Login successful",
            "token": tokens["access_token"],
            "access_token": tokens["access_token"],
            "refresh_token": tokens["refresh_token"],
            "user": {
                "id": user_id,
                "name": user.get("name", "User"),
                "email": user.get("email"),
                "monthly_income": user.get("monthly_income", 0),
                "role": role,
                "level": user.get("level", "Beginner")
            }
        }), 200

    except Exception as e:
        logger.error(f"Login Error: {e}", exc_info=True)
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

@auth_bp.route('/profile', methods=['GET', 'PUT'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = find_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User profile not found"}), 404

    if request.method == 'GET':
        user_clean = serialize_doc(user)
        user_clean.pop("password_hash", None)
        return jsonify(user_clean), 200

    if request.method == 'PUT':
        data = request.get_json() or {}
        allowed = ["name", "monthly_income", "city", "financial_goal", "level"]
        update_data = {k: v for k, v in data.items() if k in allowed}
        
        if "monthly_income" in update_data:
            update_data["monthly_income"] = float(update_data["monthly_income"])

        updated_user = update_user_profile(user_id, update_data)
        user_clean = serialize_doc(updated_user)
        user_clean.pop("password_hash", None)
        return jsonify({"message": "Profile updated successfully", "user": user_clean}), 200
