import os
import requests
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('OPENROUTER_API_KEY')

res = requests.get("https://openrouter.ai/api/v1/models")
models = res.json().get('data', [])
free_models = [m['id'] for m in models if 'free' in m['id'].lower() and 'llama' in m['id'].lower()]
model_id = free_models[0] if free_models else "meta-llama/llama-3.1-8b-instruct:free"

url = "https://openrouter.ai/api/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {api_key}",
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "FinanceWise"
}
data = {
    "model": model_id,
    "messages": [{"role": "user", "content": "Hi"}]
}
res = requests.post(url, headers=headers, json=data)
print(f"Model: {model_id}")
print("Status:", res.status_code)
print("Response:", res.text)
