from bson import ObjectId
from datetime import datetime
from app.database.connection import get_db
from app.utils.json_encoder import serialize_doc

def create_transaction(txn_data):
    db = get_db()
    if isinstance(txn_data.get("user_id"), str):
        txn_data["user_id"] = ObjectId(txn_data["user_id"])
    txn_data["created_at"] = datetime.utcnow()
    txn_data.setdefault("date", datetime.utcnow().strftime("%Y-%m-%d"))
    txn_data.setdefault("status", "completed")
    result = db.transactions.insert_one(txn_data)
    return str(result.inserted_id)

def get_transactions_by_user(user_id, limit=500):
    db = get_db()
    txns = list(db.transactions.find({"user_id": ObjectId(user_id)}).sort("created_at", -1).limit(limit))
    return serialize_doc(txns)

def get_transaction_by_id(txn_id, user_id):
    db = get_db()
    try:
        doc = db.transactions.find_one({"_id": ObjectId(txn_id), "user_id": ObjectId(user_id)})
        return serialize_doc(doc)
    except Exception:
        return None

def update_transaction(txn_id, user_id, update_data):
    db = get_db()
    try:
        update_data["updated_at"] = datetime.utcnow()
        result = db.transactions.update_one(
            {"_id": ObjectId(txn_id), "user_id": ObjectId(user_id)},
            {"$set": update_data}
        )
        return result.modified_count > 0
    except Exception:
        return False

def delete_transaction_by_id(txn_id, user_id):
    db = get_db()
    try:
        res = db.transactions.delete_one({"_id": ObjectId(txn_id), "user_id": ObjectId(user_id)})
        return res.deleted_count > 0
    except Exception:
        return False
