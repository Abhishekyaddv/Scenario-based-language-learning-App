import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { registerUser } from '../services/authService';
import icon from '../assets/icon.png';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

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
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/onboarding');

      console.log('Registration successful:', response.data);
      setStatusMessage({ type: 'success', text: 'Account created successfully! Welcome to Contexto.' });
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
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center" style={{ background: '#fffcf2', border: '1px solid #ccc5b9' }}>
              <img src={icon} alt="Contexto" className="w-8 h-8 object-contain rounded-md" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-[22px] font-bold mb-2" style={{ color: '#252422' }}>Welcome to Contexto</h2>
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
            <LoginForm 
              loginEmail={loginEmail}
              setLoginEmail={setLoginEmail}
              loginPassword={loginPassword}
              setLoginPassword={setLoginPassword}
              isLoginLoading={isLoginLoading}
              handleLogin={handleLogin}
              showLoginPassword={showLoginPassword}
              setShowLoginPassword={setShowLoginPassword}
              switchMode={switchMode}
            />
          )}

          {/* ============ SIGN UP FORM ============ */}
          {!isLogin && (
            <RegisterForm 
              formData={formData}
              handleRegChange={handleRegChange}
              isRegLoading={isRegLoading}
              handleRegister={handleRegister}
              showRegPassword={showRegPassword}
              setShowRegPassword={setShowRegPassword}
              statusMessage={statusMessage}
              switchMode={switchMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
