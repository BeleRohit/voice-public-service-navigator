from fastapi import FastAPI, UploadFile, File
from dotenv import load_dotenv
from app.sarvam_client import transcribe_audio
from app.intent_engine import extract_intent
import json


load_dotenv()

app = FastAPI()

@app.get("/")
def health_check():
    return {"status": "ok"}


@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    stt_result = transcribe_audio(audio_bytes)

    #transcript = #stt_result.get("transcript")
    transcript = "Mere pitaji ko saans lene mein dikkat ho rahi hai"


    

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


    return {
        "transcript": transcript,
        "intent": intent
    }
