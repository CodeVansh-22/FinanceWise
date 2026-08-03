from flask import Blueprint, request, jsonify
try:
    from flask_jwt_extended import jwt_required, get_jwt_identity
except ImportError:
    def jwt_required(*args, **kwargs):
        def decorator(fn): return fn
        return decorator
    def get_jwt_identity(): return "dummy_user_id"

from app.models.user import find_user_by_id
from app.models.chat_history import add_message, get_chat_history, clear_chat_history
from app.ai.gemini_engine import generate_ai_response, estimate_tokens

ai_bp = Blueprint('ai_bp', __name__)

@ai_bp.route('/chatbot', methods=['POST'])
@ai_bp.route('/chatbot/message', methods=['POST'])
@ai_bp.route('/ai/chat', methods=['POST'])
@jwt_required(optional=True)
def chat():
    try:
        user_id = get_jwt_identity() or "guest_user"
        data = request.get_json() or {}
        user_msg = data.get("message") or data.get("prompt") or data.get("text")
        persona = data.get("persona", "advisor")

        if not user_msg:
            return jsonify({"error": "Message content is required"}), 400

        user = None
        if user_id != "guest_user":
            user = find_user_by_id(user_id)
        if not user:
            user = {"name": "Executive", "email": "user@financewise.app"}

        try:
            add_message(user_id, "user", user_msg, mode=persona)
            history = get_chat_history(user_id, limit=20)
        except Exception:
            history = [{"role": "user", "content": user_msg}]

        messages_context = []
        for msg in history:
            messages_context.append({"role": msg.get("role"), "content": msg.get("content")})

        reply = generate_ai_response(messages_context, persona=persona, user=user)

        try:
            add_message(user_id, "assistant", reply, mode=persona)
        except Exception:
            pass

        input_tokens = estimate_tokens(user_msg)
        output_tokens = estimate_tokens(reply)

        return jsonify({
            "reply": reply,
            "response": reply,
            "persona": persona,
            "tokens_used": input_tokens + output_tokens
        }), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            "reply": "I'm experiencing a momentary connection issue. Please try your question again.",
            "error": str(e)
        }), 200

@ai_bp.route('/ai/history', methods=['GET', 'DELETE'])
@jwt_required(optional=True)
def handle_history():
    user_id = get_jwt_identity() or "guest_user"
    
    if request.method == 'GET':
        try:
            history = get_chat_history(user_id, limit=50)
        except Exception:
            history = []
        return jsonify(history), 200

    elif request.method == 'DELETE':
        try:
            clear_chat_history(user_id)
        except Exception:
            pass
        return jsonify({"message": "Chat history cleared successfully"}), 200

@ai_bp.route('/ai/advice', methods=['POST'])
@jwt_required(optional=True)
def get_specialized_advice():
    user_id = get_jwt_identity() or "guest_user"
    user = find_user_by_id(user_id) if user_id != "guest_user" else {"name": "Executive"}
    data = request.get_json() or {}
    topic = data.get("topic", "General Advice")
    persona = data.get("persona", "advisor")
    
    prompt = f"Please provide actionable, top recommendations for {topic} tailored to my income and financial situation."
    messages = [{"role": "user", "content": prompt}]
    
    advice = generate_ai_response(messages, persona=persona, user=user)
    return jsonify({"topic": topic, "advice": advice}), 200

@ai_bp.route('/ai/analytics', methods=['GET'])
@jwt_required(optional=True)
def ai_analytics():
    user_id = get_jwt_identity() or "guest_user"
    try:
        history = get_chat_history(user_id, limit=100)
    except Exception:
        history = []
    
    total_messages = len(history)
    estimated_tokens = sum(estimate_tokens(m.get("content", "")) for m in history)
    
    return jsonify({
        "total_messages": total_messages,
        "estimated_tokens": estimated_tokens,
        "active_persona": "Arth AI 2.5",
        "status": "Active & Operational"
    }), 200
