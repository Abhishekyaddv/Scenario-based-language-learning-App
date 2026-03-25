import React, { useEffect, useState } from 'react';
import { fetchChapters, fetchProgress } from '../services/authService'
import { Check,Lock} from 'lucide-react';
import LearnWithAi from '../components/LearnWithAi';
import Profileviewer from '../components/Profileviewer';

const Journey = () => {
  const [chapters, setChapters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(null)

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const loadData = async () => {
      try {
        const [chaptersRes, progressRes] = await Promise.all([
          fetchChapters(user.level),
          fetchProgress()
        ])
        const levelData = chaptersRes.data.find(item => item.level.toLowerCase() === user.level.toLowerCase())

        setChapters(levelData?.chapters ?? [])
        setProgress(progressRes.data.progress)
        // console.log(progressRes);
        

      } catch (error) {
        setError('Failed to load data.', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])


  return (
    <div className="min-h-screen bg-[#FCF8F5] font-sans flex text-[#1C1917]">
      {/* --- SIDEBAR (Profile Viewer) --- */}
      <Profileviewer />

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 p-8 md:p-12 overflow-auto relative">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* LEFT COLUMN: Your Journey */}
          <div className="flex-1">
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Your Journey</h1>
              <p className="text-gray-600 text-sm max-w-sm leading-relaxed">
                Mastering Portuguese. You've completed 42% of your current level. Keep pushing toward fluency.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative pl-16">
              {/* Vertical Dashed Line */}
              <div className="absolute left-[31px] top-6 bottom-16 w-px border-l-2 border-dashed border-[#E5E5E5]"></div>

              {/* Unit 1 - Completed */}
              {!isLoading && chapters?.map((chapter, index) => (
              <div key={chapter.id} className="relative mb-8">
                <div className="absolute -left-16 bg-[#A33D18] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-10 border-4 border-[#FCF8F5]">
                  <Check size={24} strokeWidth={3} />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#42B0D5] uppercase">
                      Unit {index + 1}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-4">{chapter.title}</h2>
                  <p className="text-sm text-gray-500">{chapter.description}</p>
                </div>
              </div>
            ))}
              

              {/* Unit 4 - Locked */}
              <div className="relative">
                <div className="absolute -left-16 bg-[#F3EBE6] text-gray-400 rounded-full w-12 h-12 flex items-center justify-center z-10 border-4 border-[#FCF8F5]">
                  <Lock size={20} />
                </div>
                <div className="bg-[#FBF6F3] p-6 rounded-2xl border border-[#F3EBE6] opacity-70">
                  <div className="mb-2">
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Unit 4</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-400">Complex Narratives</h2>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT COLUMN: Learn with AI */}
          <LearnWithAi />
        </div>
      </div>
    </div>
  );
}

export default Journey