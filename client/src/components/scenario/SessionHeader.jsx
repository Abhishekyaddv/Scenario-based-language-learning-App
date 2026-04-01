import React from 'react'
import { ArrowLeft, Sparkles } from 'lucide-react'

const SessionHeader = ({ onExit, title, currentTurn, totalTurns, progress }) => {
  return (
    <div className="sticky top-0 z-50 pt-4 px-4 pb-3">
      <div
        className="max-w-2xl mx-auto flex items-center justify-between gap-4 px-4 py-2.5"
        style={{
          background: 'rgba(255,252,242,0.92)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(204,197,185,0.45)',
          borderRadius: 999,
          boxShadow: '0 4px 20px rgba(37,36,34,0.08)',
        }}
      >
        {/* Exit */}
        <button
          onClick={onExit}
          className="group flex items-center gap-2 text-gray-500 hover:text-[#eb5e28] transition-colors px-3 py-1.5 rounded-full hover:bg-[#FFF5EE]"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-semibold">Exit</span>
        </button>

        {/* Title */}
        <div className="flex items-center gap-1.5 min-w-0">
          <Sparkles size={12} className="text-[#eb5e28] flex-shrink-0" fill="currentColor" />
          <p className="text-xs font-bold text-[#1C1917] truncate max-w-[160px]">
            {title || 'Scenario Session'}
          </p>
        </div>

        {/* Turn counter */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0"
          style={{ background:'#FFF5EE', border:'1px solid #FCEAE1' }}
        >
          <span className="text-xs font-extrabold text-[#eb5e28]">{currentTurn + 1}</span>
          <span className="text-[10px] text-gray-300 font-bold">/</span>
          <span className="text-xs font-bold text-gray-400">{totalTurns}</span>
        </div>
      </div>

      {/* Progress bar below pill */}
      <div className="max-w-2xl mx-auto mt-2.5 px-1">
        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #eb5e28, #f4a261)' }}
          />
        </div>
      </div>
    </div>
  )
}

export default SessionHeader
