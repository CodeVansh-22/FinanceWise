from bson import ObjectId
from datetime import datetime
from app.database.connection import get_db
from app.utils.json_encoder import serialize_doc

def create_loan(loan_data):
    db = get_db()
    if isinstance(loan_data.get("user_id"), str):
        loan_data["user_id"] = ObjectId(loan_data["user_id"])
    loan_data["created_at"] = datetime.utcnow()
    result = db.loans.insert_one(loan_data)
    return str(result.inserted_id)

def get_loans_by_user(user_id):
    db = get_db()
    loans = list(db.loans.find({"user_id": ObjectId(user_id)}).sort("created_at", -1))
    return serialize_doc(loans)
