import React, { useEffect } from 'react';
import { User, LogOut, Flame, Award, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Small circular avatar button — place this anywhere in your layout.
 */
export const ProfileAvatar = ({ onClick, className = '' }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const name = user?.name || '?';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative flex items-center justify-center w-11 h-11 rounded-full text-white font-extrabold text-lg shadow-lg cursor-pointer focus:outline-none ${className}`}
      style={{
        background: 'linear-gradient(135deg, #f4a261, #eb5e28)',
        boxShadow: '0 4px 14px rgba(235,94,40,0.3)',
      }}
      aria-label="Open profile"
    >
      {name.charAt(0).toUpperCase()}
      
      {/* Subtle pulsing ring on hover */}
      <div className="absolute inset-0 rounded-full border-2 border-[#eb5e28] opacity-0 hover:opacity-100 hover:animate-ping" />
    </motion.button>
  );
};

/**
 * Profile modal overlay — highly attractive card with a creative wavy banner,
 * seamless alignment, and hover effects.
 */
export const ProfileModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const name = user?.name || 'User';
  const email = user?.email || '';
  const level = user?.level || 'Beginner';
  const xp = user?.xp || 0;

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#252422]/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[380px] bg-[#FCF8F5] rounded-[2rem] shadow-2xl z-10 overflow-hidden"
          >
            {/* --- CREATIVE BANNER --- */}
            <div className="relative h-40 bg-gradient-to-br from-[#eb5e28] via-[#e76f51] to-[#f4a261]">
              {/* Subtle Polka Dot Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 2px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              />
              
              {/* Decorative floating blurred orbs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
              <div className="absolute top-10 -left-8 w-24 h-24 bg-black/10 rounded-full blur-xl" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 hover:rotate-90 transition-all duration-300 backdrop-blur-md"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              {/* Wavy Bottom SVG */}
              <svg 
                className="absolute bottom-0 w-full h-12 text-[#FCF8F5]" 
                preserveAspectRatio="none" 
                viewBox="0 0 1440 320" 
                fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,149.3C672,160,768,224,864,229.3C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
              </svg>
            </div>

            {/* --- CONTENT AREA --- */}
            <div className="px-8 pb-8 relative">
              
              {/* Avatar — Perfectly aligned overlapping the banner */}
              <div className="flex justify-center -mt-16 mb-4 relative z-10">
                <div className="p-1.5 bg-[#FCF8F5] rounded-full shadow-lg">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d4521e] to-[#eb5e28] flex items-center justify-center text-white font-extrabold text-4xl shadow-inner border-[3px] border-[#eb5e28]/20">
                    {name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-[#1C1917] tracking-tight">{name}</h3>
                <p className="text-[#a39f98] text-sm font-medium mt-0.5">{email}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-sm border border-[#FCEAE1] transition-shadow hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FFF5EE] flex items-center justify-center mb-2 text-[#eb5e28]">
                    <Flame size={20} strokeWidth={2.5} />
                  </div>
                  <span className="font-extrabold text-lg text-[#1C1917]">{level}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#a39f98] mt-0.5">Level</span>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-sm border border-[#FCEAE1] transition-shadow hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FFF5EE] flex items-center justify-center mb-2 text-[#eb5e28]">
                    <Award size={20} strokeWidth={2.5} />
                  </div>
                  <span className="font-extrabold text-lg text-[#1C1917]">{xp}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#a39f98] mt-0.5">Total XP</span>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-[#d62828] bg-[#d62828]/5 hover:bg-[#d62828]/10 hover:shadow-inner transition-colors border border-transparent hover:border-[#d62828]/20"
              >
                <LogOut size={18} strokeWidth={2.5} />
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Default export for backward compatibility
const Profileviewer = { ProfileAvatar, ProfileModal };
export default Profileviewer;