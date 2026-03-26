from flask import Blueprint, request, jsonify
from models.user import create_user, find_user_by_email, find_user_by_id
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing request body"}), 400
            
        required_fields = ["name", "email", "password", "monthly_income"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing {field}"}), 400
    
    if find_user_by_email(data["email"]):
        return jsonify({"error": "Email already exists"}), 400
        
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
    
    user_id = create_user(user_data)
    
    # Optional: Onboarding quiz to give Health Score can be done later, default is 0
    access_token = create_access_token(identity=user_id)
    return jsonify({"message": "User created successfully", "token": access_token}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print("Login Request Data:", data) # Debugging log
        
        if not data:
            return jsonify({"error": "Missing request body"}), 400
            
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        user = find_user_by_email(email)
        
        if not user:
            return jsonify({"error": "Invalid credentials"}), 401
            
        if not bcrypt.checkpw(password.encode('utf-8'), user["password_hash"].encode('utf-8')):
            return jsonify({"error": "Invalid credentials"}), 401
            
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
        print(f"Login Error: {str(e)}") # Log the error
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
