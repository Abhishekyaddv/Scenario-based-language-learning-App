import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { validateTurn, saveScenarioSession } from '../services/authService'
import { Sparkles } from 'lucide-react'

// Components
import SessionHeader from '../components/scenario/SessionHeader'
import AiTurn from '../components/scenario/AiTurn'
import UserTurn from '../components/scenario/UserTurn'
import SessionResults from '../components/scenario/SessionResults'

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
  const user = JSON.parse(localStorage.getItem('user') || '{}')

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
  const [showHint, setShowHint] = useState(false)

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
        const stored = JSON.parse(localStorage.getItem('user') || '{}')
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
    setShowHint(false)
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
  // ── RENDER RESULTS ──
  // ─────────────────────────────────
  if (isFinished) {
    return (
      <SessionResults 
        totalScore={totalScore} 
        scoredTurns={scoredTurns} 
        isSaving={isSaving} 
      />
    )
  }

  // ─────────────────────────────────
  // ── RENDER MAIN SESSION ──
  // ─────────────────────────────────
  const canSubmit = userInput.trim() && !feedback && !isValidating
  const handleExit = () => { window.speechSynthesis.cancel(); navigate('/scenario') }

  return (
    <div className="min-h-screen bg-[#FCF8F5] font-sans text-[#1C1917] flex flex-col">

      {/* Header */}
      <SessionHeader 
        onExit={handleExit}
        title={script?.title}
        currentTurn={currentTurn}
        totalTurns={totalTurns}
        progress={progress}
      />

      {/* ── Scrollable content ── */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 pb-10 flex flex-col gap-5">

        {/* Situation banner */}
        <div
          className="rounded-2xl px-5 py-3.5 flex items-start gap-3 mt-4"
          style={{ background:'rgba(235,94,40,0.06)', border:'1px solid rgba(235,94,40,0.12)' }}
        >
          <Sparkles size={13} className="text-[#eb5e28] mt-0.5 flex-shrink-0" fill="currentColor" />
          <p className="text-xs text-[#403d39] leading-relaxed">
            <span className="font-extrabold text-[#eb5e28]">Situation: </span>{situation}
          </p>
        </div>

        {/* AI TURN */}
        {isAiTurn && (
          <AiTurn 
            turn={turn} 
            handleReplay={handleReplay} 
            handleNext={handleNext} 
          />
        )}

        {/* USER TURN */}
        {isUserTurn && (
          <UserTurn 
            turn={turn}
            user={user}
            showHint={showHint}
            setShowHint={setShowHint}
            userInput={userInput}
            setUserInput={setUserInput}
            handleMic={handleMic}
            isListening={isListening}
            handleSubmit={handleSubmit}
            isValidating={isValidating}
            feedback={feedback}
            handleNext={handleNext}
            inputRef={inputRef}
            canSubmit={canSubmit}
          />
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
      `}</style>
    </div>
  )
}

export default ScenarioSession