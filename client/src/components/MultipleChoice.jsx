import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const MultipleChoice = ({ lesson, onAnswer }) => {
  const [selected, setSelected] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (!selected) return                           // don't submit if nothing selected
    const correct = selected === lesson.correctAnswer
    setIsCorrect(correct)
    setIsAnswered(true)
    onAnswer(correct)
  }

  const getButtonStyle = (option) => {
    const isSelected = selected === option
    const isCorrectOption = option === lesson.correctAnswer

    if (!isAnswered) {
      return isSelected
        ? "border-2 border-blue-500 bg-blue-50 text-blue-800"
        : "border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
    }

    if (isCorrectOption) return "border-2 border-green-500 bg-green-50 text-green-800"
    if (isSelected) return "border-2 border-red-500 bg-red-50 text-red-800"
    return "border-2 border-gray-100 bg-gray-50 text-gray-400 opacity-60"
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">{lesson.prompt}</h3>

      <div className="flex flex-col gap-3 mb-6">
        {lesson.options.map((option, index) => (        // ← fix 1: lesson.options
          <button
            key={index}                                  // ← fix 5: key prop
            onClick={() => !isAnswered && setSelected(option)}  // ← fix 4: just select
            disabled={isAnswered}
            className={`flex items-center justify-between w-full text-left px-5 py-4 rounded-xl font-medium transition-all duration-200 ${getButtonStyle(option)}`}
          >
            <span>{option}</span>
            {isAnswered && option === lesson.correctAnswer && (
              <CheckCircle2 className="text-green-500 w-6 h-6" />
            )}
            {isAnswered && selected === option && option !== lesson.correctAnswer && (
              <XCircle className="text-red-500 w-6 h-6" />
            )}
          </button>
        ))}
      </div>

      {/* explanation after answering */}
      {isAnswered && lesson.explanation && (
        <div className="mb-4 p-3 bg-blue-50 rounded-xl text-sm text-blue-800">
          {lesson.explanation}
        </div>
      )}

      {/* submit button */}
      <button
        onClick={handleSubmit}
        disabled={!selected || isAnswered}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-200 ${
          !selected || isAnswered
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#a64015] hover:bg-[#8e3510]"
        }`}
      >
        {isAnswered ? "Answered" : "Check Answer"}
      </button>
    </div>
  )
}

export default MultipleChoice
