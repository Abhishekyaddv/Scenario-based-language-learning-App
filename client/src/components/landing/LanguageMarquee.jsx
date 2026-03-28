import React from "react";
import { languages } from "./LandingStyles";

export default function LanguageMarquee() {
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "20px 0", overflow: "hidden", background: "var(--surface)" }}>
      <div className="marquee-track">
        {[...languages, ...languages].map((lang, i) => (
          <span key={i} style={{ padding: "0 40px", fontSize: 18, fontWeight: 600, color: "var(--muted)", whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif" }}>
            {lang} <span style={{ color: "var(--primary)", marginLeft: 40 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
