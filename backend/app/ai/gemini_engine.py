import os
import logging
import warnings

with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    try:
        import google.generativeai as genai
    except ImportError:
        genai = None

from app.ai.advisors import get_system_prompt

logger = logging.getLogger(__name__)

def estimate_tokens(text):
    if not text:
        return 0
    return len(text.split()) * 4

AVAILABLE_MODELS = [
    'models/gemini-2.5-flash',
    'models/gemini-2.0-flash',
    'models/gemini-flash-latest',
    'gemini-2.5-flash',
    'gemini-2.0-flash'
]

def generate_ai_response(messages, persona="advisor", user=None):
    """
    messages: list of dicts [{"role": "user"|"assistant"|"system", "content": "..."}]
    persona: advisor | budget | expense | investment | loan | tax
    user: user dict for context
    """
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("OPENROUTER_API_KEY")
    system_prompt = get_system_prompt(persona, user)
    
    if not api_key or not genai:
        logger.warning("GEMINI_API_KEY missing or genai package unconfigured. Delivering intelligent offline fallback response.")
        return generate_fallback_response(messages, persona, user)

    try:
        genai.configure(api_key=api_key)
        
        gemini_history = []
        for msg in messages:
            if msg.get("role") in ["user", "assistant", "model"]:
                role = "user" if msg.get("role") == "user" else "model"
                gemini_history.append({"role": role, "parts": [msg.get("content", "")]})

        if not gemini_history:
            return "How can I assist you with your finances today?"

        last_user_msg = gemini_history.pop()["parts"][0]

        response_text = None
        for model_name in AVAILABLE_MODELS:
            try:
                model = genai.GenerativeModel(
                    model_name=model_name,
                    system_instruction=system_prompt
                )
                chat = model.start_chat(history=gemini_history[-10:])
                response = chat.send_message(last_user_msg)
                if response and response.text:
                    response_text = response.text
                    break
            except Exception as model_err:
                logger.warning(f"Model {model_name} failed: {model_err}, trying next model...")
                continue

        if response_text:
            return response_text
        else:
            return generate_fallback_response(messages, persona, user)

    except Exception as e:
        logger.error(f"Gemini API Exception: {e}")
        return generate_fallback_response(messages, persona, user)

def generate_fallback_response(messages, persona, user):
    last_msg = messages[-1]["content"] if messages else ""
    name = user.get("name", "there") if user else "there"
    
    if "sip" in last_msg.lower() or "invest" in last_msg.lower():
        return f"Hello {name}! For investing, a disciplined **SIP (Systematic Investment Plan)** in low-cost Nifty 50 index funds is a great starting point. Aim to invest at least 20% of your monthly income consistently!"
    elif "tax" in last_msg.lower() or "80c" in last_msg.lower():
        return f"Hello {name}! To optimize taxes under Section 80C (up to ₹1.5 Lakhs), explore **ELSS Mutual Funds** (3-year lock-in with equity growth), **PPF**, or **EPF**."
    elif "budget" in last_msg.lower() or "expense" in last_msg.lower():
        return f"Hello {name}! Follow the **50-30-20 Rule**: 50% for Essential Needs, 30% for Wants, and 20% for Savings & Investments. Building a 6-month emergency fund should be your top priority."
    elif "loan" in last_msg.lower() or "emi" in last_msg.lower():
        return f"Hello {name}! For managing debt, keep your total EMIs below 40% of net income. Pay off high-interest debt (credit cards, personal loans) first using the **Avalanche Method**."
    else:
        return f"Hello {name}! I am **Arth**, your FinanceWise AI Assistant. I can help you with Budgeting, Tax Savings (80C/GST), SIP & Mutual Fund calculations, and EMI optimization. What financial area would you like to explore?"
