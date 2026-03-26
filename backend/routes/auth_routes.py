from flask import Blueprint, request, jsonify
from models.user import create_user, find_user_by_email, find_user_by_id
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print(f"DEBUG: Register attempt for email: {data.get('email')}")
        if not data:
            return jsonify({"error": "Missing request body"}), 400
            
        required_fields = ["name", "email", "password", "monthly_income"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing {field}"}), 400
        
        print("DEBUG: Checking if user exists...")
        if find_user_by_email(data["email"]):
            return jsonify({"error": "Email already exists"}), 400
            
        print("DEBUG: Hashing password...")
        # Hash password
        hashed = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt())
        
        user_data = {
            "name": data["name"],
            "email": data["email"],
            "password_hash": hashed.decode('utf-8'),
            "monthly_income": float(data["monthly_income"]),
            "city": data.get("city", "Unknown"),
            "financial_goal": data.get("financial_goal", "")
        }
        
        print("DEBUG: Creating user in DB...")
        user_id = create_user(user_data)
        print(f"DEBUG: User created with ID: {user_id}")
        
        access_token = create_access_token(identity=user_id)
        return jsonify({"message": "User created successfully", "token": access_token}), 201
    except Exception as e:
        import traceback
        print(f"CRITICAL Registration Error: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        print(f"DEBUG: Login attempt for email: {email}")
        
        if not data or not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        print("DEBUG: Finding user...")
        user = find_user_by_email(email)
        
        if not user:
            print("DEBUG: User not found.")
            return jsonify({"error": "Invalid credentials"}), 401
            
        print("DEBUG: Verifying password hash...")
        stored_hash = user["password_hash"]
        if isinstance(stored_hash, str):
            stored_hash = stored_hash.encode('utf-8')
            
        if not bcrypt.checkpw(password.encode('utf-8'), stored_hash):
            print("DEBUG: Password mismatch.")
            return jsonify({"error": "Invalid credentials"}), 401
            
        print("DEBUG: Login successful, creating token.")
        access_token = create_access_token(identity=str(user["_id"]))
        return jsonify({
            "message": "Login successful", 
            "token": access_token, 
            "user": {
                "name": user.get("name", "User"), 
                "email": user.get("email"), 
                "level": user.get("level", "Beginner")
            }
        }), 200
    except Exception as e:
        import traceback
        print(f"CRITICAL Login Error: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

@auth_bp.route('/profile', methods=['GET', 'PUT'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = find_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
        
    if request.method == 'GET':
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return jsonify(user), 200
        
    if request.method == 'PUT':
        # Stub for profile updating
        return jsonify({"error": "Not implemented yet"}), 501
