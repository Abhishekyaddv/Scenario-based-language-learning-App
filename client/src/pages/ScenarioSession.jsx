import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { validateTurn, saveScenarioSession } from '../services/authService'
import {
  ArrowLeft, Mic, MicOff, Send, Volume2,
  CheckCircle2, XCircle, Loader2, ChevronRight,
  Sparkles
} from 'lucide-react'

// maps language name to speech synthesis code
const languageMap = {
  'Spanish': 'es-ES',
  'French': 'fr-FR',
  'German': 'de-DE',
  'Italian': 'it-IT',
  'Japanese': 'ja-JP',
  'Portuguese': 'pt-BR',
  'Hindi': 'hi-IN',
  'Mandarin': 'zh-CN',
}

const ScenarioSession = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  // get script passed from Scenario.jsx via navigate state
  const { script, situation } = location.state || {}

  const turns = script?.turns || []
  const totalTurns = turns.length

  // ── core state ──
  const [currentTurn, setCurrentTurn] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [isValidating, setIsValidating] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [transcript, setTranscript] = useState([])
  const [totalScore, setTotalScore] = useState(0)
  const [scoredTurns, setScoredTurns] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [sessionSaved, setSessionSaved] = useState(false)

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const turn = turns[currentTurn]
  const isAiTurn = turn?.speaker === 'ai'
  const isUserTurn = turn?.speaker === 'user_prompt'
  const progress = Math.round((currentTurn / totalTurns) * 100)

  // ── redirect if no script ──
  useEffect(() => {
    if (!script) navigate('/scenario')
  }, [])

  // ── auto scroll to bottom ──
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentTurn, feedback])

  // ── TTS — speak AI turn automatically ──
  useEffect(() => {
    if (!turn || !isAiTurn) return
    const lang = languageMap[user?.targetLanguage] || 'es-ES'
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(turn.text)
    utterance.lang = lang
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }, [currentTurn])

  // ── save session when finished ──
  useEffect(() => {
    if (!isFinished || sessionSaved) return

    const save = async () => {
      setIsSaving(true)
      try {
        await saveScenarioSession({
          scenarioType: situation,
          language: user?.targetLanguage,
          transcript,
        })
        // update xp in localStorage
        const xpEarned = Math.round(totalScore / (scoredTurns || 1) / 10)
        const stored = JSON.parse(localStorage.getItem('user'))
        stored.xp = (stored.xp || 0) + xpEarned
        localStorage.setItem('user', JSON.stringify(stored))
        setSessionSaved(true)
      } catch (err) {
        console.error('Failed to save session:', err)
      } finally {
        setIsSaving(false)
      }
    }
    save()
  }, [isFinished])

  // ── handle user submitting their response ──
  const handleSubmit = async () => {
    if (!userInput.trim() || isValidating) return

    // find the previous AI line to validate against
    const previousAiTurn = turns
      .slice(0, currentTurn)
      .reverse()
      .find(t => t.speaker === 'ai')

    setIsValidating(true)
    try {
      const response = await validateTurn({
        aiLine: previousAiTurn?.text || '',
        userResponse: userInput,
        language: user?.targetLanguage,
        level: user?.level,
      })

      const result = response.data.validation
      setFeedback(result)

      // add this exchange to transcript
      setTranscript(prev => [...prev, {
        speaker: 'user',
        aiText: previousAiTurn?.text || null,
        userResponse: userInput,
        score: result.score,
        feedback: result.feedback,
        corrected: result.corrected,
      }])

      setTotalScore(prev => prev + (result.score || 0))
      setScoredTurns(prev => prev + 1)

    } catch (err) {
      console.error('Validation error:', err)
    } finally {
      setIsValidating(false)
    }
  }

  // ── move to next turn ──
  const handleNext = () => {
    setFeedback(null)
    setUserInput('')
    if (currentTurn + 1 >= totalTurns) {
      setIsFinished(true)
    } else {
      setCurrentTurn(prev => prev + 1)
      // focus input if next turn is user turn
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  // ── STT — mic button ──
  const handleMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Voice input is only supported in Chrome or Edge.')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = languageMap[user?.targetLanguage] || 'es-ES'
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setUserInput(transcript)
    }
    recognition.start()
  }

  // ── replay TTS manually ──
  const handleReplay = () => {
    if (!turn) return
    const lang = languageMap[user?.targetLanguage] || 'es-ES'
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(turn.text)
    utterance.lang = lang
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }

  // ─────────────────────────────────
  // ── RESULTS SCREEN ──
  // ─────────────────────────────────
  if (isFinished) {
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

  // ─────────────────────────────────
  // ── MAIN SESSION UI ──
  // ─────────────────────────────────
  const canSubmit = userInput.trim() && !feedback && !isValidating

  return (
    <div className="min-h-screen bg-[#FCF8F5] font-sans text-[#1C1917] flex flex-col">

      {/* ── Floating pill header ── */}
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
            onClick={() => { window.speechSynthesis.cancel(); navigate('/scenario') }}
            className="group flex items-center gap-2 text-gray-500 hover:text-[#eb5e28] transition-colors px-3 py-1.5 rounded-full hover:bg-[#FFF5EE]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-semibold">Exit</span>
          </button>

          {/* Title */}
          <div className="flex items-center gap-1.5 min-w-0">
            <Sparkles size={12} className="text-[#eb5e28] flex-shrink-0" fill="currentColor" />
            <p className="text-xs font-bold text-[#1C1917] truncate max-w-[160px]">
              {script?.title || 'Scenario Session'}
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

      {/* ── Scrollable content ── */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 pb-10 flex flex-col gap-5">

        {/* Situation banner */}
        <div
          className="rounded-2xl px-5 py-3.5 flex items-start gap-3"
          style={{ background:'rgba(235,94,40,0.06)', border:'1px solid rgba(235,94,40,0.12)' }}
        >
          <Sparkles size={13} className="text-[#eb5e28] mt-0.5 flex-shrink-0" fill="currentColor" />
          <p className="text-xs text-[#403d39] leading-relaxed">
            <span className="font-extrabold text-[#eb5e28]">Situation: </span>{situation}
          </p>
        </div>

        {/* ── AI TURN ── */}
        {isAiTurn && (
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
        )}

        {/* ── USER TURN ── */}
        {isUserTurn && (
          <div className="flex flex-col gap-4 session-fadein">

            {/* Suggestion hint */}
            <div
              className="rounded-2xl px-4 py-3.5"
              style={{ background:'rgba(66,176,213,0.07)', border:'1px solid rgba(66,176,213,0.2)' }}
            >
              <p className="text-[11px] font-extrabold text-[#2a6a7a] mb-1.5 uppercase tracking-widest">Suggested response</p>
              {/* Target language phrase */}
              <p className="text-sm font-semibold text-[#2a6a7a] leading-relaxed">{turn.text}</p>
              {/* English meaning */}
              {turn.translation && (
                <p className="text-xs text-[#2a6a7a]/65 italic mt-1 leading-relaxed border-t border-[#42B0D5]/10 pt-1.5">
                  {turn.translation}
                </p>
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
        )}

        <div ref={bottomRef} />
      </div>

      <style>{`
        .session-fadein {
          animation: sfadein 0.28s ease both;
        }
        @keyframes sfadein {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes pop { from{transform:scale(0)} to{transform:scale(1)} }
      `}</style>
    </div>
  )
}

export default ScenarioSession