import React from 'react';
import { User, Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';

export default function RegisterForm({
  formData, 
  handleRegChange, 
  isRegLoading, 
  handleRegister, 
  showRegPassword, 
  setShowRegPassword, 
  statusMessage, 
  switchMode
}) {
  return (
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
        <button disabled={true}
          className="w-full flex flex-col items-center justify-center px-2 py-2 rounded-xl shadow-sm text-sm font-medium transition-colors opacity-60 cursor-not-allowed"
          style={{ background: '#fffcf2', border: '1px solid #ccc5b9', color: '#252422' }}
          >
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </div>
          <span className="text-[10px] mt-1 font-semibold text-[#eb5e28]">Coming soon</span>
        </button>
        <button disabled={true}
          className="w-full flex flex-col items-center justify-center px-2 py-2 rounded-xl shadow-sm text-sm font-medium transition-colors opacity-60 cursor-not-allowed"
          style={{ background: '#fffcf2', border: '1px solid #ccc5b9', color: '#252422' }}
          >
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="#252422" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </div>
          <span className="text-[10px] mt-1 font-semibold text-[#eb5e28]">Coming soon</span>
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
  );
}
