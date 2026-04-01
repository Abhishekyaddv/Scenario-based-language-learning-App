// Shared styles + data for the Landing Page components

export const landingStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* WARM THEME VARIABLES */
    --bg: #fffcf2;
    --surface: #fffcf2;
    --surface2: #f5f0e8;
    --border: #ccc5b9;
    --primary: #eb5e28;
    --primary-light: #f4a261;
    --primary-dark: #d4521e;
    --text: #252422;
    --muted: #403d39;
    --dim: #ccc5b9;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-active, 'DM Sans', sans-serif); overflow-x: hidden; }

  .font-display { font-family: 'Fraunces', serif; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(2deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
  .animate-slide-up { animation: slide-up 0.8s ease forwards; }

  .gradient-text {
    background: linear-gradient(135deg, #eb5e28 0%, #f4a261 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .shimmer-text {
    background: linear-gradient(90deg, #eb5e28, #f4a261, #f7c59f, #eb5e28);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  /* Warm Glassmorphism */
  .glass {
    background: rgba(255, 252, 242, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(204, 197, 185, 0.4);
    box-shadow: 0 8px 32px rgba(37, 36, 34, 0.04);
  }

  .glass-hover {
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .glass-hover:hover {
    background: rgba(255, 252, 242, 0.95);
    border-color: rgba(235, 94, 40, 0.2);
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(235, 94, 40, 0.08);
  }

  /* Primary orange CTA button */
  .btn-primary {
    background: #eb5e28;
    color: white;
    border: none;
    padding: 14px 32px;
    border-radius: 14px;
    font-family: var(--font-active, 'DM Sans', sans-serif);
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(235, 94, 40, 0.25);
  }
  .btn-primary:hover { 
    background: #d4521e;
    transform: translateY(-2px); 
    box-shadow: 0 8px 20px rgba(235, 94, 40, 0.35); 
  }

  .btn-ghost {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
    padding: 14px 32px;
    border-radius: 14px;
    font-family: var(--font-active, 'DM Sans', sans-serif);
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(37, 36, 34, 0.02);
  }
  .btn-ghost:hover {
    border-color: #a39e93;
    background: #f5f0e8;
    transform: translateY(-2px);
  }

  .mesh-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 20%, rgba(235, 94, 40, 0.06) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 80% 80%, rgba(244, 162, 97, 0.05) 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 50% 0%, rgba(247, 197, 159, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(37, 36, 34, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37, 36, 34, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }

  .nav-link {
    color: var(--muted);
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    transition: color 0.2s;
    cursor: pointer;
  }
  .nav-link:hover { color: var(--text); }

  .marquee-track {
    display: flex;
    animation: marquee 25s linear infinite;
    width: max-content;
  }
`;

export const languages = [
  "日本語", "Français", "Español", "Deutsch", "中文",
  "Português", "한국어", "Italiano", "العربية", "हिंदी",
];

export const scenarios = [
  { emoji: "☕", title: "Café in Paris", lang: "French", color: "from-orange-50 to-amber-100" },
  { emoji: "🏨", title: "Tokyo Hotel", lang: "Japanese", color: "from-amber-50 to-yellow-100" },
  { emoji: "🛒", title: "Madrid Market", lang: "Spanish", color: "from-orange-100 to-amber-200" },
  { emoji: "💼", title: "Berlin Deal", lang: "German", color: "from-yellow-50 to-orange-100" },
  { emoji: "🚕", title: "Mumbai Taxi", lang: "Hindi", color: "from-amber-100 to-orange-50" },
  { emoji: "🍜", title: "Seoul Street Food", lang: "Korean", color: "from-orange-50 to-yellow-100" },
];

export const features = [
  { icon: "🧠", title: "AI Immersion Engine", desc: "Step into dynamic roleplay with intelligent AI personas. Order coffee in Paris, negotiate deals in Tokyo — all in your target language.", tag: "Core Feature" },
  { icon: "📖", title: "Structured Curriculum", desc: "Chapter-based lessons guide you from zero to conversational, covering grammar, conjugations, and essential vocabulary.", tag: "Foundation" },
  { icon: "⚡", title: "Real-time Corrections", desc: "Instant feedback on grammar, syntax, and idiomatic phrasing — like having a native tutor in your pocket.", tag: "Smart Feedback" },
  { icon: "🎯", title: "Adaptive Difficulty", desc: "The AI reads your proficiency level and adjusts vocabulary, complexity, and speaking speed automatically.", tag: "Personalized" },
  { icon: "🎙️", title: "Voice Conversations", desc: "Practice speaking and listening with text-to-speech and voice input — train your ear and your tongue.", tag: "Coming Soon" },
  { icon: "🔥", title: "Streaks & XP", desc: "Stay motivated with daily streaks, experience points, and milestone badges that celebrate your progress.", tag: "Gamified" },
];

export const testimonials = [
  { name: "Aiko T.", lang: "Learning Spanish", text: "The AI scenarios feel genuinely alive. I practiced ordering tapas in a Madrid bar, and when I actually visited, I wasn't nervous at all.", avatar: "A", color: "#eb5e28" },
  { name: "Marco R.", lang: "Learning Japanese", text: "I was stuck at intermediate French for 2 years. LingoAI's roleplay scenarios broke my plateau in 3 weeks. Incredible.", avatar: "M", color: "#f4a261" },
  { name: "Priya S.", lang: "Learning German", text: "The real-time corrections are surgical. It doesn't just say 'wrong' — it explains why and shows me the natural phrasing.", avatar: "P", color: "#d4521e" },
];
