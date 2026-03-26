from models.db import get_db
import datetime
from bson.objectid import ObjectId

def get_goals_collection():
    return get_db()["goals"]

def create_goal(goal_data):
    """
    goal_data: user_id, title, target_amount, current_amount, deadline
    """
    goals = get_goals_collection()
    goal_data["created_at"] = datetime.datetime.utcnow()
    goal_data.setdefault("current_amount", 0)
    result = goals.insert_one(goal_data)
    return str(result.inserted_id)

def get_goals_by_user(user_id):
    goals_coll = get_goals_collection()
    goals = list(goals_coll.find({"user_id": ObjectId(user_id)}))
    for g in goals:
        g["_id"] = str(g["_id"])
        g["user_id"] = str(g["user_id"])
    return goals

def update_goal_amount(goal_id, amount_to_add):
    goals = get_goals_collection()
    goals.update_one(
        {"_id": ObjectId(goal_id)},
        {"$inc": {"current_amount": amount_to_add}}
    )
