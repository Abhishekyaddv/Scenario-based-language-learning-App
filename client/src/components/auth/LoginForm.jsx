import React from 'react';
import { Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';

export default function LoginForm({
  loginEmail, 
  setLoginEmail, 
  loginPassword, 
  setLoginPassword, 
  isLoginLoading, 
  handleLogin, 
  showLoginPassword, 
  setShowLoginPassword, 
  switchMode
}) {
  return (
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
  );
}
