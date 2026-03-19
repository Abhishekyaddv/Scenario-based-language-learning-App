import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* LIGHT THEME VARIABLES */
    --bg: #f8fafc;
    --surface: #ffffff;
    --surface2: #f1f5f9;
    --border: #e2e8f0;
    --indigo: #0284c7; /* sky-600 */
    --cyan: #0ea5e9; /* sky-500 */
    --violet: #2563eb; /* blue-600 */
    --text: #0f172a; /* slate-900 */
    --muted: #64748b; /* slate-500 */
    --dim: #94a3b8; /* slate-400 */
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }

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
    background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .shimmer-text {
    background: linear-gradient(90deg, #2563eb, #0ea5e9, #38bdf8, #2563eb);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  /* Soft Light Glassmorphism */
  .glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px rgba(15, 23, 42, 0.04);
  }

  .glass-hover {
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .glass-hover:hover {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(14, 165, 233, 0.2);
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(14, 165, 233, 0.08);
  }

  /* Matching the dark button from Login/Register */
  .btn-primary {
    background: #18181b;
    color: white;
    border: none;
    padding: 14px 32px;
    border-radius: 14px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .btn-primary:hover { 
    background: #000000;
    transform: translateY(-2px); 
    box-shadow: 0 8px 20px rgba(0,0,0,0.15); 
  }

  .btn-ghost {
    background: white;
    color: var(--text);
    border: 1px solid var(--border);
    padding: 14px 32px;
    border-radius: 14px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }
  .btn-ghost:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
    transform: translateY(-2px);
  }

  .mesh-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 20%, rgba(14, 165, 233, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 80% 80%, rgba(37, 99, 235, 0.05) 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 50% 0%, rgba(56, 189, 248, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
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

const languages = ["日本語", "Français", "Español", "Deutsch", "中文", "Português", "한국어", "Italiano", "العربية", "हिंदी"];

// Updated colors to light pastels
const scenarios = [
  { emoji: "☕", title: "Café in Paris", lang: "French", color: "from-rose-50 to-pink-100" },
  { emoji: "🏨", title: "Tokyo Hotel", lang: "Japanese", color: "from-sky-50 to-blue-100" },
  { emoji: "💼", title: "Berlin Deal", lang: "German", color: "from-slate-100 to-slate-200" },
  { emoji: "🛒", title: "Madrid Market", lang: "Spanish", color: "from-amber-50 to-orange-100" },
  { emoji: "🚕", title: "Mumbai Taxi", lang: "Hindi", color: "from-emerald-50 to-teal-100" },
  { emoji: "🍜", title: "Seoul Street Food", lang: "Korean", color: "from-purple-50 to-fuchsia-100" },
];

const features = [
  { icon: "🧠", title: "AI Immersion Engine", desc: "Step into dynamic roleplay with intelligent AI personas. Order coffee in Paris, negotiate deals in Tokyo — all in your target language.", tag: "Core Feature" },
  { icon: "📖", title: "Structured Curriculum", desc: "Chapter-based lessons guide you from zero to conversational, covering grammar, conjugations, and essential vocabulary.", tag: "Foundation" },
  { icon: "⚡", title: "Real-time Corrections", desc: "Instant feedback on grammar, syntax, and idiomatic phrasing — like having a native tutor in your pocket.", tag: "Smart Feedback" },
  { icon: "🎯", title: "Adaptive Difficulty", desc: "The AI reads your proficiency level and adjusts vocabulary, complexity, and speaking speed automatically.", tag: "Personalized" },
  { icon: "🎙️", title: "Voice Conversations", desc: "Practice speaking and listening with text-to-speech and voice input — train your ear and your tongue.", tag: "Coming Soon" },
  { icon: "🔥", title: "Streaks & XP", desc: "Stay motivated with daily streaks, experience points, and milestone badges that celebrate your progress.", tag: "Gamified" },
];

const testimonials = [
  { name: "Aiko T.", lang: "Learning Spanish", text: "The AI scenarios feel genuinely alive. I practiced ordering tapas in a Madrid bar, and when I actually visited, I wasn't nervous at all.", avatar: "A", color: "#0ea5e9" },
  { name: "Marco R.", lang: "Learning Japanese", text: "I was stuck at intermediate French for 2 years. LingoAI's roleplay scenarios broke my plateau in 3 weeks. Incredible.", avatar: "M", color: "#2563eb" },
  { name: "Priya S.", lang: "Learning German", text: "The real-time corrections are surgical. It doesn't just say 'wrong' — it explains why and shows me the natural phrasing.", avatar: "P", color: "#8b5cf6" },
];

export default function LingoAILanding() {
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "Bonjour! Je suis votre serveur ce soir. Qu'est-ce que vous désirez?" },
    { role: "user", text: "Je voudrais une café, s'il vous plaît." },
    { role: "ai", text: "Bien sûr! Small tip: 'un café' uses the masculine article. You'd say 'Je voudrais un café.' — Your request was perfectly understood though! ☕" },
    { role: "user", text: "Merci! Et avez-vous des croissants?" },
  ]);
  const [typed, setTyped] = useState("");
  const fullText = "Oui, bien sûr! We have fresh ones from this morning. Your French is très bien! 🥐";
  const chatRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [typed]);

  return (
    <>
      <style>{style}</style>
      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

        {/* NAV (Optional: Remove this if using the MainLayout approach discussed earlier) */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Globe className="w-5 h-5 text-sky-500" strokeWidth={2.5} />
              </div>
              <span className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>LingoAI</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {["Features", "Scenarios", "How it works", "Pricing"].map(l => (
                <span key={l} className="nav-link">{l}</span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="nav-link hidden sm:block">Sign In</Link>          
              <Link to="/register" className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>Get Started</Link>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 80 }}>
          <div className="mesh-bg" />
          <div className="grid-pattern" />
          <div className="orb" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(14,165,233,0.15), transparent)", top: "10%", left: "-10%" }} />
          <div className="orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(37,99,235,0.1), transparent)", bottom: "10%", right: "-5%" }} />

          <div className="max-w-7xl mx-auto px-6 py-20 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Content */}
              <div style={{ animation: "slide-up 0.8s ease forwards" }}>
                <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-8 border border-slate-200 shadow-sm" style={{ fontSize: 13, color: "var(--indigo)", fontWeight: 600 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", display: "inline-block", animation: "pulse-glow 2s infinite" }} />
                  Powered by GPT-4o & Claude
                </div>

                <h1 className="font-display" style={{ fontSize: "clamp(46px, 6vw, 76px)", lineHeight: 1.05, fontWeight: 700, marginBottom: 24, color: "var(--text)", letterSpacing: "-0.02em" }}>
                  Learn languages<br />
                  <em className="gradient-text" style={{ fontStyle: "italic" }}>the way humans do.</em>
                </h1>

                <p style={{ fontSize: 19, color: "var(--muted)", lineHeight: 1.6, maxWidth: 500, marginBottom: 40, fontWeight: 400 }}>
                  Combine structured lessons with AI-powered immersive scenarios. From your first word to navigating real conversations — LingoAI gets you there.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Link to="/register" className="btn-primary">Get Started</Link>
                  <Link to="/demo" className="btn-ghost">Watch demo</Link>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-6 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/60 inline-flex">
                  <div className="flex" style={{ marginRight: 8 }}>
                    {["A","M","P","S","K"].map((l, i) => (
                      <div key={l} style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: `hsl(${200 + i * 20}, 70%, 55%)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700, color: "white",
                        border: "2px solid white", marginLeft: i > 0 ? -12 : 0,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                      }}>{l}</div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>12,000+ learners</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>already fluent-bound</div>
                  </div>
                </div>
              </div>

              {/* Right — Clean Light Chat UI */}
              <div style={{ position: "relative", animation: "slide-up 0.8s ease 0.2s both" }}>
                
                {/* Floating language pills */}
                {languages.slice(0, 4).map((lang, i) => (
                  <div key={lang} className="glass animate-float" style={{
                    position: "absolute", borderRadius: 20, padding: "8px 16px", fontSize: 13, fontWeight: 700,
                    color: "var(--violet)", zIndex: 10, animationDelay: `${i * 0.5}s`,
                    top: i === 0 ? "-5%" : i === 1 ? "10%" : i === 2 ? "-8%" : "15%",
                    left: i === 0 ? "-8%" : i === 1 ? "unset" : i === 2 ? "unset" : "-10%",
                    right: i === 1 ? "-5%" : i === 3 ? "unset" : "unset",
                  }}>{lang}</div>
                ))}

                <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] overflow-hidden" style={{ boxShadow: "0 25px 50px -12px rgba(15,23,42,0.15), 0 0 0 1px rgba(226,232,240,0.8)" }}>
                  
                  {/* Chat header */}
                  <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 14, background: "rgba(248,250,252,0.5)" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "14px", background: "linear-gradient(135deg, #0ea5e9, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 4px 10px rgba(14,165,233,0.2)" }}>🤵</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>Pierre — Café Scenario</div>
                      <div style={{ fontSize: 13, color: "var(--indigo)", fontWeight: 500 }}>● Live in Paris · French · Beginner</div>
                    </div>
                    <div className="bg-sky-50 text-sky-600" style={{ marginLeft: "auto", padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: "1px solid #bae6fd" }}>AI Tutor Active</div>
                  </div>

                  {/* Messages */}
                  <div ref={chatRef} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, maxHeight: 340, overflowY: "auto", background: "white" }}>
                    {chatMessages.map((msg, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                        <div style={{
                          maxWidth: "85%", padding: "14px 18px", 
                          borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                          background: msg.role === "user" ? "linear-gradient(135deg, #0ea5e9, #2563eb)" : "var(--surface2)",
                          fontSize: 14, lineHeight: 1.5, fontWeight: 500,
                          color: msg.role === "user" ? "white" : "var(--text)",
                          border: msg.role === "ai" ? "1px solid var(--border)" : "none",
                          boxShadow: msg.role === "user" ? "0 4px 12px rgba(37,99,235,0.15)" : "none"
                        }}>{msg.text}</div>
                      </div>
                    ))}
                    {typed && (
                      <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div style={{
                          maxWidth: "85%", padding: "14px 18px", borderRadius: "20px 20px 20px 4px",
                          background: "var(--surface2)", fontSize: 14, lineHeight: 1.5, fontWeight: 500, color: "var(--text)",
                          border: "1px solid var(--border)"
                        }}>{typed}<span style={{ animation: "pulse-glow 1s infinite", display: "inline-block", marginLeft: 2, color: "var(--cyan)" }}>|</span></div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", display: "flex", gap: 12, alignItems: "center", background: "rgba(248,250,252,0.5)" }}>
                    <div style={{ flex: 1, background: "white", borderRadius: 100, padding: "12px 20px", fontSize: 14, fontWeight: 500, color: "var(--muted)", border: "1px solid var(--border)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)" }}>
                      Répondez en français...
                    </div>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #0ea5e9, #2563eb)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 10px rgba(37,99,235,0.2)", fontSize: 18 }}>↑</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* LANGUAGE MARQUEE */}
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "20px 0", overflow: "hidden", background: "white" }}>
          <div className="marquee-track">
            {[...languages, ...languages].map((lang, i) => (
              <span key={i} style={{ padding: "0 40px", fontSize: 18, fontWeight: 600, color: "var(--muted)", whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif" }}>
                {lang} <span style={{ color: "var(--cyan)", marginLeft: 40 }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <section style={{ padding: "120px 24px", position: "relative", background: "var(--bg)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6" style={{ fontSize: 13, color: "var(--indigo)", fontWeight: 700 }}>
                Everything you need
              </div>
              <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, marginBottom: 20, color: "var(--text)", letterSpacing: "-0.02em" }}>
                Built for <span className="gradient-text">real fluency</span>
              </h2>
              <p style={{ fontSize: 18, color: "var(--muted)", maxWidth: 600, margin: "0 auto", fontWeight: 400, lineHeight: 1.6 }}>
                Every feature is designed around one goal: getting you from textbook knowledge to confident, spontaneous conversation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div key={i} className="bg-white glass-hover rounded-3xl p-8 border border-slate-200" style={{ animationDelay: `${i * 0.1}s`, boxShadow: "0 4px 20px rgba(15,23,42,0.03)" }}>
                  <div style={{ fontSize: 32, marginBottom: 20, background: "var(--surface2)", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 20 }}>{f.icon}</div>
                  <div className="inline-block bg-sky-50 rounded-full px-3 py-1.5 mb-5" style={{ fontSize: 12, color: "var(--indigo)", fontWeight: 700 }}>{f.tag}</div>
                  <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "var(--text)" }}>{f.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, fontWeight: 500 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SCENARIOS */}
        <section style={{ padding: "100px 24px 140px", position: "relative", background: "white", borderTop: "1px solid var(--border)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 mb-6" style={{ fontSize: 13, color: "var(--violet)", fontWeight: 700 }}>
                  🎭 AI Immersion Engine
                </div>
                <h2 className="font-display" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>
                  Every scenario,<br />
                  <span className="gradient-text">every city.</span>
                </h2>
                <p style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.6, marginBottom: 40, fontWeight: 400 }}>
                  Choose from dozens of real-world contexts. Our AI adapts its persona, accent cues, and vocabulary to match the culture — so you're not just learning a language, you're living it.
                </p>
                <button className="btn-primary">
                  <span>Explore all scenarios →</span>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                {scenarios.map((s, i) => (
                  <div key={i} className={`glass-hover rounded-2xl p-6 bg-gradient-to-br ${s.color}`} style={{ cursor: "pointer", border: "1px solid rgba(255,255,255,0.5)" }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>{s.emoji}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{s.lang}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)", padding: "48px 24px" }}>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "40+", label: "Languages" },
              { val: "200+", label: "AI Scenarios" },
              { val: "12k+", label: "Active Learners" },
              { val: "94%", label: "Completion Rate" },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display gradient-text" style={{ fontSize: 42, fontWeight: 700, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 13, color: "var(--dim)", marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <section style={{ padding: "120px 24px", position: "relative", textAlign: "center", overflow: "hidden" }}>
          <div className="orb" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          <div className="max-w-2xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
            <div className="glass rounded-3xl p-12" style={{ border: "1px solid rgba(99,102,241,0.3)" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🌐</div>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, marginBottom: 16, lineHeight: 1.2 }}>
                Ready to speak<br />
                <span className="gradient-text">like a local?</span>
              </h2>
              <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 36, fontWeight: 300, lineHeight: 1.7 }}>
                Join thousands of learners who ditched Duolingo for real conversations. Free to start, no credit card needed.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>
                  <span>Start learning free →</span>
                </button>
                <button className="btn-ghost" style={{ fontSize: 16, padding: "16px 40px" }}>View pricing</button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 24px" }}>
          <div className="max-w-6xl mx-auto flex flex-wrap gap-8 justify-between items-center">
            <div className="flex items-center gap-2">
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #6366F1, #22D3EE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🌐</div>
              <span className="font-display" style={{ fontSize: 18, fontWeight: 600 }}>LingoAI</span>
            </div>
            <div className="flex flex-wrap gap-8">
              {["Features", "Pricing", "Blog", "Docs", "Privacy", "Terms"].map(l => (
                <span key={l} className="nav-link" style={{ fontSize: 13 }}>{l}</span>
              ))}
            </div>
            <div style={{ fontSize: 13, color: "var(--dim)" }}>© 2025 LingoAI. All rights reserved.</div>
          </div>
        </footer>

      </div>
    </>
  );
}
