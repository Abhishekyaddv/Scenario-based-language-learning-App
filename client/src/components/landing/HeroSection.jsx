import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { languages } from "./LandingStyles";

export default function HeroSection() {
  const [chatMessages] = useState([
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
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 100 }}>
      <div className="mesh-bg" />
      <div className="grid-pattern" />
      <div className="orb" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(235,94,40,0.12), transparent)", top: "10%", left: "-10%" }} />
      <div className="orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(244,162,97,0.1), transparent)", bottom: "10%", right: "-5%" }} />

      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div style={{ animation: "slide-up 0.8s ease forwards" }}>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 shadow-sm" style={{ fontSize: 13, color: "var(--primary)", fontWeight: 600, background: "var(--surface)", border: "1px solid var(--border)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", display: "inline-block", animation: "pulse-glow 2s infinite" }} />
              Powered by Gemini 2.5 Flash & Claude
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
            <div className="inline-flex items-center gap-6 p-4 rounded-2xl" style={{ background: "rgba(255,252,242,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(204,197,185,0.4)" }}>
              <div className="flex" style={{ marginRight: 8 }}>
                {["A","M","P","S","K"].map((l, i) => (
                  <div key={l} style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: `hsl(${20 + i * 12}, 75%, ${55 + i * 4}%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, color: "white",
                    border: "2px solid var(--surface)", marginLeft: i > 0 ? -12 : 0,
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

          {/* Right — Chat UI */}
          <div style={{ position: "relative", animation: "slide-up 0.8s ease 0.2s both" }}>
            
            {/* Floating language pills */}
            {languages.slice(0, 4).map((lang, i) => (
              <div key={lang} className="glass animate-float" style={{
                position: "absolute", borderRadius: 20, padding: "8px 16px", fontSize: 13, fontWeight: 700,
                color: "var(--primary)", zIndex: 10, animationDelay: `${i * 0.5}s`,
                top: i === 0 ? "-5%" : i === 1 ? "10%" : i === 2 ? "-8%" : "15%",
                left: i === 0 ? "-8%" : i === 1 ? "unset" : i === 2 ? "unset" : "-10%",
                right: i === 1 ? "-5%" : i === 3 ? "unset" : "unset",
              }}>{lang}</div>
            ))}

            <div className="rounded-[2rem] overflow-hidden" style={{ background: "rgba(255,252,242,0.9)", backdropFilter: "blur(20px)", boxShadow: "0 25px 50px -12px rgba(37,36,34,0.15), 0 0 0 1px rgba(204,197,185,0.6)" }}>
              
              {/* Chat header */}
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 14, background: "rgba(245,240,232,0.5)" }}>
                <div style={{ width: 44, height: 44, borderRadius: "14px", background: "linear-gradient(135deg, #eb5e28, #f4a261)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 4px 10px rgba(235,94,40,0.2)" }}>🤵</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>Pierre — Café Scenario</div>
                  <div style={{ fontSize: 13, color: "var(--primary)", fontWeight: 500 }}>● Live in Paris · French · Beginner</div>
                </div>
                <div style={{ marginLeft: "auto", padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "rgba(235,94,40,0.08)", color: "var(--primary)", border: "1px solid rgba(235,94,40,0.2)" }}>AI Tutor Active</div>
              </div>

              {/* Messages */}
              <div ref={chatRef} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, maxHeight: 340, overflowY: "auto", background: "var(--surface)" }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{
                      maxWidth: "85%", padding: "14px 18px", 
                      borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                      background: msg.role === "user" ? "linear-gradient(135deg, #eb5e28, #f4a261)" : "var(--surface2)",
                      fontSize: 14, lineHeight: 1.5, fontWeight: 500,
                      color: msg.role === "user" ? "white" : "var(--text)",
                      border: msg.role === "ai" ? "1px solid var(--border)" : "none",
                      boxShadow: msg.role === "user" ? "0 4px 12px rgba(235,94,40,0.2)" : "none"
                    }}>{msg.text}</div>
                  </div>
                ))}
                {typed && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{
                      maxWidth: "85%", padding: "14px 18px", borderRadius: "20px 20px 20px 4px",
                      background: "var(--surface2)", fontSize: 14, lineHeight: 1.5, fontWeight: 500, color: "var(--text)",
                      border: "1px solid var(--border)"
                    }}>{typed}<span style={{ animation: "pulse-glow 1s infinite", display: "inline-block", marginLeft: 2, color: "var(--primary)" }}>|</span></div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", display: "flex", gap: 12, alignItems: "center", background: "rgba(245,240,232,0.5)" }}>
                <div style={{ flex: 1, borderRadius: 100, padding: "12px 20px", fontSize: 14, fontWeight: 500, color: "var(--muted)", background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)" }}>
                  Répondez en français...
                </div>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #eb5e28, #f4a261)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 10px rgba(235,94,40,0.25)", fontSize: 18 }}>↑</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
