from models.db import get_db
import datetime
from bson.objectid import ObjectId

def get_chat_collection():
    return get_db()["chat_history"]

def add_message(user_id, role, content):
    """
    role: 'user' or 'assistant'
    """
    chat_coll = get_chat_collection()
    message = {
        "role": role,
        "content": content,
        "timestamp": datetime.datetime.utcnow()
    }
    
    record = chat_coll.find_one({"user_id": ObjectId(user_id)})
    if record:
        chat_coll.update_one(
            {"_id": record["_id"]},
            {"$push": {"messages": message}}
        )
    else:
        chat_coll.insert_one({
            "user_id": ObjectId(user_id),
            "created_at": datetime.datetime.utcnow(),
            "messages": [message]
        })

def get_chat_history(user_id):
    chat_coll = get_chat_collection()
    record = chat_coll.find_one({"user_id": ObjectId(user_id)})
    if record:
        # Strip objectid or keep them serializable
        return record["messages"]
    return []
