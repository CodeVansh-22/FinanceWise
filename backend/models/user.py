from models.db import get_db
import datetime

def get_users_collection():
    return get_db()["users"]

def create_user(user_data):
    """
    Expects user_data to have: name, email, password_hash, monthly_income, city, financial_goal
    """
    users = get_users_collection()
    user_data["created_at"] = datetime.datetime.utcnow()
    user_data.setdefault("health_score", 0)
    user_data.setdefault("level", "Beginner")
    user_data.setdefault("badges", [])
    result = users.insert_one(user_data)
    user_id_str = str(result.inserted_id)
    
    from models.transaction import create_transaction
    from bson.objectid import ObjectId
    
    # Pre-load demo transactions for new user
    t1 = {"user_id": ObjectId(user_id_str), "type": "income", "amount": float(user_data.get("monthly_income", 0)), "category": "Salary", "description": "Monthly Salary"}
    t2 = {"user_id": ObjectId(user_id_str), "type": "expense", "amount": 5000, "category": "Food", "description": "Monthly Groceries"}
    t3 = {"user_id": ObjectId(user_id_str), "type": "expense", "amount": 2500, "category": "Entertainment", "description": "Weekend outings"}
    try:
        create_transaction(t1)
        create_transaction(t2)
        create_transaction(t3)
    except Exception as e:
        print("Failed seeding demo txns", e)
        
    return user_id_str

def find_user_by_email(email):
    users = get_users_collection()
    return users.find_one({"email": email})

def find_user_by_id(user_id):
    from bson.objectid import ObjectId
    users = get_users_collection()
    return users.find_one({"_id": ObjectId(user_id)})
