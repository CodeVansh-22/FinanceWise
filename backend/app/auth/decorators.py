from functools import wraps
from flask import jsonify

try:
    from flask_jwt_extended import get_jwt, jwt_required, get_jwt_identity
except ImportError:
    def jwt_required(*args, **kwargs):
        def decorator(fn):
            return fn
        return decorator
    def get_jwt():
        return {}
    def get_jwt_identity():
        return None

from app.database.connection import get_db
from bson import ObjectId

def admin_required():
    def decorator(fn):
        @wraps(fn)
        @jwt_required()
        def wrapper(*args, **kwargs):
            claims = get_jwt()
            if claims.get("role") != "admin":
                user_id = get_jwt_identity()
                db = get_db()
                user = db.users.find_one({"_id": ObjectId(user_id)})
                if not user or user.get("role") != "admin":
                    return jsonify({"error": "Admin access required"}), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator
