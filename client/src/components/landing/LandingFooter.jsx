import React from "react";

export default function LandingFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 24px" }}>
      <div className="max-w-6xl mx-auto flex flex-wrap gap-8 justify-between items-center">
        <div className="flex items-center gap-2">
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #eb5e28, #f4a261)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🌐</div>
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
  );
}
