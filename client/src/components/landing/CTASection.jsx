import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.png";

export default function CTASection() {
  return (
    <section className="py-16 md:py-[120px] px-6" style={{ position: "relative", textAlign: "center", overflow: "hidden" }}>
      <div className="orb" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(235,94,40,0.15), transparent)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div className="max-w-2xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
        <div className="glass rounded-3xl p-8 md:p-12" style={{ border: "1px solid rgba(235,94,40,0.2)" }}>
          {/* App icon instead of globe emoji */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(204,197,185,0.5)', background: '#fffcf2', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(235,94,40,0.12)' }}>
              <img src={icon} alt="Contexto" style={{ width: 52, height: 52, objectFit: 'contain', borderRadius: 12 }} />
            </div>
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, marginBottom: 16, lineHeight: 1.2 }}>
            Ready to speak<br />
            <span className="gradient-text">like a local?</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 36, fontWeight: 300, lineHeight: 1.7 }}>
            Join thousands of learners who ditched Duolingo for real conversations. Free to start, no credit card needed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="btn-primary" style={{ fontSize: 16, padding: "16px 40px", textDecoration: 'none' }}>
              <span>Start learning free →</span>
            </Link>
            <button className="btn-ghost" style={{ fontSize: 16, padding: "16px 40px", opacity: 0.5, cursor: 'not-allowed' }} disabled>View pricing</button>
          </div>
        </div>
      </div>
    </section>
  );
}
