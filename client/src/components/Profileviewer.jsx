import React, { useEffect, useRef } from 'react';
import {
  User,
  Settings,
  LogOut,
  Flame,
  Award,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Small circular avatar button — place this anywhere in your layout.
 * Shows the user's first initial on an orange circle.
 */
export const ProfileAvatar = ({ onClick }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const name = user?.name || '?';

  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-3 cursor-pointer focus:outline-none"
      aria-label="Open profile"
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg"
        style={{ background: '#eb5e28', boxShadow: '0 4px 12px rgba(235,94,40,0.3)' }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    </button>
  );
};

/**
 * Profile modal overlay — renders a centered card with user info,
 * stats, and action buttons. Animated on open/close.
 */
export const ProfileModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const name = user?.name || 'User';
  const email = user?.email || '';
  const level = user?.level || '—';
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(37, 36, 34, 0.4)',
          backdropFilter: 'blur(4px)',
          animation: 'profileFadeIn 0.2s ease forwards',
        }}
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[380px] rounded-[2rem]"
        style={{
          background: '#fffcf2',
          border: '1px solid rgba(204,197,185,0.5)',
          boxShadow: '0 25px 60px -12px rgba(37,36,34,0.2)',
          animation: 'profileSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: 'rgba(255,255,255,0.25)', color: 'white' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {/* Header band with gradient */}
        <div
          className="relative overflow-hidden px-8 pt-10 pb-16"
          style={{ background: 'linear-gradient(135deg, #eb5e28, #f4a261)', borderRadius: '2rem 2rem 0 0' }}
        >
          {/* Decorative circles */}
          <div className="absolute top-[-20px] right-[-20px] w-[120px] h-[120px] rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="absolute bottom-[-30px] left-[-10px] w-[80px] h-[80px] rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Avatar — overlapping the header */}
        <div className="flex justify-center" style={{ marginTop: -44 }}>
          <div
            className="w-[88px] h-[88px] rounded-full flex items-center justify-center text-white font-bold text-3xl"
            style={{
              background: 'linear-gradient(135deg, #d4521e, #eb5e28)',
              border: '4px solid #fffcf2',
              boxShadow: '0 8px 24px rgba(235,94,40,0.3)',
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* User Info */}
        <div className="text-center px-8 mt-4 mb-6">
          <h3 className="text-xl font-bold mb-1" style={{ color: '#252422' }}>{name}</h3>
          <p className="text-sm" style={{ color: '#403d39' }}>{email}</p>
        </div>

        {/* Stats */}
        <div className="px-8 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <div
              className="flex flex-col items-center p-4 rounded-2xl"
              style={{ background: 'rgba(235,94,40,0.06)', border: '1px solid rgba(235,94,40,0.12)' }}
            >
              <Flame size={22} style={{ color: '#eb5e28', marginBottom: 6 }} />
              <span className="font-bold text-xl" style={{ color: '#252422' }}>{level}</span>
              <span className="text-[11px] font-semibold uppercase tracking-widest mt-1" style={{ color: '#ccc5b9' }}>Level</span>
            </div>
            <div
              className="flex flex-col items-center p-4 rounded-2xl"
              style={{ background: 'rgba(235,94,40,0.06)', border: '1px solid rgba(235,94,40,0.12)' }}
            >
              <Award size={22} style={{ color: '#eb5e28', marginBottom: 6 }} />
              <span className="font-bold text-xl" style={{ color: '#252422' }}>{xp}</span>
              <span className="text-[11px] font-semibold uppercase tracking-widest mt-1" style={{ color: '#ccc5b9' }}>Total XP</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-8" style={{ borderTop: '1px solid #ccc5b9', opacity: 0.4 }} />

        {/* Action Buttons */}
        <div className="px-8 py-5 flex flex-col gap-1.5">
         
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm font-medium p-3 rounded-xl transition-all w-full text-left mt-1"
            style={{ color: '#b91c1c' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(185,28,28,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </div>

      {/* Keyframe animations injected inline */}
      <style>{`
        @keyframes profileFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes profileSlideUp {
          from { opacity: 0; transform: scale(0.95) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Default export for backward compatibility
const Profileviewer = { ProfileAvatar, ProfileModal };
export default Profileviewer;