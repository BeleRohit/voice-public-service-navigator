import os
import requests


def transcribe_audio(file_bytes):
    api_key = os.getenv("SARVAM_API_KEY")

    url = "https://api.sarvam.ai/speech-to-text"

    headers = {
        "api-subscription-key": api_key
    }

    files = {
        "file": ("audio.wav", file_bytes, "audio/wav")
    }

    data = {
        "model": "saarika:v2.5"
        # language_code is optional for this model
    }

    response = requests.post(
        url,
        headers=headers,
        files=files,
        data=data,
        timeout=60
    )

    if response.status_code != 200:
        raise Exception(f"Sarvam error: {response.text}")

    return response.json()
