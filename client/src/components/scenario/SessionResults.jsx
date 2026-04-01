import React from 'react'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SessionResults = ({ totalScore, scoredTurns, isSaving }) => {
  const navigate = useNavigate()
  
  const avgScore = scoredTurns > 0 ? Math.round(totalScore / scoredTurns) : 0
  const xpEarned = Math.round(avgScore / 10)
  const passed = avgScore >= 60
  const medal = avgScore >= 80 ? '🏆' : avgScore >= 60 ? '🌟' : '💪'

  return (
    <div className="min-h-screen bg-[#FCF8F5] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Orbs */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', width:560, height:560, top:'-12%', left:'-8%', borderRadius:'50%', background:'radial-gradient(circle, rgba(235,94,40,0.11), transparent)', filter:'blur(72px)' }} />
        <div style={{ position:'absolute', width:420, height:420, bottom:'-8%', right:'-6%', borderRadius:'50%', background:'radial-gradient(circle, rgba(244,162,97,0.10), transparent)', filter:'blur(72px)' }} />
      </div>

      <div
        className="relative z-10 w-full max-w-md bg-white text-center"
        style={{ borderRadius:28, border:'1px solid rgba(204,197,185,0.4)', boxShadow:'0 24px 60px rgba(28,25,23,0.11)', overflow:'hidden' }}
      >
        {/* Shimmer accent top bar */}
        <div style={{ height:4, background:'linear-gradient(90deg,#eb5e28,#f4a261,#eb5e28)', backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite' }} />

        <div className="p-8">
          {/* Medal */}
          <div className="text-6xl mb-4" style={{ animation:'pop 0.4s cubic-bezier(.34,1.56,.64,1) both' }}>{medal}</div>

          <h2 className="text-3xl font-black text-[#1C1917] mb-2 tracking-tight">
            {avgScore >= 80 ? 'Outstanding!' : avgScore >= 60 ? 'Well Done!' : 'Keep Practicing!'}
          </h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            {passed
              ? 'You handled that scenario really well.'
              : "Review the feedback and try again — you'll get it!"}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Avg Score', value: avgScore, suffix: '/100' },
              { label: 'XP Earned', value: `+${xpEarned}`, suffix: '' },
              { label: 'Turns', value: scoredTurns, suffix: '' },
            ].map(({ label, value, suffix }) => (
              <div key={label} className="rounded-2xl p-4 text-center" style={{ background:'#FFF5EE', border:'1px solid #FCEAE1' }}>
                <p className="text-[10px] font-bold text-[#A33D18] uppercase tracking-wider mb-1">{label}</p>
                <p className="text-2xl font-extrabold text-[#A33D18]">
                  {value}<span className="text-xs font-medium text-gray-400">{suffix}</span>
                </p>
              </div>
            ))}
          </div>

          {isSaving && (
            <p className="text-xs text-gray-400 mb-4 flex items-center justify-center gap-2">
              <Loader2 size={12} className="animate-spin" /> Saving session...
            </p>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/journey')}
              className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
              style={{ background:'linear-gradient(135deg,#eb5e28,#d4521e)', boxShadow:'0 4px 16px rgba(235,94,40,0.30)' }}
            >
              Back to Journey
            </button>
            <button
              onClick={() => navigate('/scenario')}
              className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all hover:bg-[#FFF5EE]"
              style={{ border:'2px solid #FCEAE1', color:'#A33D18' }}
            >
              Try Another Scenario
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes pop { from{transform:scale(0)} to{transform:scale(1)} }
      `}</style>
    </div>
  )
}

export default SessionResults
