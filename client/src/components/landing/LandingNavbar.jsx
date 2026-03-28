import React from "react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <Globe className="w-5 h-5" style={{ color: "#eb5e28" }} strokeWidth={2.5} />
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
  );
}
