import React, { useState } from 'react';
import { Mail, Lock, EyeOff, Eye, LogIn, ArrowRight, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService';


const Login = () => {
 
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // New states for API request handling
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    

    try {
      const response = await loginUser({ email, password })
      console.log('login response:', response.data); 
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      const user = response.data.user;

      if (user.isOnboarded) {
        navigate('/journey')      // returning user → go to main app
      } else {
        navigate('/onboarding')   // new user → complete onboarding first
      }

    } catch (error) {
      console.error('Login failed:', error);

      const errorMessage = error.response?.data?.message || 'An error occurred during Login, Please try again.';
      
      toast.error(errorMessage);

    } finally {
        setIsLoading(false);
      }
  };


  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#cae6f6] to-[#e6f0f9]">

    <Toaster position="top-center" reverseOrder={false} />  
      {/* --- BACKGROUND EFFECTS & CLOUDS --- */}
      {/* Background Cloud Image (Soft blending) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Concentric Arcs (Replicating the image background lines) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/40 rounded-full z-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/30 rounded-full z-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/20 rounded-full z-0 pointer-events-none" />

      {/* --- LINGO AI BACKGROUND INTERACTIVE INFO --- */}
      {/* Floating Elements detailing the App Info */}
      <div className="absolute top-20 left-20 max-w-xs p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg animate-[pulse_4s_ease-in-out_infinite] z-0">
        <p className="text-sm font-medium text-slate-700">🌍 Next-Gen Hybrid Learning</p>
        <p className="text-xs text-slate-600 mt-1">Bridging the gap between beginner education and real-world fluency.</p>
      </div>

      <div className="absolute bottom-32 left-[32rem] max-w-[250px] p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg animate-[bounce_5s_ease-in-out_infinite] z-0">
        <p className="text-sm font-medium text-slate-700">☕ Paris or Tokyo? 🗼</p>
        <p className="text-xs text-slate-600 mt-1">Apply fundamentals in spontaneous, immersive LLM-generated contexts.</p>
      </div>

      <div className="absolute bottom-40 right-24 max-w-xs p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg animate-[pulse_6s_ease-in-out_infinite] z-0">
        <p className="text-sm font-medium text-slate-700">Integrated AI</p>
        <p className="text-xs text-slate-600 mt-1">Move beyond repetitive vocabulary matching. Speak naturally with LingoAI.</p>
      </div>

      <div className="absolute top-40 right-[28rem] max-w-xs p-4 bg-white/30 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg animate-[bounce_7s_ease-in-out_infinite] z-0">
        <p className="text-sm font-medium text-slate-700"> Dynamic Roleplay</p>
        <p className="text-xs text-slate-600 mt-1">Move beyond repetitive vocabulary matching. Speak naturally with LingoAI.</p>
      </div>
     


      {/* --- MAIN LOGIN CARD --- */}
      <div className="relative z-10 w-full max-w-[420px] p-10 bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-white/50">
        
        {/* Subtle Purple/Blue Bottom Glow from the image */}
        <div className="absolute -bottom-2 inset-x-10 h-10 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 blur-xl opacity-50 -z-10 rounded-full" />

        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 text-gray-800">
            <LogIn size={24} strokeWidth={2.5} />
          </div>
        </div>

        {/* Headers */}
        <div className="text-center mb-8">
          <h2 className="text-[22px] font-bold text-gray-900 mb-2">Sign in with email</h2>
          <p className="text-[13px] text-gray-500 leading-relaxed px-4">
            Master real-world fluency with LingoAI. Bring your vocabulary and confidence together. For free.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email Input */}
          <div className="relative flex items-center bg-[#f4f4f6] rounded-xl px-4 py-3.5 transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white">
            <Mail size={18} className="text-gray-400 mr-3 shrink-0" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-transparent w-full text-sm text-gray-800 placeholder-gray-400 outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center bg-[#f4f4f6] rounded-xl px-4 py-3.5 transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white">
            <Lock size={18} className="text-gray-400 mr-3 shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="bg-transparent w-full text-sm text-gray-800 placeholder-gray-400 outline-none pr-8"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end pt-1">
            <a href="#" className="text-[13px] font-medium text-gray-700 hover:text-black transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1c1d21] hover:bg-black text-white rounded-xl py-3.5 text-sm font-medium transition-colors mt-2 shadow-md"
          >{isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sigining In...
                </>
              ) : (
                <>
                  Sign In
                  
                </>
              )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-8">
          <div className="h-px w-full border-t border-dashed border-gray-300"></div>
          <span className="px-4 text-[12px] text-gray-400 whitespace-nowrap">Or sign in with</span>
          <div className="h-px w-full border-t border-dashed border-gray-300"></div>
        </div>

        {/* Signup Link */}
        <div className="text-center text-[13px] text-gray-700">
          Don't have an account?{' '}
          <a href="/register" className="font-medium text-gray-900 hover:text-black transition-colors">
            Sign Up
          </a>
        </div>


      </div>
    </div>
  );
};

export default Login