from flask import Blueprint, request, jsonify
try:
    from flask_jwt_extended import jwt_required, get_jwt_identity
except ImportError:
    def jwt_required(*args, **kwargs):
        def decorator(fn): return fn
        return decorator
    def get_jwt_identity(): return "dummy_user_id"

from app.models.notification import get_user_notifications, mark_notification_as_read, create_notification

notifications_bp = Blueprint('notifications_bp', __name__)

@notifications_bp.route('/notifications', methods=['GET'])
@jwt_required()
def get_notifications():
    user_id = get_jwt_identity()
    notifs = get_user_notifications(user_id)
    if not notifs:
        notifs = [
            {
                "id": "welcome-1",
                "title": "Welcome to FinanceWise!",
                "message": "Start tracking your financial health, logging expenses, and asking Arth AI.",
                "type": "info",
                "read": False,
                "created_at": "Just now"
            }
        ]
    return jsonify(notifs), 200

@notifications_bp.route('/notifications/<notif_id>/read', methods=['PUT', 'POST'])
@jwt_required()
def read_notification(notif_id):
    user_id = get_jwt_identity()
    if notif_id == "welcome-1":
        return jsonify({"message": "Marked as read"}), 200
    success = mark_notification_as_read(notif_id, user_id)
    return jsonify({"message": "Notification marked as read", "success": success}), 200
