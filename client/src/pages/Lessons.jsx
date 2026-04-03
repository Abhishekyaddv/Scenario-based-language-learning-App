import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { fetchLessonsByChapter } from '../services/authService'  // ← new function
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MultipleChoice from '../components/MultipleChoice';
import Translate from '../components/Translate';
import FillBlank from '../components/FillBlank';
import Results from '../components/Results';
import LearningView from '../components/LearningView';

const Lessons = () => {
  const { chapterId } = useParams()
  const [lessonsData, setLessonsData] = useState(null)      // null not []
  const [isLoading, setIsLoading] = useState(true)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [isNextEnabled, setIsNextEnabled] = useState(false)
  const [isLearningPhase, setIsLearningPhase] = useState(true)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const navigate = useNavigate();
  
  // these derive from lessonsData automatically
  const lessons = lessonsData?.lessons || []
  const currentLesson = lessons[currentLessonIndex]
  const totalLessons = lessons.length


  
  useEffect(() => {
    const loadData = async () => {
      try {
        const targetLanguage = user.targetLanguage || 'Spanish';
        const response = await fetchLessonsByChapter(targetLanguage, user.level, chapterId)
        console.log('Chapter data:', response.data)
        setLessonsData(response.data.chapter)  // ← get the lessons array
      } catch (error) {
        console.log("Error fetching chapter", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])


  useEffect(() => {
    if (totalLessons > 0) {
      setProgress(Math.round(((currentLessonIndex) / totalLessons) * 100));
    }
  }, [currentLessonIndex, totalLessons]);

  const handleAnswer = (isCorrect) => {
  if (isCorrect) setScore(prev => prev + 1)
    setIsNextEnabled(true)

}

const handleNext = () => {
  setIsNextEnabled(false)
  if (currentLessonIndex + 1 >= totalLessons) {
    setIsFinished(true)
  } else {
    setCurrentLessonIndex(prev => prev + 1)
    setIsLearningPhase(true)
  }
}

  const renderExercise = () => {
    if (!currentLesson) return null

    if (currentLesson.type === 'vocabulary') {
      return <MultipleChoice lesson={currentLesson} onAnswer={handleAnswer} />
    }
    if (currentLesson.type === 'fill_blank') {
      return <FillBlank lesson={currentLesson} onAnswer={handleAnswer} />
    }
    if (currentLesson.type === 'translate') {
      return <Translate lesson={currentLesson} onAnswer={handleAnswer} />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FCF8F5] flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading chapter...</p>
      </div>
    );
  }

  const getConceptsForCurrentLesson = () => {
    if (!lessonsData?.learningMaterial?.concepts) return [];
    const concepts = lessonsData.learningMaterial.concepts;
    const numConcepts = concepts.length;
    const numLessons = totalLessons || 1;
    
    if (numConcepts === 0) return [];
    
    // Distribute concepts as evenly as possible
    const baseCount = Math.floor(numConcepts / numLessons);
    const remainder = numConcepts % numLessons;
    
    let startIndex = 0;
    for (let i = 0; i < currentLessonIndex; i++) {
        startIndex += baseCount + (i < remainder ? 1 : 0);
    }
    const count = baseCount + (currentLessonIndex < remainder ? 1 : 0);
    
    return concepts.slice(startIndex, startIndex + count);
  };

  // Render the Learning View first if data exists
  const currentConcepts = getConceptsForCurrentLesson();
  const shouldShowLearning = isLearningPhase && currentConcepts.length > 0;

  if (shouldShowLearning) {
    return (
      <div className="min-h-screen bg-[#FCF8F5] font-sans text-[#1C1917]">
        <header className="bg-white border-b border-gray-100 z-50 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => navigate('/journey')}
              className="flex items-center gap-2 text-gray-600 hover:text-[#eb5e28] transition-colors"
            >
              <ArrowLeft size={24} />
              <span className="font-medium hover:underline flex items-center h-full">Back to Journey</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[#eb5e28]">
                Unit {chapterId.split('_')[1] || ''}
              </span>
            </div>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </header>

        <div className="max-w-4xl mx-auto py-8 md:py-12">
          <LearningView 
            learningMaterial={{
                title: lessonsData.learningMaterial.title,
                intro: currentLessonIndex === 0 ? lessonsData.learningMaterial.intro : '',
                concepts: currentConcepts
            }}
            onStart={() => setIsLearningPhase(false)} 
            isFirstPart={currentLessonIndex === 0}
            user={user}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF8F5] font-sans text-[#1C1917] pb-24">
      <header className="sticky top-0 bg-white border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() =>navigate('/journey')}
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

       <div className="max-w-2xl mx-auto px-6 pt-8">

      {!isFinished && renderExercise()}

      {!isFinished &&  (
        <div className="flex justify-center mt-8 w-full">
        <button onClick={handleNext} disabled={!isNextEnabled} className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-xl px-4 py-2.5 focus:outline-none transition-colors w-full max-w-xs">
          Next
        </button>
        </div>
      )}

      {isFinished && ( Results ? <Results 
      isFinished={isFinished} 
      score={score} 
      totalLessons={totalLessons} 
      chapterId={chapterId}        // ← pass it down
      lessonsData={lessonsData}
      onBackToJourney={() => navigate('/journey')}
      onRetry={() => {
        setCurrentLessonIndex(0)
        setScore(0)
        setIsFinished(false)
        setIsNextEnabled(false)
      }} /> :
        <div>
          <h2>Lesson Complete!</h2>
          <p>Score: {score} / {totalLessons}</p>
        </div>
      )}
    </div>
    </div>

    
  )
}

export default Lessons