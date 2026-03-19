import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';

const Navbar = () => {
  const location = useLocation(); // Used to check which link is currently active

  // I separated "Get Started" from this array so we can style it as a prominent button
  const navLinks = [
    { id: 1, name: "Home", to: "/" },
    { id: 2, name: "About Project", to: "/about-project" },
    { id: 3, name: "About Me", to: "/about-me" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo / App Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5 text-sky-500" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800">LingoAI</span>
          </Link>

          {/* Center Navigation Links (Hidden on very small mobile screens) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <li key={link.id} className="list-none">
                  <Link 
                    to={link.to}
                    className={`text-sm font-semibold transition-colors hover:text-slate-900 ${
                      isActive ? "text-sky-600" : "text-slate-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </div>

          {/* Right Side Actions / CTA */}
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="hidden sm:block text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Sign In
            </Link>
            
            <Link 
              to="/info-page" 
              className="bg-[#18181b] hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;