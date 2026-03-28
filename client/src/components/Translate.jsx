import React, { useState } from 'react'
import { Send, CheckCircle2, XCircle, Lightbulb } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Translate = ({ lesson, onAnswer }) => {
  const [inputValue, setInputValue] = useState('')
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleSubmit = () => {
    if (!inputValue.trim()) return
    const correct = inputValue.trim().toLowerCase() === lesson.correctAnswer.trim().toLowerCase()
    setIsCorrect(correct)
    setIsAnswered(true)
    onAnswer(correct)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isAnswered) handleSubmit()
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100">

      {/* prompt */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{lesson.prompt}</h3>
      <p className="text-sm text-gray-400 mb-6">Type your translation below</p>

      {/* hint */}
      {lesson.hint && (
        <div className="mb-4">
          <button
            onClick={() => setShowHint(!showHint)}
            disabled={isAnswered}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#42B0D5] hover:text-[#2a8fab] transition-colors"
          >
            <Lightbulb size={14} />
            {showHint ? 'Hide hint' : 'Show hint'}
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 px-3 py-2 bg-[#EBF7FB] border border-[#42B0D5]/20 rounded-lg text-sm text-[#2a6a7a]"
              >
                💡 {lesson.hint}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* input area */}
      <div className={`relative mb-4 rounded-xl border-2 transition-all duration-200 ${
        !isAnswered
          ? 'border-gray-200 focus-within:border-[#A33D18]'
          : isCorrect
            ? 'border-green-400 bg-green-50'
            : 'border-red-400 bg-red-50'
      }`}>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isAnswered}
          rows={3}
          placeholder="Your translation..."
          className="w-full px-4 py-3 bg-transparent rounded-xl text-gray-800 placeholder-gray-300 focus:outline-none resize-none text-base"
        />

        {/* feedback icon inside input */}
        {isAnswered && (
          <div className="absolute right-3 top-3">
            {isCorrect
              ? <CheckCircle2 className="text-green-500 w-5 h-5" />
              : <XCircle className="text-red-500 w-5 h-5" />
            }
          </div>
        )}
      </div>

      {/* feedback message */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${
              isCorrect
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {isCorrect ? (
              '✅ Perfect! Well done.'
            ) : (
              <span>
                ❌ The correct answer is:{' '}
                <span className="font-bold">{lesson.correctAnswer}</span>
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* explanation */}
      {isAnswered && lesson.explanation && (
        <div className="mb-4 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
          📘 {lesson.explanation}
        </div>
      )}

      {/* submit button */}
      <button
        onClick={handleSubmit}
        disabled={!inputValue.trim() || isAnswered}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all duration-200 ${
          !inputValue.trim() || isAnswered
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-[#A33D18] hover:bg-[#8e3314] shadow-md hover:shadow-lg'
        }`}
      >
        <Send size={16} />
        {isAnswered ? 'Answered' : 'Check Answer'}
      </button>
    </div>
  )
}

export default Translate