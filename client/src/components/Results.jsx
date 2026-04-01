import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect, useMemo } from 'react';
import { updateProgress } from '../services/authService';


const ChapterResults = ({  score, totalLessons, chapterId, lessonsData, onAnswer, onBackToJourney, onRetry, isFinished }) => {
  // Calculations
  const percentage = Math.round((score / totalLessons) * 100);
  const xpEarned = score * 10;

  // Dynamic performance feedback logic
  const performance = useMemo(() => {
    if (percentage >= 80) {
      return { heading: "Outstanding!", message: "Excellent work! You've truly mastered this topic.", icon: "🏆" };
    }
    if (percentage >= 60) {
      return { heading: "Well Done!", message: "Good job! You're getting the hang of it.", icon: "🌟" };
    }
    return { heading: "Keep Going!", message: "Needs practice. Don't give up, review and try again!", icon: "💪" };
  }, [percentage]);

  useEffect(() => {
    // Only trigger confetti if they passed (above 60%)
    if (percentage >= 60) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#eb5e28', '#ccc5b9', '#f28b63'] 
      });
    }
  }, [percentage]);

  

useEffect(() => {
  if (!isFinished) return              

  const saveProgress = async () => {
    try {
      const lessonIds = lessonsData?.lessons?.map(l => l.id) || []
      
      await updateProgress({                 // from authService.js
        chapterId,
        xpEarned,
        lessonIds
      })

      // update xp in localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      user.xp = (user.xp || 0) + xpEarned
      localStorage.setItem('user', JSON.stringify(user))

    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }

  saveProgress()
}, [isFinished])                             // ← only isFinished here

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center p-8 bg-[#fffcf2] rounded-2xl shadow-xl text-center border border-[#ccc5b9] max-w-md mx-auto w-full"
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-6xl mb-4"
      >
        {performance.icon}
      </motion.div>

      {/* Dynamic Heading & Message */}
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{performance.heading}</h2>
      <p className="text-gray-600 mb-8 px-2 text-lg">
        {performance.message}
      </p>
      
      {/* Stats Grid */}
      <div className="flex w-full gap-4 mb-8">
        {/* Score Card */}
        <div className="flex-1 bg-white border border-[#ccc5b9] rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Score</span>
          <div className="text-2xl font-bold text-gray-900">
            <span className="text-[#eb5e28]">{score}</span> <span className="text-base text-gray-400 font-medium">/ {totalLessons}</span>
          </div>
        </div>

        {/* XP Card */}
        <div className="flex-1 bg-[#eb5e28]/10 border border-[#eb5e28]/20 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
          <span className="text-xs font-bold text-[#eb5e28] uppercase tracking-wider mb-1">XP Earned</span>
          <div className="text-2xl font-bold text-[#eb5e28]">
            +{xpEarned}
          </div>
        </div>
      </div>

      {/* Action Buttons (Stacked for Mobile-friendly UX) */}
      <div className="flex flex-col w-full gap-3">
        <button 
          onClick={onBackToJourney}
          className="w-full py-3 px-6 bg-[#eb5e28] hover:opacity-90 text-white rounded-lg font-medium transition-opacity shadow-sm"
        >
          Back to Journey
        </button>
        <button 
          onClick={onRetry}
          className="w-full py-3 px-6 bg-transparent hover:bg-[#ccc5b9]/20 border-2 border-[#ccc5b9] text-gray-800 rounded-lg font-medium transition-colors"
        >
          Try Chapter Again
        </button>
      </div>
    </motion.div>
  );
};

export default ChapterResults;