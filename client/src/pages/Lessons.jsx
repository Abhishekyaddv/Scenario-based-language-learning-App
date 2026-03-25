import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchLessonsByChapter } from '../services/authService'  // ← new function
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Lessons = () => {
  const { chapterId } = useParams()   // ← destructure properly, matches route param name
  const [lessonsData, setLessonsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCurrent, setIsCurrent] = useState(0)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'))
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchLessonsByChapter(user.level, chapterId)
        console.log('Chapter data:', response.data)
        setLessonsData(response.data.chapter.lessons)  // ← get the lessons array
      } catch (error) {
        console.log("Error fetching chapter", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const currentLesson = lessonsData?.lessons?.[currentLessonIndex];
  const totalLessons = lessonsData?.lessons?.length || 0;

  useEffect(() => {
    if (totalLessons > 0) {
      setProgress(Math.round(((currentLessonIndex) / totalLessons) * 100));
    }
  }, [currentLessonIndex, totalLessons]);

  return (
    <div className="min-h-screen bg-[#FCF8F5] font-sans text-[#1C1917] pb-24">
      <header className="sticky top-0 bg-white border-b border-gray-100 z-50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            // onClick={() => navigate('/journey')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#A33D18] transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-[#42B0D5]">
              Unit {chapterId.split('_')[1] || ''}
            </span>
            <div className="h-8 w-px bg-gray-200" />
            <span className="font-bold text-lg">{lessonsData?.title}</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle size={20} />
            <span className="font-medium">{currentLessonIndex + 1}/{totalLessons}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto px-6 pb-4">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#A33D18] to-[#42B0D5] rounded-full"
            />
          </div>
        </div>
      </header>
    </div>
  )
}

export default Lessons