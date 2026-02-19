import os
import requests


def extract_intent(transcript: str):
    api_key = os.getenv("SARVAM_API_KEY")

    url = "https://api.sarvam.ai/v1/chat/completions"

    headers = {
        "api-subscription-key": api_key,
        "Content-Type": "application/json"
    }

    prompt = f"""
You are a medical triage assistant.

Extract structured JSON from the following transcript.

Return ONLY valid JSON with:
- problem_type (snake_case)
- urgency (low, medium, high)
- summary (short English summary)

Transcript:
{transcript}
"""

    payload = {
        "model": "sarvam-m",
        "messages": [
            {"role": "system", "content": "You are a structured JSON generator."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0
    }

    response = requests.post(url, headers=headers, json=payload, timeout=60)

    if response.status_code != 200:
        raise Exception(response.text)

    data = response.json()

    # Extract model output text
    content = data["choices"][0]["message"]["content"]

    return content
