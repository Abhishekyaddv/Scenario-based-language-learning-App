import React, { useState } from 'react';
import { Mail, Lock, User, Globe, Sparkles, MessageSquare, ArrowRight, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  // New states for API request handling
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any previous errors when the user starts typing again
    if (statusMessage.text) setStatusMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({ type: '', text: '' });

      try {
        const response = await registerUser(formData);
        console.log('register response:', response.data);
        localStorage.setItem('token', response.data.token)
        navigate('/onboarding')
        
        console.log('Registration successful:', response.data);
        setStatusMessage({ 
          type: 'success', 
          text: 'Account created successfully! Welcome to LingoAI.' 
        });
        
        // Optional: Clear form or redirect user here
        // setFormData({ name: '', email: '', password: '', targetLanguage: '' });
        
      } catch (error) {
        console.error('Registration failed:', error);
        // Safely extract the error message from the backend response
        const errorMessage = error.response?.data?.message || 'An error occurred during registration. Please try again.';
        setStatusMessage({ type: 'error', text: errorMessage });
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Panel - Branding & Info */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#f8fafc] p-12 flex-col relative overflow-hidden border-r border-sky-50/50">
  
        {/* Soft Light-Blue Background Blobs */}
  <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob z-0" />
  <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000 z-0" />

  {/* Content Wrapper (Centered Vertically) */}
  <div className="relative z-10 flex flex-col h-full justify-center max-w-[480px] mx-auto w-full">
    
    {/* Brand Header */}
    <div className="flex items-center gap-3 mb-16">
      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-sky-100 flex items-center justify-center">
        <Globe className="w-6 h-6 text-sky-500" strokeWidth={2.5} />
      </div>
      <span className="text-2xl font-extrabold tracking-tight text-slate-800">LingoAI</span>
    </div>

    {/* Hero Copy */}
    <h1 className="text-[2.75rem] font-extrabold tracking-tight leading-[1.15] mb-6 text-slate-900">
      Master languages through <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">real-world scenarios.</span>
    </h1>
    <p className="text-lg text-slate-500 mb-12 leading-relaxed font-medium">
      Go beyond vocabulary lists. Practice speaking and writing in dynamic, AI-generated roleplays tailored to your skill level.
    </p>

    {/* Feature List */}
    <div className="space-y-8">
      
      {/* Feature 1 */}
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 bg-white shadow-sm border border-sky-100 rounded-2xl flex items-center justify-center shrink-0 mt-1 transition-transform hover:scale-105">
          <Sparkles className="w-5 h-5 text-sky-500" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-base mb-1">AI-Powered Immersion</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            Order coffee, negotiate a deal, or navigate an airport with absolute confidence.
          </p>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 bg-white shadow-sm border border-sky-100 rounded-2xl flex items-center justify-center shrink-0 mt-1 transition-transform hover:scale-105">
          <MessageSquare className="w-5 h-5 text-blue-500" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-base mb-1">Instant Feedback</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            Get real-time corrections on your grammar, syntax, and natural phrasing.
          </p>
        </div>
      </div>

    </div>
  </div>

  {/* Footer */}
  <div className="relative z-10 text-sm font-semibold text-slate-400 mt-auto pt-12 max-w-[480px] mx-auto w-full">
    © {new Date().getFullYear()} LingoAI. All rights reserved.
  </div>
          </div>

      {/* Right Panel - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
          
          {/* Main Glassmorphic Card (Matches Image) */}
          <div className="w-full max-w-[440px] p-8 sm:p-10 bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60 relative">
            
            {/* Subtle Pink/Blue Bottom Glow */}
            <div className="absolute -bottom-4 inset-x-12 h-12 bg-gradient-to-r from-pink-200/40 via-purple-200/40 to-blue-200/40 blur-2xl -z-10 rounded-full" />

            {/* Top Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-slate-800">
                <User className="w-6 h-6" strokeWidth={2} />
              </div>
            </div>

            {/* Headers */}
            <div className="text-center mb-8">
              <h2 className="text-[22px] font-bold text-slate-900 mb-3">Start your journey</h2>
              <p className="text-sm text-slate-500 leading-relaxed px-2">
                Create an account to unlock personalized language scenarios.
              </p>
            </div>

            {/* Status Message Display */}
            {statusMessage.text && (
              <div className={`mb-6 p-4 rounded-xl text-sm ${
                statusMessage.type === 'error' 
                  ? 'bg-red-50 text-red-600 border border-red-200' 
                  : 'bg-green-50 text-green-600 border border-green-200'
              }`}>
                {statusMessage.text}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Input */}
              <div className="relative flex items-center bg-slate-50/80 rounded-2xl px-4 py-3.5 transition-all focus-within:ring-2 focus-within:ring-sky-100 focus-within:bg-white border border-slate-100/50">
                <User size={18} className="text-slate-400 mr-3 shrink-0" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="bg-transparent w-full text-sm text-slate-800 placeholder-slate-400 outline-none"
                  placeholder="Full Name"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative flex items-center bg-slate-50/80 rounded-2xl px-4 py-3.5 transition-all focus-within:ring-2 focus-within:ring-sky-100 focus-within:bg-white border border-slate-100/50">
                <Mail size={18} className="text-slate-400 mr-3 shrink-0" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="bg-transparent w-full text-sm text-slate-800 placeholder-slate-400 outline-none"
                  placeholder="Email Address"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative flex items-center bg-slate-50/80 rounded-2xl px-4 py-3.5 transition-all focus-within:ring-2 focus-within:ring-sky-100 focus-within:bg-white border border-slate-100/50">
                <Lock size={18} className="text-slate-400 mr-3 shrink-0" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="bg-transparent w-full text-sm text-slate-800 placeholder-slate-400 outline-none pr-8"
                  placeholder="Password"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#18181b] hover:bg-black text-white rounded-2xl py-4 text-sm font-semibold transition-all mt-4 shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Dashed Divider */}
            <div className="flex items-center justify-center mt-8 mb-6">
              <div className="h-px w-full border-t border-dashed border-slate-200"></div>
              <span className="px-4 text-[12px] font-medium text-slate-400 whitespace-nowrap">Or continue with</span>
              <div className="h-px w-full border-t border-dashed border-slate-200"></div>
            </div>

            {/* Social Auth Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button disabled={isLoading} className="w-full flex items-center justify-center px-4 py-3 border border-slate-100 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button disabled={isLoading} className="w-full flex items-center justify-center px-4 py-3 border border-slate-100 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50">
                <svg className="w-5 h-5 mr-2 text-slate-900" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </button>
            </div>

            {/* Footer Link */}
            <div className="text-center mt-8">
              <p className="text-[13px] text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-slate-900 hover:underline transition-all">
                  Sign in instead
                </Link>
              </p>
            </div>

          </div>
        </div>
    </div>
  );
};

export default Register;