from models.db import get_db
import datetime

def get_transactions_collection():
    return get_db()["transactions"]

def create_transaction(txn_data):
    txn_coll = get_transactions_collection()
    if "date" not in txn_data:
        txn_data["date"] = datetime.datetime.utcnow()
    result = txn_coll.insert_one(txn_data)
    return str(result.inserted_id)

def get_transactions_by_user(user_id):
    from bson.objectid import ObjectId
    txn_coll = get_transactions_collection()
    txns = list(txn_coll.find({"user_id": ObjectId(user_id)}).sort("date", -1))
    for t in txns:
        t["_id"] = str(t["_id"])
        t["user_id"] = str(t["user_id"])
    return txns

def delete_transaction_by_id(txn_id, user_id):
    from bson.objectid import ObjectId
    txn_coll = get_transactions_collection()
    result = txn_coll.delete_one({
        "_id": ObjectId(txn_id),
        "user_id": ObjectId(user_id)
    })
    return result.deleted_count > 0
