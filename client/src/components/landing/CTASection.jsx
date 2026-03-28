import React from "react";

export default function CTASection() {
  return (
    <section style={{ padding: "120px 24px", position: "relative", textAlign: "center", overflow: "hidden" }}>
      <div className="orb" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(235,94,40,0.15), transparent)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div className="max-w-2xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
        <div className="glass rounded-3xl p-12" style={{ border: "1px solid rgba(235,94,40,0.2)" }}>
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
  );
}
