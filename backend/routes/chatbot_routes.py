import os
import requests
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import find_user_by_id
from models.chat_history import add_message, get_chat_history
from services.ai_service import get_ai_response, get_current_mode

chatbot_bp = Blueprint('chatbot_bp', __name__)

@chatbot_bp.route('/chatbot/message', methods=['POST'])
@jwt_required()
def chat():
    try:
        user_id = get_jwt_identity()
        data = request.json
        user_msg = data.get("message")
        
        if not user_msg:
            return jsonify({"error": "Message is required"}), 400
            
        user = find_user_by_id(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        add_message(user_id, "user", user_msg)
        history = get_chat_history(user_id)
        
        mode = get_current_mode()
        system_prompt = f"""You are Arth, a friendly Indian personal finance advisor. 
        Response Rules:
        1. Language: Strictly use ENGLISH for all responses. 
        2. Tone: Professional yet friendly, practical, and non-judgmental.
        3. Safety: Never recommend specific stocks or high-risk investments. Stick to safe, beginner-friendly advice.
        4. Formatting: Use bullet points and bold text for readability.
        5. Brevity: STICK TO APPROXIMATELY 10 LINES. Keep responses concise and to the point.
        6. User Context: Name is {user.get('name')}, Monthly Income is {user.get('monthly_income')}, Financial Goal is {user.get('financial_goal')}.
        7. Current Mode: {mode}.
    
    Example Output:
    "Hello {user.get('name')}, with a monthly income of ₹{user.get('monthly_income')}, you have a strong foundation! My recommendations:
    - First, build an **Emergency Fund**.
    - Then, start an **SIP** in a diversified index fund.
    Don't worry, we'll take it step by step! 👍"
    """
        
        messages = [{"role": "system", "content": system_prompt}]
        
        # Send limited context to fit cache/limits
        for msg in history[-8:]:
            messages.append({"role": msg["role"], "content": msg["content"]})
            
        reply = get_ai_response(messages)
        
        add_message(user_id, "assistant", reply)
        return jsonify({"reply": reply}), 200
    except Exception as e:
        print(f"DEBUG Chatbot Route Error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"reply": "I'm having some trouble connecting to the AI. Please try again in a moment."}), 200
