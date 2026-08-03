from bson import ObjectId
from datetime import datetime
from app.database.connection import get_db
from app.utils.json_encoder import serialize_doc

def create_invoice(invoice_data):
    db = get_db()
    if isinstance(invoice_data.get("user_id"), str):
        invoice_data["user_id"] = ObjectId(invoice_data["user_id"])
    invoice_data["created_at"] = datetime.utcnow()
    invoice_data.setdefault("status", "pending")
    invoice_data.setdefault("invoice_number", f"INV-{int(datetime.utcnow().timestamp())}")
    invoice_data.setdefault("date", datetime.utcnow().strftime("%Y-%m-%d"))
    result = db.invoices.insert_one(invoice_data)
    return str(result.inserted_id)

def get_invoices_by_user(user_id):
    db = get_db()
    invoices = list(db.invoices.find({"user_id": ObjectId(user_id)}).sort("created_at", -1))
    return serialize_doc(invoices)

def update_invoice_status(invoice_id, user_id, status):
    db = get_db()
    try:
        res = db.invoices.update_one(
            {"_id": ObjectId(invoice_id), "user_id": ObjectId(user_id)},
            {"$set": {"status": status, "updated_at": datetime.utcnow()}}
        )
        return res.modified_count > 0
    except Exception:
        return False

def delete_invoice(invoice_id, user_id):
    db = get_db()
    try:
        res = db.invoices.delete_one({"_id": ObjectId(invoice_id), "user_id": ObjectId(user_id)})
        return res.deleted_count > 0
    except Exception:
        return False
