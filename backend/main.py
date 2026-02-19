from fastapi import FastAPI, UploadFile, File
from dotenv import load_dotenv
from app.sarvam_client import transcribe_audio

load_dotenv()

app = FastAPI()

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    result = transcribe_audio(audio_bytes)
    return result
