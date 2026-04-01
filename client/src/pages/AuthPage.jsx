import React, { useState, useEffect, useRef } from 'react';
import { Mail, Lock, User, EyeOff, Eye, LogIn, Loader2, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { registerUser } from '../services/authService';
import icon from '../assets/icon.png';

const AuthPage = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine mode from current URL path
  const [mode, setMode] = useState(location.pathname === '/register' ? 'register' : 'login');
  const [animDirection, setAnimDirection] = useState(null); // 'left' or 'right'
  const [isAnimating, setIsAnimating] = useState(false);
  const formContainerRef = useRef(null);

  // Login state
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Register state
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isRegLoading, setIsRegLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Sync mode with URL when navigating via browser back/forward
  useEffect(() => {
    const newMode = location.pathname === '/register' ? 'register' : 'login';
    if (newMode !== mode) {
      setMode(newMode);
    }
  }, [location.pathname]);

  const switchMode = (newMode) => {
    if (newMode === mode || isAnimating) return;
    setIsAnimating(true);
    setAnimDirection(newMode === 'register' ? 'left' : 'right');

    // After exit animation, switch mode and navigate
    setTimeout(() => {
      setMode(newMode);
      navigate(newMode === 'register' ? '/register' : '/login', { replace: true });

      // Trigger enter animation
      setTimeout(() => {
        setAnimDirection(null);
        setIsAnimating(false);
      }, 50);
    }, 280);
  };

  // --- Login handler ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);

    try {
      const response = await loginUser({ email: loginEmail, password: loginPassword });
      console.log('login response:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      const user = response.data.user;
      if (user.isOnboarded) {
        navigate('/journey');
      } else {
        navigate('/onboarding');
      }
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during Login, Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoginLoading(false);
    }
  };

  // --- Register handler ---
  const handleRegChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (statusMessage.text) setStatusMessage({ type: '', text: '' });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const response = await registerUser(formData);
      console.log('register response:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/onboarding');

      console.log('Registration successful:', response.data);
      setStatusMessage({ type: 'success', text: 'Account created successfully! Welcome to LingoAI.' });
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during registration. Please try again.';
      setStatusMessage({ type: 'error', text: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsRegLoading(false);
    }
  };

  // Animation classes
  const getFormStyle = () => {
    if (animDirection === 'left') {
      return { opacity: 0, transform: 'translateX(-40px)', transition: 'opacity 0.28s ease, transform 0.28s ease' };
    }
    if (animDirection === 'right') {
      return { opacity: 0, transform: 'translateX(40px)', transition: 'opacity 0.28s ease, transform 0.28s ease' };
    }
    return { opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.28s ease, transform 0.28s ease' };
  };

  const isLogin = mode === 'login';

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: 'linear-gradient(180deg, #fffcf2 0%, #f5f0e8 50%, #fffcf2 100%)' }}>

      {/* ─── AUTH NAVBAR ─────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: 'rgba(255,252,242,0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(204,197,185,0.35)',
        }}
      >
        {/* Back link */}
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium transition-colors group"
          style={{ color: '#403d39', textDecoration: 'none' }}
          onMouseEnter={e => e.currentTarget.style.color = '#eb5e28'}
          onMouseLeave={e => e.currentTarget.style.color = '#403d39'}
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
            style={{ transition: 'transform 0.2s ease' }}
          />
          Back to Home
        </Link>

        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          style={{ textDecoration: 'none' }}
        >
          <div
            className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform"
            style={{ border: '1px solid rgba(204,197,185,0.5)', background: '#fffcf2' }}
          >
            <img src={icon} alt="Contexto" className="w-8 h-8 object-contain rounded-md" />
          </div>
          <span className="font-semibold text-[15px]" style={{ color: '#252422', letterSpacing: '-0.01em' }}>Contexto</span>
        </Link>
      </nav>
      {/* ─────────────────────────────────────────────────────────── */}

      <Toaster position="top-center" reverseOrder={false} />

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(235,94,40,0.08), transparent)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(244,162,97,0.08), transparent)', filter: 'blur(80px)' }} />
      <div className="absolute top-[30%] right-[15%] w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(247,197,159,0.06), transparent)', filter: 'blur(80px)' }} />

      {/* Concentric Arcs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-0 pointer-events-none"
        style={{ border: '1px solid rgba(204,197,185,0.3)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full z-0 pointer-events-none"
        style={{ border: '1px solid rgba(204,197,185,0.2)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full z-0 pointer-events-none"
        style={{ border: '1px solid rgba(204,197,185,0.1)' }} />

      {/* --- FLOATING INFO CARDS --- */}
      <div className="absolute top-20 left-20 max-w-xs p-4 rounded-2xl shadow-lg animate-[pulse_4s_ease-in-out_infinite] z-0 hidden lg:block"
        style={{ background: 'rgba(255,252,242,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(204,197,185,0.3)' }}>
        <p className="text-sm font-medium" style={{ color: '#252422' }}>🌍 Next-Gen Hybrid Learning</p>
        <p className="text-xs mt-1" style={{ color: '#403d39' }}>Bridging the gap between beginner education and real-world fluency.</p>
      </div>

      <div className="absolute bottom-32 left-[32rem] max-w-[250px] p-4 rounded-2xl shadow-lg animate-[bounce_5s_ease-in-out_infinite] z-0 hidden xl:block"
        style={{ background: 'rgba(255,252,242,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(204,197,185,0.3)' }}>
        <p className="text-sm font-medium" style={{ color: '#252422' }}>☕ Paris or Tokyo? 🗼</p>
        <p className="text-xs mt-1" style={{ color: '#403d39' }}>Apply fundamentals in spontaneous, immersive LLM-generated contexts.</p>
      </div>

      <div className="absolute bottom-40 right-24 max-w-xs p-4 rounded-2xl shadow-lg animate-[pulse_6s_ease-in-out_infinite] z-0 hidden lg:block"
        style={{ background: 'rgba(255,252,242,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(204,197,185,0.3)' }}>
        <p className="text-sm font-medium" style={{ color: '#252422' }}>⚡ Real-time Feedback</p>
        <p className="text-xs mt-1" style={{ color: '#403d39' }}>Get instant corrections on grammar, syntax, and phrasing as you practice.</p>
      </div>

      <div className="absolute top-40 right-[28rem] max-w-xs p-4 rounded-2xl shadow-lg animate-[bounce_7s_ease-in-out_infinite] z-0 hidden xl:block"
        style={{ background: 'rgba(255,252,242,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(204,197,185,0.3)' }}>
        <p className="text-sm font-medium" style={{ color: '#252422' }}>🧠 AI Immersion</p>
        <p className="text-xs mt-1" style={{ color: '#403d39' }}>Step into dynamic scenarios with intelligent AI personas in any language.</p>
      </div>


      {/* ========== MAIN AUTH CARD ========== */}
      <div className="relative z-10 w-full max-w-[440px] mx-4 rounded-[2.5rem]"
        style={{
          background: 'rgba(255,252,242,0.85)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 25px 50px -12px rgba(37,36,34,0.12)',
          border: '1px solid rgba(204,197,185,0.4)',
        }}>

        {/* Subtle warm bottom glow */}
        <div className="absolute -bottom-2 inset-x-10 h-10 rounded-full -z-10"
          style={{ background: 'linear-gradient(to right, rgba(235,94,40,0.2), rgba(244,162,97,0.2), rgba(235,94,40,0.15))', filter: 'blur(20px)' }} />

        {/* ---- SHARED HEADER (always visible) ---- */}
        <div className="pt-10 px-10">
          {/* Top Icon */}
          <div className="flex justify-center mb-5">
            <div className="p-3 rounded-2xl shadow-sm" style={{ background: '#fffcf2', border: '1px solid #ccc5b9' }}>
              <LogIn size={24} strokeWidth={2.5} style={{ color: '#eb5e28' }} />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-[22px] font-bold mb-2" style={{ color: '#252422' }}>Welcome to LingoAI</h2>
            <p className="text-[13px] leading-relaxed px-2" style={{ color: '#403d39' }}>
              Master real-world fluency through AI-powered immersive scenarios. For free.
            </p>
          </div>

          {/* ---- PILL TAB TOGGLE ---- */}
          <div className="relative flex rounded-xl p-1 mb-8" style={{ background: '#f5f0e8' }}>
            {/* Animated slider */}
            <div
              className="absolute top-1 bottom-1 rounded-lg"
              style={{
                width: 'calc(50% - 4px)',
                left: isLogin ? '4px' : 'calc(50%)',
                background: '#eb5e28',
                transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 8px rgba(235,94,40,0.3)',
              }}
            />
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-300"
              style={{ color: isLogin ? 'white' : '#403d39' }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode('register')}
              className="relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-300"
              style={{ color: !isLogin ? 'white' : '#403d39' }}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* ---- ANIMATED FORM CONTAINER ---- */}
        <div ref={formContainerRef} className="overflow-hidden px-10 pb-10" style={getFormStyle()}>

          {/* ============ SIGN IN FORM ============ */}
          {isLogin && (
            <div>
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div className="relative flex items-center rounded-xl px-4 py-3.5 transition-all"
                  style={{ background: '#f5f0e8' }}
                  onFocus={(e) => { e.currentTarget.style.background = '#fffcf2'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(235,94,40,0.15)'; }}
                  onBlur={(e) => { e.currentTarget.style.background = '#f5f0e8'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <Mail size={18} className="mr-3 shrink-0" style={{ color: '#ccc5b9' }} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    disabled={isLoginLoading}
                    className="bg-transparent w-full text-sm outline-none"
                    style={{ color: '#252422' }}
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative flex items-center rounded-xl px-4 py-3.5 transition-all"
                  style={{ background: '#f5f0e8' }}
                  onFocus={(e) => { e.currentTarget.style.background = '#fffcf2'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(235,94,40,0.15)'; }}
                  onBlur={(e) => { e.currentTarget.style.background = '#f5f0e8'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <Lock size={18} className="mr-3 shrink-0" style={{ color: '#ccc5b9' }} />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    disabled={isLoginLoading}
                    className="bg-transparent w-full text-sm outline-none pr-8"
                    style={{ color: '#252422' }}
                    required
                  />
                  <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-4 focus:outline-none transition-colors" style={{ color: '#ccc5b9' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#403d39'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#ccc5b9'}>
                    {showLoginPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end pt-1">
                  <a href="#" className="text-[13px] font-medium transition-colors"
                    style={{ color: '#403d39' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#eb5e28'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#403d39'}>
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <button type="submit" disabled={isLoginLoading}
                  className="w-full text-white rounded-xl py-3.5 text-sm font-semibold transition-all mt-2 disabled:opacity-70 flex justify-center items-center gap-2"
                  style={{ background: '#eb5e28', boxShadow: '0 4px 12px rgba(235,94,40,0.25)' }}
                  onMouseEnter={(e) => { if (!isLoginLoading) { e.currentTarget.style.background = '#d4521e'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#eb5e28'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  {isLoginLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center justify-center my-7">
                <div className="h-px w-full" style={{ borderTop: '1px dashed #ccc5b9' }}></div>
                <span className="px-4 text-[12px] whitespace-nowrap" style={{ color: '#ccc5b9' }}>Or</span>
                <div className="h-px w-full" style={{ borderTop: '1px dashed #ccc5b9' }}></div>
              </div>

              {/* Switch link */}
              <div className="text-center text-[13px]" style={{ color: '#403d39' }}>
                Don't have an account?{' '}
                <button type="button" onClick={() => switchMode('register')}
                  className="font-semibold transition-colors border-0 bg-transparent cursor-pointer"
                  style={{ color: '#eb5e28' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#d4521e'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#eb5e28'}>
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {/* ============ SIGN UP FORM ============ */}
          {!isLogin && (
            <div>
              {/* Status Message */}
              {statusMessage.text && (
                <div className={`mb-5 p-4 rounded-xl text-sm ${
                  statusMessage.type === 'error'
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-green-50 text-green-600 border border-green-200'
                }`}>
                  {statusMessage.text}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Name */}
                <div className="relative flex items-center rounded-xl px-4 py-3.5 transition-all"
                  style={{ background: '#f5f0e8' }}
                  onFocus={(e) => { e.currentTarget.style.background = '#fffcf2'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(235,94,40,0.15)'; }}
                  onBlur={(e) => { e.currentTarget.style.background = '#f5f0e8'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <User size={18} className="mr-3 shrink-0" style={{ color: '#ccc5b9' }} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleRegChange}
                    disabled={isRegLoading}
                    className="bg-transparent w-full text-sm outline-none"
                    style={{ color: '#252422' }}
                    placeholder="Full Name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative flex items-center rounded-xl px-4 py-3.5 transition-all"
                  style={{ background: '#f5f0e8' }}
                  onFocus={(e) => { e.currentTarget.style.background = '#fffcf2'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(235,94,40,0.15)'; }}
                  onBlur={(e) => { e.currentTarget.style.background = '#f5f0e8'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <Mail size={18} className="mr-3 shrink-0" style={{ color: '#ccc5b9' }} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleRegChange}
                    disabled={isRegLoading}
                    className="bg-transparent w-full text-sm outline-none"
                    style={{ color: '#252422' }}
                    placeholder="Email Address"
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative flex items-center rounded-xl px-4 py-3.5 transition-all"
                  style={{ background: '#f5f0e8' }}
                  onFocus={(e) => { e.currentTarget.style.background = '#fffcf2'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(235,94,40,0.15)'; }}
                  onBlur={(e) => { e.currentTarget.style.background = '#f5f0e8'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <Lock size={18} className="mr-3 shrink-0" style={{ color: '#ccc5b9' }} />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleRegChange}
                    disabled={isRegLoading}
                    className="bg-transparent w-full text-sm outline-none pr-8"
                    style={{ color: '#252422' }}
                    placeholder="Password"
                    required
                  />
                  <button type="button" onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-4 focus:outline-none transition-colors" style={{ color: '#ccc5b9' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#403d39'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#ccc5b9'}>
                    {showRegPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                {/* Submit */}
                <button type="submit" disabled={isRegLoading}
                  className="w-full text-white rounded-xl py-3.5 text-sm font-semibold transition-all mt-4 disabled:opacity-70 flex justify-center items-center gap-2"
                  style={{ background: '#eb5e28', boxShadow: '0 4px 12px rgba(235,94,40,0.25)' }}
                  onMouseEnter={(e) => { if (!isRegLoading) { e.currentTarget.style.background = '#d4521e'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#eb5e28'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  {isRegLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center justify-center mt-7 mb-5">
                <div className="h-px w-full" style={{ borderTop: '1px dashed #ccc5b9' }}></div>
                <span className="px-4 text-[12px] font-medium whitespace-nowrap" style={{ color: '#ccc5b9' }}>Or continue with</span>
                <div className="h-px w-full" style={{ borderTop: '1px dashed #ccc5b9' }}></div>
              </div>

              {/* Social Auth */}
              <div className="grid grid-cols-2 gap-3">
                <button disabled={isRegLoading}
                  className="w-full flex items-center justify-center px-4 py-3 rounded-xl shadow-sm text-sm font-medium transition-colors disabled:opacity-50"
                  style={{ background: '#fffcf2', border: '1px solid #ccc5b9', color: '#252422' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f5f0e8'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#fffcf2'}>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button disabled={isRegLoading}
                  className="w-full flex items-center justify-center px-4 py-3 rounded-xl shadow-sm text-sm font-medium transition-colors disabled:opacity-50"
                  style={{ background: '#fffcf2', border: '1px solid #ccc5b9', color: '#252422' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f5f0e8'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#fffcf2'}>
                  <svg className="w-5 h-5 mr-2" fill="#252422" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </button>
              </div>

              {/* Switch link */}
              <div className="text-center mt-7 text-[13px]" style={{ color: '#403d39' }}>
                Already have an account?{' '}
                <button type="button" onClick={() => switchMode('login')}
                  className="font-semibold transition-colors border-0 bg-transparent cursor-pointer"
                  style={{ color: '#eb5e28' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#d4521e'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#eb5e28'}>
                  Sign in instead
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
