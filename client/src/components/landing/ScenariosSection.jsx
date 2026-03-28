import React from "react";
import { scenarios } from "./LandingStyles";

export default function ScenariosSection() {
  return (
    <section style={{ padding: "100px 24px 140px", position: "relative", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ fontSize: 13, color: "var(--primary)", fontWeight: 700, background: "var(--surface2)", border: "1px solid var(--border)" }}>
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
              <div key={i} className={`glass-hover rounded-2xl p-6 bg-gradient-to-br ${s.color}`} style={{ cursor: "pointer", border: "1px solid rgba(204,197,185,0.4)" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.emoji}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{s.lang}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
