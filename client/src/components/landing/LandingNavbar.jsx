import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon.png";
import { Menu, X } from "lucide-react";

export default function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Features",    id: "features"   },
    { label: "Scenarios",   id: "scenarios"  },
    { label: "How it works",id: "howitworks" },
    { label: "Pricing",     id: null         },
  ];

  return (
    /* Outer strip — transparent, just provides the fixed positioning layer */
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{ paddingTop: 16 }}
    >
      {/* ── Floating pill container ── */}
      <nav
        className="flex items-center justify-between"
        style={{
          width: "min(900px, calc(100% - 48px))",
          padding: "10px 10px 10px 20px",
          borderRadius: 999,
          background: "rgba(255, 252, 242, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(204, 197, 185, 0.55)",
          boxShadow:
            "0 4px 24px rgba(37, 36, 34, 0.08), 0 1px 4px rgba(37, 36, 34, 0.04)",
        }}
      >
        {/* ── Logo + Brand ── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group shrink-0"
          style={{ textDecoration: "none" }}
        >
          <div
            className="flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform"
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid rgba(204,197,185,0.5)",
              background: "#fffcf2",
            }}
          >
            <img
              src={icon}
              alt="Contexto"
              style={{ width: 34, height: 34, objectFit: "contain", borderRadius: 8 }}
            />
          </div>
          <span
            className="font-display"
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            Contexto
          </span>
        </Link>

        {/* ── Center nav links ── */}
        <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ label, id }) =>
            id ? (
              <button
                key={label}
                onClick={() => scrollTo(id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--muted)",
                  transition: "color 0.2s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >
                {label}
              </button>
            ) : (
              <span
                key={label}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--muted)",
                  opacity: 0.4,
                  cursor: "not-allowed",
                }}
              >
                {label}
              </span>
            )
          )}
        </div>

        {/* ── Right: Sign In + pill CTA ── */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/login"
            className="hidden sm:block"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--muted)",
              textDecoration: "none",
              transition: "color 0.2s",
              padding: "6px 4px",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
          >
            Sign In
          </Link>

          {/* Pill CTA — matches reference shape */}
          <Link
            to="/register"
            className="hidden sm:inline-flex"
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 22px",
              borderRadius: 999,
              background: "#eb5e28",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(235, 94, 40, 0.30)",
              transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#d4521e";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(235,94,40,0.38)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#eb5e28";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(235,94,40,0.30)";
            }}
          >
            Get Started
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ background: "transparent", border: "none" }}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Full-screen blurred mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 flex flex-col items-center justify-center md:hidden"
          style={{
            zIndex: -1, // Sits exactly beneath the floating nav
            background: "rgba(255, 252, 242, 0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            paddingTop: 80
          }}
        >
          <div className="flex flex-col gap-8 text-center w-full px-6">
            {navLinks.map(({ label, id }) =>
              id ? (
                <button
                  key={label}
                  onClick={() => scrollTo(id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 24,
                    fontWeight: 600,
                    color: "var(--text)",
                    fontFamily: "inherit",
                    padding: "8px 0"
                  }}
                >
                  {label}
                </button>
              ) : (
                <span
                  key={label}
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    color: "var(--muted)",
                    opacity: 0.5,
                  }}
                >
                  {label}
                </span>
              )
            )}
            
            <div className="w-12 h-[1px] bg-gray-300 mx-auto my-2" />
            
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "var(--text)",
                textDecoration: "none",
                padding: "8px 0"
              }}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 32px",
                borderRadius: 999,
                background: "#eb5e28",
                color: "white",
                fontSize: 18,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(235, 94, 40, 0.30)",
                width: "100%",
                maxWidth: 240,
                margin: "0 auto"
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
