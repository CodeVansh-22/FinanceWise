from app.ai.gemini_engine import generate_ai_response as get_ai_response

def get_current_mode():
    from datetime import datetime
    now = datetime.now()
    hour = now.hour
    if 21 <= hour or hour < 3:
        return "Night Mode"
    elif 4 <= hour < 5:
        return "Sync Window"
    else:
        return "Active Mode"

__all__ = ["get_ai_response", "get_current_mode"]
