import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { validateTurn, saveScenarioSession } from '../services/authService'
import {
  ArrowLeft, Mic, MicOff, Send, Volume2,
  CheckCircle2, XCircle, Loader2, ChevronRight
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

  // ── results screen ──
  if (isFinished) {
    const avgScore = scoredTurns > 0 ? Math.round(totalScore / scoredTurns) : 0
    const xpEarned = Math.round(avgScore / 10)
    const passed = avgScore >= 60

    return (
      <div className="min-h-screen bg-[#FCF8F5] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">{avgScore >= 80 ? '🏆' : avgScore >= 60 ? '🌟' : '💪'}</div>
          <h2 className="text-2xl font-extrabold mb-2">
            {avgScore >= 80 ? 'Outstanding!' : avgScore >= 60 ? 'Well Done!' : 'Keep Practicing!'}
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            {avgScore >= 60
              ? "You handled that scenario really well."
              : "Review the feedback and try again — you'll get it!"}
          </p>

          {/* stats */}
          <div className="flex gap-3 mb-8">
            <div className="flex-1 bg-[#FFF5EE] border border-[#FCEAE1] rounded-2xl p-4">
              <p className="text-[10px] font-bold text-[#A33D18] uppercase tracking-wider mb-1">Avg Score</p>
              <p className="text-2xl font-extrabold text-[#A33D18]">{avgScore}<span className="text-sm font-medium text-gray-400">/100</span></p>
            </div>
            <div className="flex-1 bg-[#FFF5EE] border border-[#FCEAE1] rounded-2xl p-4">
              <p className="text-[10px] font-bold text-[#A33D18] uppercase tracking-wider mb-1">XP Earned</p>
              <p className="text-2xl font-extrabold text-[#A33D18]">+{xpEarned}</p>
            </div>
            <div className="flex-1 bg-[#FFF5EE] border border-[#FCEAE1] rounded-2xl p-4">
              <p className="text-[10px] font-bold text-[#A33D18] uppercase tracking-wider mb-1">Turns</p>
              <p className="text-2xl font-extrabold text-[#A33D18]">{scoredTurns}</p>
            </div>
          </div>

          {isSaving && (
            <p className="text-xs text-gray-400 mb-4 flex items-center justify-center gap-2">
              <Loader2 size={12} className="animate-spin" /> Saving session...
            </p>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/journey')}
              className="w-full py-3 bg-[#A33D18] hover:bg-[#8e3314] text-white rounded-xl font-bold transition-colors"
            >
              Back to Journey
            </button>
            <button
              onClick={() => navigate('/scenario')}
              className="w-full py-3 border-2 border-gray-200 hover:border-[#A33D18] hover:text-[#A33D18] text-gray-600 rounded-xl font-bold transition-colors"
            >
              Try Another Scenario
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── main session UI ──
  return (
    <div className="min-h-screen bg-[#FCF8F5] font-sans text-[#1C1917] flex flex-col">

      {/* header */}
      <header className="sticky top-0 bg-white border-b border-gray-100 z-50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              window.speechSynthesis.cancel()
              navigate('/scenario')
            }}
            className="flex items-center gap-2 text-gray-500 hover:text-[#A33D18] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Exit</span>
          </button>

          <div className="text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {script?.title}
            </p>
          </div>

          <span className="text-sm font-semibold text-[#42B0D5]">
            {currentTurn + 1}/{totalTurns}
          </span>
        </div>

        {/* progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-[#A33D18] to-[#42B0D5] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* main content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-8 flex flex-col gap-4">

        {/* situation context pill */}
        <div className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-700">Situation: </span>
          {situation}
        </div>

        {/* ── AI TURN ── */}
        {isAiTurn && (
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              {/* AI avatar */}
              <div className="w-9 h-9 rounded-full bg-[#A33D18] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
                AI
              </div>

              <div className="flex-1">
                {/* AI bubble */}
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                  <p className="text-base font-medium text-[#1C1917] leading-relaxed mb-2">
                    {turn.text}
                  </p>
                  {turn.translation && (
                    <p className="text-sm text-gray-400 italic border-t border-gray-50 pt-2">
                      {turn.translation}
                    </p>
                  )}
                </div>

                {/* replay button */}
                <button
                  onClick={handleReplay}
                  className="mt-2 flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#A33D18] transition-colors"
                >
                  <Volume2 size={13} />
                  Replay audio
                </button>
              </div>
            </div>

            {/* next button for AI turn */}
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#A33D18] hover:bg-[#8e3314] text-white text-sm font-bold rounded-xl transition-colors"
              >
                Continue <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── USER TURN ── */}
        {isUserTurn && (
          <div className="flex flex-col gap-4">

            {/* hint */}
            <div className="bg-[#EBF7FB] border border-[#42B0D5]/20 rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-[#2a6a7a] mb-0.5">Suggested response</p>
              <p className="text-sm text-[#2a6a7a]">{turn.text}</p>
            </div>

            {/* input area */}
            <div className={`bg-white border-2 rounded-2xl transition-all duration-200 ${feedback
                ? feedback.correct
                  ? 'border-green-400'
                  : 'border-red-400'
                : 'border-gray-200 focus-within:border-[#A33D18]'
              }`}>
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={!!feedback || isValidating}
                placeholder={`Reply in ${user?.targetLanguage || 'the target language'}...`}
                rows={3}
                className="w-full px-4 pt-4 pb-2 bg-transparent rounded-2xl text-[#1C1917] placeholder-gray-300 focus:outline-none resize-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !feedback) {
                    e.preventDefault()
                    handleSubmit()
                  }
                }}
              />

              {/* input actions row */}
              <div className="flex items-center justify-between px-3 pb-3">
                <button
                  onClick={handleMic}
                  disabled={!!feedback || isValidating}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${isListening
                      ? 'bg-red-50 text-red-500 border border-red-200'
                      : 'text-gray-400 hover:text-[#A33D18] hover:bg-[#FFF5EE]'
                    } disabled:opacity-40`}
                >
                  {isListening ? <MicOff size={13} /> : <Mic size={13} />}
                  {isListening ? 'Listening...' : 'Use voice'}
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!userInput.trim() || !!feedback || isValidating}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${userInput.trim() && !feedback && !isValidating
                      ? 'bg-[#A33D18] hover:bg-[#8e3314] text-white'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                >
                  {isValidating
                    ? <><Loader2 size={13} className="animate-spin" /> Checking...</>
                    : <><Send size={13} /> Submit</>
                  }
                </button>
              </div>
            </div>

            {/* feedback block */}
            {feedback && (
              <div className={`rounded-2xl border p-4 ${feedback.correct
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
                }`}>
                <div className="flex items-center gap-2 mb-2">
                  {feedback.correct
                    ? <CheckCircle2 size={16} className="text-green-500" />
                    : <XCircle size={16} className="text-red-500" />
                  }
                  <span className={`text-sm font-bold ${feedback.correct ? 'text-green-700' : 'text-red-700'}`}>
                    Score: {feedback.score}/100
                  </span>
                </div>

                <p className={`text-sm mb-2 ${feedback.correct ? 'text-green-700' : 'text-red-700'}`}>
                  {feedback.feedback}
                </p>

                {!feedback.correct && feedback.corrected && (
                  <div className="bg-white rounded-xl px-3 py-2 border border-red-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Ideal response</p>
                    <p className="text-sm text-gray-700 font-medium">{feedback.corrected}</p>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 bg-[#A33D18] hover:bg-[#8e3314] text-white text-sm font-bold rounded-xl transition-colors"
                >
                  Next Turn <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}

export default ScenarioSession