# BhashaCare 🎤  
### A Voice-First Multilingual Web App powered by Sarvam AI

BhashaCare is an experimental voice-first web application that allows users to interact entirely through speech in native Indian languages.

This project explores a full end-to-end voice pipeline:

Speech → Text → Intent → LLM → Text → Speech

The goal was learning-first: understanding browser audio capture, AI speech APIs, async backends, and real deployment flows.

---

## 🚀 Live Demo

👉 https://voice-public-service-navigator.vercel.app/#

---

## ✨ Features

- 🎤 Speak in your native Indian language  
- 🧠 Automatic Speech Recognition (STT)  
- 🤖 LLM-based response generation  
- 🔊 AI-generated voice reply (TTS)  
- 💬 Minimal UI with real-time audio flow  
- 🌐 Fully deployed frontend + backend  

No forms.  
Just voice in → voice out.

---

## 🧠 Architecture Overview

User Speech
↓
Browser (MediaRecorder + Web Audio APIs)
↓
FastAPI Backend
↓
Sarvam AI STT
↓
LLM Processing
↓
Sarvam AI TTS
↓
Audio Response to User


### Flow Breakdown

1. User speaks in browser  
2. Audio blob captured via MediaRecorder  
3. Blob sent to FastAPI backend  
4. Sarvam AI converts speech → text  
5. LLM generates response  
6. Sarvam AI converts text → speech  
7. Audio streamed back to frontend and played  

---

## 🛠 Tech Stack

### Frontend
- React  
- Web Audio API  
- MediaRecorder API  
- Deployed on Vercel  

### Backend
- FastAPI  
- Async pipelines  
- Deployed on Render  

### AI Layer
- Sarvam AI  
  - Speech-to-Text (STT)  
  - Chat / LLM  
  - Text-to-Speech (TTS)  

---

## 🧪 What This Project Explores

- Browser voice capture  
- Audio blob handling  
- STT → LLM → TTS chaining  
- Async FastAPI orchestration  
- Cross-platform deployment (Vercel + Render)  
- Real-time voice UX  

---

## 🏗 Local Setup

### Prerequisites

- Node.js  
- Python 3.9+  
- Sarvam AI API key  

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Create a .env file:
```bash
SARVAM_API_KEY=your_api_key_here
```


### 📌 Why This Exists

This is not a polished production product.

It’s a learning experiment.

The purpose was to turn documentation into something tangible and understand how real voice systems behave in practice.

Shipping small experiments beats endless planning.

### 🌱 Future Ideas

Conversation memory

Language auto-detection

Better intent routing

Streaming audio responses

Domain-specific assistants

### 📄 License
```bash
MIT
```
