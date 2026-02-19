import { useState, useRef } from "react";

// ── Copy / translations ──────────────────────────────────────────────────────
const COPY = {
  en: {
    nav_home: "Home",
    nav_how: "How it works",
    nav_about: "About",
    hero_eyebrow: "Voice-first public health assistant",
    hero_title: "Healthcare guidance,\nin your language.",
    hero_sub:
      "No forms. No English. No intimidation. Just speak — BhashaCare listens, understands, and responds in your mother tongue.",
    hero_cta: "Try it now →",
    panel_title: "Speak to BhashaCare",
    panel_sub: "Press the microphone and describe your concern in any Indian language.",
    idle: "Ready to listen",
    idle_sub: "Click the mic to begin",
    recording: "Listening…",
    recording_sub: "Speak naturally — take your time",
    processing: "Understanding your concern…",
    processing_sub: "Analysing and preparing a response",
    playing: "BhashaCare is responding",
    playing_sub: "Audio response playing",
    error: "Could not connect to server",
    error_sub: "Please check your connection and try again",
    btn_speak: "Start speaking",
    btn_stop: "Stop recording",
    step1_title: "Speak",
    step1_desc: "Say your concern aloud in Hindi, Tamil, Telugu, Punjabi, Bengali, or Marathi.",
    step2_title: "Understand",
    step2_desc: "Sarvam AI transcribes and interprets your request, detecting urgency automatically.",
    step3_title: "Respond",
    step3_desc: "A calm, actionable voice response plays back in the same language you spoke.",
    how_title: "How it works",
    how_sub: "Three steps from voice to guidance",
    langs_label: "Supported languages",
    footer_tagline: "Made with care for भारत",
    footer_powered: "Powered by Sarvam AI",
  },
  hi: {
    nav_home: "होम",
    nav_how: "यह कैसे काम करता है",
    nav_about: "हमारे बारे में",
    hero_eyebrow: "आवाज़-प्रथम सार्वजनिक स्वास्थ्य सहायक",
    hero_title: "स्वास्थ्य मार्गदर्शन,\nआपकी भाषा में।",
    hero_sub:
      "कोई फ़ॉर्म नहीं। कोई अंग्रेज़ी नहीं। कोई डर नहीं। बस बोलिए — BhashaCare सुनता है, समझता है और आपकी मातृभाषा में जवाब देता है।",
    hero_cta: "अभी आज़माएं →",
    panel_title: "BhashaCare से बात करें",
    panel_sub: "माइक दबाएं और अपनी किसी भी भारतीय भाषा में अपनी समस्या बताएं।",
    idle: "सुनने के लिए तैयार",
    idle_sub: "शुरू करने के लिए माइक दबाएं",
    recording: "सुन रहा हूँ…",
    recording_sub: "आराम से बोलिए — समय लीजिए",
    processing: "आपकी बात समझ रहा हूँ…",
    processing_sub: "विश्लेषण हो रहा है",
    playing: "BhashaCare जवाब दे रहा है",
    playing_sub: "ऑडियो प्रतिक्रिया चल रही है",
    error: "सर्वर से कनेक्शन नहीं हुआ",
    error_sub: "कृपया अपना कनेक्शन जांचें और दोबारा कोशिश करें",
    btn_speak: "बोलना शुरू करें",
    btn_stop: "रिकॉर्डिंग रोकें",
    step1_title: "बोलिए",
    step1_desc: "हिंदी, तमिल, तेलुगु, पंजाबी, बंगाली या मराठी में अपनी बात कहें।",
    step2_title: "समझें",
    step2_desc: "Sarvam AI आपके अनुरोध को समझता है और तुरंत ज़रूरत का अंदाज़ा लगाता है।",
    step3_title: "जवाब पाएं",
    step3_desc: "आपकी भाषा में एक शांत, व्यावहारिक आवाज़ जवाब वापस चलाती है।",
    how_title: "यह कैसे काम करता है",
    how_sub: "आवाज़ से मार्गदर्शन तक — तीन चरण",
    langs_label: "समर्थित भाषाएँ",
    footer_tagline: "भारत के लिए बनाया गया",
    footer_powered: "Sarvam AI द्वारा संचालित",
  },
};

const LANGUAGES = ["हिन्दी", "தமிழ்", "తెలుగు", "ਪੰਜਾਬੀ", "বাংলা", "मराठी"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:       #1C140D;
    --ink-light: #4A3728;
    --saffron:   #D4521A;
    --saffron-h: #B84214;
    --gold:      #C4882A;
    --sand:      #F5ECD8;
    --sand-d:    #EDE0C4;
    --cream:     #FBF7F0;
    --white:     #FFFFFF;
    --muted:     #8A7060;
    --green:     #2A6B45;
    --green-l:   #3D9962;
    --red:       #B83232;
    --border:    rgba(196,136,42,0.18);
    --shadow:    0 4px 24px rgba(28,20,13,0.10);
    --shadow-lg: 0 12px 48px rgba(28,20,13,0.14);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--sand); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

  /* NAV */
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(251,247,240,0.93);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    padding: 0 clamp(1.25rem, 5vw, 4rem);
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
  }

  .nav-logo-icon { width: 28px; height: 28px; }

  .nav-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--ink);
  }

  .nav-brand-name span { color: var(--saffron); }

  .nav-links {
    display: flex;
    align-items: center;
    gap: clamp(1rem, 3vw, 2rem);
    list-style: none;
  }

  .nav-links a {
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ink-light);
    transition: color 0.2s;
  }

  .nav-links a:hover { color: var(--saffron); }

  .lang-toggle {
    display: flex;
    align-items: center;
    background: var(--sand-d);
    border-radius: 999px;
    padding: 3px;
    gap: 2px;
    border: 1px solid var(--border);
  }

  .lang-toggle button {
    border: none;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.28rem 0.8rem;
    border-radius: 999px;
    cursor: pointer;
    color: var(--muted);
    transition: all 0.2s ease;
  }

  .lang-toggle button.active {
    background: var(--white);
    color: var(--saffron);
    box-shadow: 0 1px 6px rgba(28,20,13,0.12);
  }

  /* HERO */
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: clamp(2rem, 5vw, 5rem);
    padding: clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 4rem);
    max-width: 1280px;
    margin: 0 auto;
  }

  .hero-text { max-width: 560px; }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--saffron);
    background: rgba(212,82,26,0.07);
    border: 1px solid rgba(212,82,26,0.18);
    padding: 0.3rem 0.85rem;
    border-radius: 999px;
    margin-bottom: 1.25rem;
    animation: fadeUp 0.6s ease both;
  }

  .hero-eyebrow::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--saffron);
    border-radius: 50%;
    flex-shrink: 0;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  h1.hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4.5vw, 3.6rem);
    font-weight: 700;
    line-height: 1.15;
    color: var(--ink);
    margin-bottom: 1.25rem;
    animation: fadeUp 0.6s 0.1s ease both;
  }

  h1.hero-title em {
    font-style: italic;
    color: var(--saffron);
  }

  .hero-sub {
    font-size: clamp(0.92rem, 1.6vw, 1.02rem);
    color: var(--muted);
    line-height: 1.75;
    margin-bottom: 2rem;
    max-width: 460px;
    animation: fadeUp 0.6s 0.2s ease both;
  }

  .hero-cta {
    display: inline-block;
    background: var(--saffron);
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.92rem;
    padding: 0.82rem 1.9rem;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(212,82,26,0.28);
    animation: fadeUp 0.6s 0.3s ease both;
  }

  .hero-cta:hover {
    background: var(--saffron-h);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(212,82,26,0.36);
  }

  /* VOICE PANEL */
  .voice-panel {
    background: var(--white);
    border-radius: 20px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    padding: clamp(1.75rem, 4vw, 2.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
    animation: fadeUp 0.6s 0.25s ease both;
    position: relative;
    overflow: hidden;
  }

  .voice-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--saffron), var(--gold));
  }

  .panel-header { text-align: center; }

  .panel-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 0.3rem;
  }

  .panel-sub {
    font-size: 0.8rem;
    color: var(--muted);
    line-height: 1.55;
    max-width: 280px;
  }

  /* Orb */
  .orb-wrap {
    position: relative;
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
  }

  .orb-ring {
    position: absolute;
    border-radius: 50%;
    border: 1.5px solid rgba(196,136,42,0.22);
    animation: ripple 2.8s ease-out infinite;
    pointer-events: none;
  }

  .orb-ring:nth-child(1) { width: 100%; height: 100%; animation-delay: 0s; }
  .orb-ring:nth-child(2) { width: 76%; height: 76%; animation-delay: 0.75s; opacity: 0.55; }

  .orb-ring.rec  { border-color: rgba(184,50,50,0.32); animation: ripple-fast 0.9s ease-out infinite; }
  .orb-ring.play { border-color: rgba(42,107,69,0.32); }

  .orb-btn {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: linear-gradient(145deg, var(--saffron) 0%, var(--gold) 100%);
    color: white;
    font-size: 1.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 24px rgba(212,82,26,0.32), 0 2px 6px rgba(212,82,26,0.18);
    transition: all 0.25s ease;
    position: relative;
    z-index: 1;
  }

  .orb-btn:hover { transform: scale(1.06); box-shadow: 0 10px 32px rgba(212,82,26,0.44); }
  .orb-btn:active { transform: scale(0.97); }

  .orb-btn.rec {
    background: linear-gradient(145deg, var(--red) 0%, #d94040 100%);
    box-shadow: 0 6px 24px rgba(184,50,50,0.38);
    animation: pulse-orb 1.6s ease-in-out infinite;
  }

  .orb-btn.play {
    background: linear-gradient(145deg, var(--green) 0%, var(--green-l) 100%);
    box-shadow: 0 6px 24px rgba(42,107,69,0.38);
    animation: pulse-orb 1.2s ease-in-out infinite;
  }

  /* Waveform */
  .waveform {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: 34px;
    opacity: 0;
    transform: scaleY(0.4);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }

  .waveform.on { opacity: 1; transform: scaleY(1); }

  .wbar {
    width: 3px;
    border-radius: 3px;
    background: linear-gradient(to top, var(--saffron), var(--gold));
    animation: wv 0.9s ease-in-out infinite;
  }

  .waveform.play .wbar {
    background: linear-gradient(to top, var(--green), var(--green-l));
    animation-duration: 1.3s;
  }

  .wbar:nth-child(1) { height: 10px; animation-delay: 0.00s; }
  .wbar:nth-child(2) { height: 22px; animation-delay: 0.10s; }
  .wbar:nth-child(3) { height: 32px; animation-delay: 0.20s; }
  .wbar:nth-child(4) { height: 26px; animation-delay: 0.08s; }
  .wbar:nth-child(5) { height: 14px; animation-delay: 0.18s; }
  .wbar:nth-child(6) { height: 28px; animation-delay: 0.28s; }
  .wbar:nth-child(7) { height: 18px; animation-delay: 0.06s; }
  .wbar:nth-child(8) { height: 10px; animation-delay: 0.22s; }

  /* Status */
  .status-block { text-align: center; min-height: 42px; }

  .status-main {
    font-weight: 600;
    font-size: 0.92rem;
    color: var(--ink);
    margin-bottom: 0.18rem;
  }

  .status-sub-text {
    font-size: 0.76rem;
    color: var(--muted);
  }

  /* Action button */
  .action-btn {
    width: 100%;
    max-width: 260px;
    padding: 0.82rem 1.5rem;
    border-radius: 10px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-btn.speak {
    background: var(--saffron);
    color: white;
    box-shadow: 0 4px 14px rgba(212,82,26,0.26);
  }

  .action-btn.speak:hover {
    background: var(--saffron-h);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(212,82,26,0.38);
  }

  .action-btn.stop {
    background: var(--red);
    color: white;
    box-shadow: 0 4px 14px rgba(184,50,50,0.26);
    animation: pulse-btn 2s ease-in-out infinite;
  }

  .action-btn:disabled {
    opacity: 0.48;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
    animation: none !important;
  }

  .error-msg {
    width: 100%;
    max-width: 260px;
    background: rgba(184,50,50,0.07);
    border: 1px solid rgba(184,50,50,0.2);
    border-radius: 8px;
    padding: 0.55rem 0.85rem;
    font-size: 0.76rem;
    color: var(--red);
    text-align: center;
    animation: fadeIn 0.3s ease;
  }

  /* LANGUAGE STRIP */
  .lang-strip {
    background: var(--white);
    padding: 1.5rem clamp(1.25rem, 5vw, 4rem);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .lang-strip-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
  }

  .lang-strip-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    white-space: nowrap;
  }

  .lang-pills { display: flex; gap: 0.45rem; flex-wrap: wrap; }

  .lang-pill {
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.28rem 0.85rem;
    border-radius: 999px;
    background: var(--sand);
    border: 1px solid var(--border);
    color: var(--ink-light);
  }

  /* HOW IT WORKS */
  .how-section {
    background: var(--sand);
    padding: clamp(3rem, 8vh, 5rem) clamp(1.25rem, 5vw, 4rem);
  }

  .section-inner { max-width: 1280px; margin: 0 auto; }

  .section-eyebrow {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--saffron);
    margin-bottom: 0.4rem;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.75rem, 3.5vw, 2.5rem);
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 0.4rem;
  }

  .section-sub {
    font-size: 0.88rem;
    color: var(--muted);
    margin-bottom: 2.5rem;
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(1rem, 2.5vw, 1.75rem);
  }

  .step-card {
    background: var(--white);
    border-radius: 14px;
    border: 1px solid var(--border);
    padding: clamp(1.25rem, 3vw, 1.75rem);
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .step-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }

  .step-num {
    font-family: 'Playfair Display', serif;
    font-size: 3.2rem;
    font-weight: 700;
    color: rgba(196,136,42,0.1);
    line-height: 1;
    position: absolute;
    top: 0.6rem;
    right: 0.9rem;
  }

  .step-icon { font-size: 1.7rem; margin-bottom: 0.85rem; }

  .step-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 0.45rem;
  }

  .step-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.6; }

  /* FOOTER */
  footer {
    background: var(--ink);
    color: rgba(245,236,216,0.55);
    padding: 1.75rem clamp(1.25rem, 5vw, 4rem);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .footer-brand {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--sand);
  }

  .footer-brand span { color: var(--saffron); }
  .footer-right { font-size: 0.76rem; text-align: right; }
  .footer-powered { color: var(--gold); font-weight: 500; margin-top: 0.2rem; }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes ripple {
    0%   { transform: scale(0.75); opacity: 0.65; }
    100% { transform: scale(1.28); opacity: 0; }
  }

  @keyframes ripple-fast {
    0%   { transform: scale(0.8); opacity: 0.85; }
    100% { transform: scale(1.38); opacity: 0; }
  }

  @keyframes pulse-orb {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.05); }
  }

  @keyframes pulse-btn {
    0%, 100% { box-shadow: 0 4px 14px rgba(184,50,50,0.26); }
    50%       { box-shadow: 0 4px 22px rgba(184,50,50,0.5); }
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.35; }
  }

  @keyframes wv {
    0%, 100% { transform: scaleY(0.4); }
    50%       { transform: scaleY(1.15); }
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .hero {
      grid-template-columns: 1fr;
      text-align: center;
    }
    .hero-text { max-width: 100%; }
    .hero-sub  { max-width: 100%; margin: 0 auto 2rem; }
    .hero-eyebrow { margin: 0 auto 1.25rem; }
    .voice-panel { max-width: 460px; margin: 0 auto; width: 100%; }
    .steps-grid { grid-template-columns: 1fr; }
    .step-card  { max-width: 460px; margin: 0 auto; width: 100%; }
  }

  @media (max-width: 600px) {
    .nav-links { display: none; }
    h1.hero-title { font-size: 2rem; }
    .orb-wrap { width: 128px; height: 128px; }
    .orb-btn  { width: 70px; height: 70px; font-size: 1.6rem; }
    footer { flex-direction: column; text-align: center; }
    .footer-right { text-align: center; }
  }

  @media (min-width: 1440px) {
    .hero         { max-width: 1400px; }
    .section-inner { max-width: 1400px; }
  }
`;

export default function App() {
  const [lang, setLang] = useState("en");
  const [phase, setPhase] = useState("idle");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const chunksRef = useRef([]);
  const t = COPY[lang];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" });
        stream.getTracks().forEach((t) => t.stop());
        await sendAudio(blob);
      };
      recorder.start();
      setMediaRecorder(recorder);
      setPhase("recording");
    } catch {
      setPhase("error");
      setTimeout(() => setPhase("idle"), 3500);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) { mediaRecorder.stop(); setPhase("processing"); }
  };

  const sendAudio = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("file", blob, "audio.wav");
      const res = await fetch("https://voice-public-service-navigator.onrender.com/transcribe", { method: "POST", body: formData });
      const data = await res.json();
      playAudio(data.audio_base64);
    } catch {
      setPhase("error");
      setTimeout(() => setPhase("idle"), 3500);
    }
  };

  const playAudio = (base64) => {
    setPhase("playing");
    const audio = new Audio("data:audio/wav;base64," + base64);
    audio.onended = () => setPhase("idle");
    audio.onerror = () => { setPhase("error"); setTimeout(() => setPhase("idle"), 3500); };
    audio.play();
  };

  const handleOrb = () => {
    if (phase === "idle" || phase === "error") startRecording();
    else if (phase === "recording") stopRecording();
  };

  const orbClass  = phase === "recording" ? "rec" : phase === "playing" ? "play" : "";
  const isDisabled = phase === "processing" || phase === "playing";
  const orbIcon   = phase === "recording" ? "⏹" : phase === "processing" ? "⏳" : phase === "playing" ? "🔊" : "🎤";

  const statusText = { idle: t.idle, recording: t.recording, processing: t.processing, playing: t.playing, error: t.error }[phase];
  const statusSub  = { idle: t.idle_sub, recording: t.recording_sub, processing: t.processing_sub, playing: t.playing_sub, error: t.error_sub }[phase];

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav>
        <a href="#" className="nav-brand">
          <svg className="nav-logo-icon" viewBox="0 0 28 28" fill="none">
            <path d="M14 24S5 17.5 5 11c0-3.1 3-4.7 6-3.2C12.4 8.6 13.3 10 14 11c.7-1 1.6-2.4 3-3.2C20 6.3 23 7.9 23 11c0 6.5-9 13-9 13z" fill="url(#nl1)" opacity="0.9"/>
            <path d="M14 24s-3.5-6.5-3.5-13c0-2.3 1.8-3.1 3.2-2C14 9.4 14 10.2 14 11c0-.8 0-1.6.3-2C15.7 7.9 17.5 8.7 17.5 11c0 6.5-3.5 13-3.5 13z" fill="url(#nl2)" opacity="0.6"/>
            <defs>
              <linearGradient id="nl1" x1="5" y1="6" x2="23" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F0C060"/><stop offset="1" stopColor="#D4521A"/>
              </linearGradient>
              <linearGradient id="nl2" x1="10" y1="7" x2="18" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FBF7F0" stopOpacity="0.8"/><stop offset="1" stopColor="#F0C060" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="nav-brand-name">Bhasha<span>Care</span></span>
        </a>

        <ul className="nav-links">
          <li><a href="#">{t.nav_home}</a></li>
          <li><a href="#how">{t.nav_how}</a></li>
          <li><a href="#about">{t.nav_about}</a></li>
        </ul>

        <div className="lang-toggle" role="group" aria-label="Language selector">
          <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
          <button className={lang === "hi" ? "active" : ""} onClick={() => setLang("hi")}>हि</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <div className="hero-eyebrow">{t.hero_eyebrow}</div>
          <h1 className="hero-title">
            {t.hero_title.split("\n").map((line, i) =>
              i === 0
                ? <span key={i}>{line}<br /></span>
                : <em key={i}>{line}</em>
            )}
          </h1>
          <p className="hero-sub">{t.hero_sub}</p>
          <a href="#panel" className="hero-cta">{t.hero_cta}</a>
        </div>

        {/* Voice panel */}
        <div className="voice-panel" id="panel">
          <div className="panel-header">
            <div className="panel-title">{t.panel_title}</div>
            <div className="panel-sub">{t.panel_sub}</div>
          </div>

          <div
            className="orb-wrap"
            onClick={handleOrb}
            role="button"
            tabIndex={0}
            aria-label={phase === "recording" ? t.btn_stop : t.btn_speak}
            onKeyDown={(e) => e.key === "Enter" && handleOrb()}
          >
            <div className={`orb-ring ${orbClass}`} />
            <div className={`orb-ring ${orbClass}`} />
            <button className={`orb-btn ${orbClass}`} aria-hidden tabIndex={-1}>
              {orbIcon}
            </button>
          </div>

          <div className={`waveform ${phase === "recording" || phase === "playing" ? "on" : ""} ${phase === "playing" ? "play" : ""}`}>
            {[...Array(8)].map((_, i) => <div key={i} className="wbar" />)}
          </div>

          <div className="status-block">
            <div className="status-main">{statusText}</div>
            <div className="status-sub-text">{statusSub}</div>
          </div>

          {phase === "recording" ? (
            <button className="action-btn stop" onClick={stopRecording}>{t.btn_stop}</button>
          ) : (
            <button className="action-btn speak" onClick={startRecording} disabled={isDisabled}>
              {t.btn_speak}
            </button>
          )}

          {phase === "error" && <div className="error-msg">⚠️ {t.error}</div>}
        </div>
      </section>

      {/* LANGUAGE STRIP */}
      <div className="lang-strip">
        <div className="lang-strip-inner">
          <span className="lang-strip-label">{t.langs_label}</span>
          <div className="lang-pills">
            {LANGUAGES.map((l) => <span key={l} className="lang-pill">{l}</span>)}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="section-inner">
          <div className="section-eyebrow">Process</div>
          <div className="section-title">{t.how_title}</div>
          <div className="section-sub">{t.how_sub}</div>
          <div className="steps-grid">
            {[
              { icon: "🎤", num: "01", title: t.step1_title, desc: t.step1_desc },
              { icon: "🧠", num: "02", title: t.step2_title, desc: t.step2_desc },
              { icon: "🔊", num: "03", title: t.step3_title, desc: t.step3_desc },
            ].map((s) => (
              <div className="step-card" key={s.num}>
                <span className="step-num">{s.num}</span>
                <div className="step-icon">{s.icon}</div>
                <div className="step-title">{s.title}</div>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">Bhasha<span>Care</span></div>
        <div className="footer-right">
          <div>{t.footer_tagline}</div>
          <div className="footer-powered">{t.footer_powered}</div>
        </div>
      </footer>
    </>
  );
}