import os
import google.generativeai as genai
from datetime import datetime

def get_current_mode():
    now = datetime.now()
    hour = now.hour
    if 21 <= hour or hour < 3:
        return "Night Mode"
    elif 4 <= hour < 5:
        return "Sync Window"
    else:
        return "Active Mode"

def get_ai_response(messages):
    """
    messages: List of {"role": "...", "content": "..."}
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "AI is busy (API key missing), please try again later."
        
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Convert Chat history format to Gemini format
        # System prompt is the first message in our current implementation
        system_instruction = ""
        gemini_history = []
        
        for msg in messages:
            if msg["role"] == "system":
                system_instruction = msg["content"]
            else:
                role = "user" if msg["role"] == "user" else "model"
                gemini_history.append({"role": role, "parts": [msg["content"]]})
        
        # Pull the last message as the prompt
        if not gemini_history:
             return "I'm not sure how to respond to that."
             
        user_msg = gemini_history.pop()["parts"][0]
        
        # Create a new model with system instruction if provided
        chat_model = model
        if system_instruction:
            chat_model = genai.GenerativeModel(
                model_name='gemini-2.5-flash',
                system_instruction=system_instruction
            )
            
        chat = chat_model.start_chat(history=gemini_history)
        response = chat.send_message(user_msg)
        
        if response and response.text:
            return response.text
        else:
            return "AI returned an empty response, try again."
            
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return "AI is a bit busy right now, please try again in a moment."
