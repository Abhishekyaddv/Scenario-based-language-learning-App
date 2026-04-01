import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.png";

export default function LandingNavbar() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'Scenarios', id: 'scenarios' },
    { label: 'How it works', id: 'howitworks' },
    { label: 'Pricing', id: null }, // coming soon
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <img src={icon} alt="Contexto" className="w-9 h-9 object-contain rounded-lg" />
          </div>
          <span className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>Contexto</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, id }) =>
            id ? (
              <button
                key={label}
                onClick={() => scrollTo(id)}
                className="nav-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {label}
              </button>
            ) : (
              <span key={label} className="nav-link" style={{ opacity: 0.45, cursor: 'not-allowed' }}>{label}</span>
            )
          )}
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="nav-link hidden sm:block">Sign In</Link>          
          <Link to="/register" className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>Get Started</Link>
        </div>
      </div>
    </nav>
  );
}
