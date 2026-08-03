from bson import ObjectId
from datetime import datetime
from app.database.connection import get_db

def create_user(user_data):
    db = get_db()
    user_data["created_at"] = datetime.utcnow()
    user_data["updated_at"] = datetime.utcnow()
    user_data.setdefault("role", "user")
    user_data.setdefault("level", "Beginner")
    user_data.setdefault("monthly_income", 0.0)
    result = db.users.insert_one(user_data)
    return str(result.inserted_id)

def find_user_by_email(email):
    if not email:
        return None
    db = get_db()
    return db.users.find_one({"email": email.strip().lower()})

def find_user_by_id(user_id):
    db = get_db()
    try:
        return db.users.find_one({"_id": ObjectId(user_id)})
    except Exception:
        return None

def update_user_profile(user_id, update_fields):
    db = get_db()
    update_fields["updated_at"] = datetime.utcnow()
    db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update_fields})
    return find_user_by_id(user_id)
