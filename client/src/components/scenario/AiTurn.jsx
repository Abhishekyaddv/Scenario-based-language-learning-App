import React from 'react'
import { Volume2, ChevronRight } from 'lucide-react'

const AiTurn = ({ turn, handleReplay, handleNext }) => {
  return (
    <div className="flex flex-col gap-3 session-fadein">
      <div className="flex items-start gap-3">

        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0 mt-0.5 shadow-md"
          style={{ background: 'linear-gradient(135deg, #eb5e28, #c04a1a)', boxShadow: '0 4px 12px rgba(235,94,40,0.28)' }}
        >
          AI
        </div>

        <div className="flex-1 min-w-0">
          {/* Bubble */}
          <div
            className="rounded-3xl rounded-tl-lg px-5 py-4"
            style={{ background:'white', border:'1px solid rgba(204,197,185,0.3)', boxShadow:'0 2px 16px rgba(37,36,34,0.06)' }}
          >
            <p className="text-base font-medium text-[#1C1917] leading-relaxed">
              {turn.text}
            </p>
            {turn.translation && (
              <p className="text-sm text-gray-400 italic border-t border-gray-100 pt-2 mt-3">
                {turn.translation}
              </p>
            )}
          </div>

          {/* Replay */}
          <button
            onClick={handleReplay}
            className="mt-2 flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#eb5e28] transition-colors font-medium"
          >
            <Volume2 size={13} />
            Replay audio
          </button>
        </div>
      </div>

      {/* Continue */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2.5 text-white text-sm font-bold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background:'linear-gradient(135deg, #eb5e28, #d4521e)', boxShadow:'0 4px 14px rgba(235,94,40,0.28)' }}
        >
          Continue <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}

export default AiTurn
