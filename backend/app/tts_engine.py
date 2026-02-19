import os
import requests


def speak(text: str, language="hi-IN"):
    api_key = os.getenv("SARVAM_API_KEY")

    url = "https://api.sarvam.ai/text-to-speech"

    headers = {
        "api-subscription-key": api_key,
        "Content-Type": "application/json"
    }

    payload = {
        "text": text,
        "target_language_code": language,
        "model": "bulbul:v3",
        "speaker": "shubh",   # default v3 voice
        "pace": 1.0
    }

    response = requests.post(url, headers=headers, json=payload, timeout=60)

    if response.status_code != 200:
        raise Exception(response.text)

    data = response.json()

    # Sarvam returns list of base64 wav strings
    return data["audios"][0]
