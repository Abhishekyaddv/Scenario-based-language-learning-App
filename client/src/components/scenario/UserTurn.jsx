import React from 'react'
import { Mic, MicOff, Send, Loader2, CheckCircle2, XCircle, ChevronRight } from 'lucide-react'

const UserTurn = ({
  turn,
  user,
  showHint,
  setShowHint,
  userInput,
  setUserInput,
  handleMic,
  isListening,
  handleSubmit,
  isValidating,
  feedback,
  handleNext,
  inputRef,
  canSubmit
}) => {
  return (
    <div className="flex flex-col gap-4 session-fadein">
      {/* Suggestion hint */}
      <div
        className="rounded-2xl px-4 py-3.5"
        style={{ background:'rgba(66,176,213,0.07)', border:'1px solid rgba(66,176,213,0.2)' }}
      >
        <div className="flex justify-between items-center mb-2">
          <p className="text-[11px] font-extrabold text-[#2a6a7a] uppercase tracking-widest">Suggested response</p>
          {!showHint && (
            <button 
              onClick={() => setShowHint(true)}
              className="text-[10px] uppercase font-bold text-white bg-[#42B0D5] px-2.5 py-1 rounded-full hover:bg-[#2a6a7a] transition-all shadow-sm"
            >
              View Hint
            </button>
          )}
        </div>
        
        {/* English meaning shown first */}
        {turn.translation && (
          <p className="text-sm text-[#2a6a7a]/90 font-medium leading-relaxed mb-1">
            "{turn.translation}"
          </p>
        )}

        {/* Target language phrase hidden behind button */}
        {showHint && (
          <div className="border-t border-[#42B0D5]/20 pt-2.5 mt-2 animate-in fade-in zoom-in duration-300">
            <p className="text-[10px] font-bold text-[#2a6a7a] uppercase tracking-widest mb-1.5 opacity-60">
              Translate to {user?.targetLanguage || 'Target Language'}:
            </p>
            <div className="relative pl-3 border-l-2 border-[#42B0D5]/40">
              <p className="text-sm font-bold text-[#2a6a7a] leading-relaxed">{turn.text}</p>
            </div>
          </div>
        )}
      </div>

      {/* Input card */}
      <div
        className="bg-white rounded-3xl overflow-hidden transition-all duration-200"
        style={{
          border: feedback
            ? feedback.correct ? '2px solid #34d399' : '2px solid #f87171'
            : '1px solid rgba(204,197,185,0.35)',
          boxShadow: feedback ? 'none' : '0 4px 20px rgba(37,36,34,0.07)',
        }}
      >
        {/* Label */}
        <div className="px-5 pt-4 pb-1">
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Your response</span>
        </div>

        <textarea
          ref={inputRef}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={!!feedback || isValidating}
          placeholder={`Reply in ${user?.targetLanguage || 'the target language'}…`}
          rows={3}
          className="w-full px-5 pt-2 pb-3 bg-transparent text-[#1C1917] placeholder-gray-300 focus:outline-none resize-none text-sm leading-relaxed"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !feedback) {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />

        <div className="mx-5 border-t border-gray-100" />

        {/* Actions row */}
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleMic}
            disabled={!!feedback || isValidating}
            className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-full font-semibold transition-all ${
              isListening
                ? 'bg-red-50 text-red-500 border border-red-200'
                : 'text-gray-400 hover:text-[#eb5e28] hover:bg-[#FFF5EE] border border-transparent hover:border-[#FCEAE1]'
            } disabled:opacity-40`}
          >
            {isListening ? <MicOff size={13} /> : <Mic size={13} />}
            <span className="ml-0.5">{isListening ? 'Listening…' : 'Voice'}</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold transition-all ${
              canSubmit
                ? 'text-white hover:-translate-y-0.5'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
            style={canSubmit ? {
              background: 'linear-gradient(135deg, #eb5e28, #d4521e)',
              boxShadow: '0 4px 12px rgba(235,94,40,0.28)',
            } : {}}
          >
            {isValidating
              ? <><Loader2 size={13} className="animate-spin" /><span>Checking…</span></>
              : <><Send size={13} /><span>Submit</span></>
            }
          </button>
        </div>
      </div>

      {/* Feedback card */}
      {feedback && (
        <div
          className="rounded-3xl overflow-hidden session-fadein"
          style={{
            border: feedback.correct ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(248,113,113,0.3)',
            boxShadow: feedback.correct
              ? '0 4px 20px rgba(52,211,153,0.08)'
              : '0 4px 20px rgba(248,113,113,0.08)',
          }}
        >
          {/* Header strip */}
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{
              background: feedback.correct ? 'rgba(240,253,244,1)' : 'rgba(254,242,242,1)',
              borderBottom: feedback.correct ? '1px solid rgba(52,211,153,0.15)' : '1px solid rgba(248,113,113,0.15)',
            }}
          >
            <div className="flex items-center gap-2">
              {feedback.correct
                ? <CheckCircle2 size={17} className="text-emerald-500" />
                : <XCircle size={17} className="text-red-400" />
              }
              <span className={`text-sm font-extrabold ${feedback.correct ? 'text-emerald-700' : 'text-red-600'}`}>
                {feedback.correct ? 'Great response!' : 'Not quite right'}
              </span>
            </div>
            {/* Score badge */}
            <span
              className="text-xs font-extrabold px-3 py-1 rounded-full"
              style={{
                background: feedback.correct ? 'rgba(52,211,153,0.14)' : 'rgba(248,113,113,0.14)',
                color: feedback.correct ? '#059669' : '#dc2626',
              }}
            >
              {feedback.score}/100
            </span>
          </div>

          {/* Body */}
          <div
            className="px-5 py-4"
            style={{ background: feedback.correct ? 'rgba(240,253,244,0.5)' : 'rgba(254,242,242,0.5)' }}
          >
            <p className={`text-sm leading-relaxed mb-3 ${feedback.correct ? 'text-emerald-700' : 'text-red-600'}`}>
              {feedback.feedback}
            </p>

            {!feedback.correct && feedback.corrected && (
              <div
                className="rounded-2xl px-4 py-3 mb-4"
                style={{ background:'white', border:'1px solid rgba(248,113,113,0.18)' }}
              >
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Ideal response</p>
                <p className="text-sm text-[#1C1917] font-medium leading-relaxed">{feedback.corrected}</p>
              </div>
            )}

            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white transition-all hover:-translate-y-0.5"
              style={{ background:'linear-gradient(135deg, #eb5e28, #d4521e)', boxShadow:'0 4px 14px rgba(235,94,40,0.26)' }}
            >
              Next Turn <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserTurn
