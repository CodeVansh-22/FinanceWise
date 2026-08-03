from bson import ObjectId
from datetime import datetime
from app.database.connection import get_db
from app.utils.json_encoder import serialize_doc

def create_notification(user_id, title, message, n_type="info"):
    db = get_db()
    notif = {
        "user_id": ObjectId(user_id),
        "title": title,
        "message": message,
        "type": n_type,
        "read": False,
        "created_at": datetime.utcnow()
    }
    res = db.notifications.insert_one(notif)
    return str(res.inserted_id)

def get_user_notifications(user_id, limit=20):
    db = get_db()
    notifs = list(db.notifications.find({"user_id": ObjectId(user_id)}).sort("created_at", -1).limit(limit))
    return serialize_doc(notifs)

def mark_notification_as_read(notif_id, user_id):
    db = get_db()
    try:
        res = db.notifications.update_one(
            {"_id": ObjectId(notif_id), "user_id": ObjectId(user_id)},
            {"$set": {"read": True}}
        )
        return res.modified_count > 0
    except Exception:
        return False
