from bson import ObjectId
from datetime import datetime
from app.database.connection import get_db
from app.utils.json_encoder import serialize_doc

def create_goal(goal_data):
    db = get_db()
    if isinstance(goal_data.get("user_id"), str):
        goal_data["user_id"] = ObjectId(goal_data["user_id"])
    goal_data["created_at"] = datetime.utcnow()
    goal_data.setdefault("current_amount", 0.0)
    result = db.goals.insert_one(goal_data)
    return str(result.inserted_id)

def get_goals_by_user(user_id):
    db = get_db()
    goals = list(db.goals.find({"user_id": ObjectId(user_id)}).sort("created_at", -1))
    return serialize_doc(goals)

def update_goal_amount(goal_id, user_id, amount_to_add):
    db = get_db()
    try:
        res = db.goals.update_one(
            {"_id": ObjectId(goal_id), "user_id": ObjectId(user_id)},
            {"$inc": {"current_amount": float(amount_to_add)}}
        )
        return res.modified_count > 0
    except Exception:
        return False
