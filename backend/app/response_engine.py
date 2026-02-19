import os
import requests


def generate_response(intent, language):
    api_key = os.getenv("SARVAM_API_KEY")

    url = "https://api.sarvam.ai/v1/chat/completions"

    headers = {
        "api-subscription-key": api_key,
        "Content-Type": "application/json"
    }

    prompt = f"""
You are a calm healthcare assistant.

User problem:
{intent}

Respond in language: {language}

Rules:
- Be short (2–3 sentences)
- Be reassuring
- Give next action
- If urgency is high, advise visiting nearest government hospital or calling 108
"""

    payload = {
        "model": "sarvam-m",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3
    }

    response = requests.post(url, headers=headers, json=payload, timeout=60)

    if response.status_code != 200:
        raise Exception(response.text)

    data = response.json()

    return data["choices"][0]["message"]["content"]
