import os
import requests
from dotenv import load_dotenv

load_dotenv()

MODELS = [
    "openai/gpt-oss-120b:free",
    "google/gemma-3-27b-it:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "mistralai/mistral-7b-instruct:free"
]

def test_models():
    api_key = os.getenv("OPENROUTER_API_KEY")
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    for model in MODELS:
        print(f"--- Testing Model: {model} ---")
        data = {
            "model": model,
            "messages": [{"role": "user", "content": "Say hello!"}]
        }
        try:
            response = requests.post(url, headers=headers, json=data, timeout=10)
            print(f"Status Code: {response.status_code}")
            if response.status_code == 200:
                print("Success!")
            else:
                print(f"Error: {response.text}")
        except Exception as e:
            print(f"Exception: {e}")
        print("\n")

if __name__ == "__main__":
    test_models()
