from fastapi import FastAPI, UploadFile, File
from dotenv import load_dotenv
from app.sarvam_client import transcribe_audio
from app.intent_engine import extract_intent
import json
from app.tts_engine import speak
from app.response_engine import generate_response

from fastapi.middleware.cors import CORSMiddleware





load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "ok"}


@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    stt_result = transcribe_audio(audio_bytes)

    transcript = stt_result.get("transcript")
    language = stt_result.get("language_code", "hi-IN")

    raw_intent = extract_intent(transcript)

    try:
        intent = json.loads(raw_intent)
    except:
        intent = {
            "problem_type": "unknown",
            "urgency": "medium",
            "summary": raw_intent
        }

    danger_keywords = [
        "breathing",
        "chest",
        "unconscious",
        "bleeding",
        "severe pain"
    ]

    if any(word in transcript.lower() for word in danger_keywords):
        intent["urgency"] = "high"
        intent["override"] = "Emergency keywords detected"

    response_text = generate_response(intent, language)
    audio = speak(response_text, language)



    return {
    "transcript": transcript,
    "intent": intent,
    "response_text": response_text,
    "audio_base64": audio
}

