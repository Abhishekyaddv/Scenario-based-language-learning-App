import React from "react";
import { features } from "./LandingStyles";

export default function FeaturesSection() {
  return (
    <section id="features" style={{ padding: "120px 24px", position: "relative", background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6" style={{ fontSize: 13, color: "var(--primary)", fontWeight: 700 }}>
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
          <div 
            key={i} 
            className="glass-hover rounded-3xl p-8" 
            style={{ 
              animationDelay: `${i * 0.1}s`, 
              boxShadow: "0 4px 20px rgba(37,36,34,0.03)", 
              background: "var(--surface)", 
              border: "1px solid var(--border)" 
            }}
          >
            {/* Header Row: Title & Tag on the left, Icon on the right */}
            <div className="flex justify-between items-start mb-5 gap-4">
              
              {/* Left Side: Tag and Title */}
              <div className="flex flex-col items-start gap-3">
                <div 
                  className="inline-block rounded-full px-2 py-1.5" 
                  style={{ fontSize: 12, color: "var(--primary)", fontWeight: 700, background: "rgba(235,94,40,0.08)" }}
                >
                  {f.tag}
                </div>
                <h3 
                  className="font-display" 
                  style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--text)" }}
                >
                  {f.title}
                </h3>
              </div>

              {/* Right Side: Icon */}
              <div 
                style={{ fontSize: 30, background: "var(--surface2)", width: 55, height: 55, display: "flex", alignItems: "start", justifyContent: "center", borderRadius: 20, flexShrink: 0 }}
              >
                {f.icon}
              </div>

            </div>

            {/* Bottom Row: Description */}
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
