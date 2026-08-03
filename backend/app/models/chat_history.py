from bson import ObjectId
from datetime import datetime
from app.database.connection import get_db
from app.utils.json_encoder import serialize_doc

def add_message(user_id, role, content, mode="General"):
    db = get_db()
    msg = {
        "user_id": ObjectId(user_id),
        "role": role,
        "content": content,
        "mode": mode,
        "timestamp": datetime.utcnow()
    }
    db.chat_history.insert_one(msg)

def get_chat_history(user_id, limit=30):
    db = get_db()
    history = list(db.chat_history.find({"user_id": ObjectId(user_id)}).sort("timestamp", 1).limit(limit))
    return serialize_doc(history)

def clear_chat_history(user_id):
    db = get_db()
    db.chat_history.delete_many({"user_id": ObjectId(user_id)})
