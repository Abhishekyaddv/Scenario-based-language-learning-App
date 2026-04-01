import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.png";

export default function LandingFooter() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 24px" }}>
      <div className="max-w-6xl mx-auto flex flex-wrap gap-8 justify-between items-center">
        <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(204,197,185,0.5)' }}>
            <img src={icon} alt="Contexto" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          </div>
          <span className="font-display" style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>Contexto</span>
        </Link>
        <div className="flex flex-wrap gap-8">
          <button onClick={() => scrollTo('features')} className="nav-link" style={{ fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Features</button>
          <button onClick={() => scrollTo('scenarios')} className="nav-link" style={{ fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Scenarios</button>
          <button onClick={() => scrollTo('howitworks')} className="nav-link" style={{ fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>How it works</button>
          <span className="nav-link" style={{ fontSize: 13, opacity: 0.5, cursor: 'not-allowed' }}>Pricing</span>
          <Link to="/login" className="nav-link" style={{ fontSize: 13, textDecoration: 'none' }}>Sign In</Link>
          <Link to="/register" className="nav-link" style={{ fontSize: 13, textDecoration: 'none' }}>Sign Up</Link>
        </div>
        <div style={{ fontSize: 13, color: "var(--dim)" }}>© 2025 Contexto. All rights reserved.</div>
      </div>
    </footer>
  );
}
