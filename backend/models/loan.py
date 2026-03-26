from models.db import get_db
from bson.objectid import ObjectId

def get_loans_collection():
    return get_db()["loans"]

def create_loan(loan_data):
    """
    loan_data: user_id, type, principal, emi, remaining_months
    """
    loans = get_loans_collection()
    result = loans.insert_one(loan_data)
    return str(result.inserted_id)

def get_loans_by_user(user_id):
    loans_coll = get_loans_collection()
    loans = list(loans_coll.find({"user_id": ObjectId(user_id)}))
    for l in loans:
        l["_id"] = str(l["_id"])
        l["user_id"] = str(l["user_id"])
    return loans
