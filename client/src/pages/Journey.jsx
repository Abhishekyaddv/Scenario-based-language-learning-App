import React, { useEffect, useState } from 'react';
import { fetchChapters, fetchProgress } from '../services/authService';
import { Check, Play, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import LearnWithAi from '../components/LearnWithAi';
import Profileviewer from '../components/Profileviewer';
import { useNavigate } from "react-router-dom";

const Journey = () => {
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [chaptersRes, progressRes] = await Promise.all([
          fetchChapters(user.level),
          fetchProgress(),
        ]);

        const levelData = chaptersRes.data.find(
          (item) => item.level.toLowerCase() === user.level.toLowerCase()
        );

        setChapters(levelData?.chapters ?? []);
        setProgress(progressRes.data.progress);
      } catch (err) {
        setError('Failed to load data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [user.level]);

  const getChapterStatus = (chapter, index) => {
    if (index === 0) return 'unlocked';

    if (progress?.completedChapters.includes(chapter.id)) return 'completed';

    const previousChapter = chapters[index - 1];
    if (progress?.completedChapters.includes(previousChapter?.id)) return 'unlocked';

    return 'locked';
  };

  const completedCount = chapters.filter((ch, i) =>
    getChapterStatus(ch, i) === 'completed'
  ).length;

  const progressPercent = chapters.length
    ? Math.round((completedCount / chapters.length) * 100)
    : 0;

    const handleStart = (chapter) =>{
      if (!chapter?.id) {
      console.error("Invalid chapter");
      return;
    }
      navigate(`/lessons/${chapter.id}`);
    }

  return (
    <div className="min-h-screen bg-[#FCF8F5] font-sans text-[#1C1917] flex">
      {/* Sidebar */}
      <Profileviewer />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-5xl font-extrabold tracking-tighter">Your Journey</h1>
              <div className="hidden md:flex items-center gap-3 bg-white px-6 py-2 rounded-3xl shadow-sm">
                <span className="text-sm font-medium">Level {user.level}</span>
                <div className="h-2 w-28 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A33D18] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-[#A33D18]">{progressPercent}%</span>
              </div>
            </div>
            <p className="text-gray-600 max-w-md mx-auto md:mx-0">
              Mastering Spanish • Keep the streak alive!
            </p>
          </div>

          {/* Path Container */}
          <div className="relative max-w-2xl mx-auto">
            {/* Background subtle path line */}
            <div className="absolute left-1/2 top-12 bottom-12 w-1 bg-gradient-to-b from-[#E5E5E5] via-[#D1D5DB] to-[#E5E5E5] -translate-x-1/2 rounded-full hidden md:block" />

            {isLoading ? (
              <div className="text-center py-20 text-gray-500">Loading your journey...</div>
            ) : error ? (
              <div className="text-center py-20 text-red-500">{error}</div>
            ) : (
              chapters.map((chapter, index) => {
                const status = getChapterStatus(chapter, index);
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center gap-8 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Connecting Dot / Line (mobile hidden) */}
                    {index !== 0 && (
                      <div className="absolute left-1/2 top-[-60px] h-16 w-px bg-[#E5E5E5] md:hidden" />
                    )}

                    {/* Chapter Circle */}
                    <motion.button
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (status !== 'locked') {
                          setSelectedChapter(chapter);
                          handleStart?.(chapter);        // ← add your handleStart here
                        }
                      }}
                      className={`relative z-10 flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full border-8 border-[#FCF8F5] shadow-xl flex items-center justify-center transition-all duration-300
                        ${
                          status === 'completed'
                            ? 'bg-[#A33D18] text-white'
                            : status === 'unlocked'
                            ? 'bg-white border-[#d55d42] shadow-[#d55d42]/30'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      {status === 'completed' && <Check size={36} strokeWidth={4} />}
                      {status === 'unlocked' && <Play size={36} strokeWidth={3} className="text-[#d57142]" />}
                      {status === 'locked' && <Lock size={36} strokeWidth={3} />}
                    </motion.button>

                    {/* Chapter Card */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl transition-all"
                      onClick={() => status !== 'locked' && setSelectedChapter(chapter)}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1 text-xs font-bold tracking-widest bg-[#42B0D5]/10 text-[#d55d42] rounded-full">
                          UNIT {index + 1}
                        </span>
                        {status === 'completed' && (
                          <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                            ✓ Completed
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl font-bold mb-3 leading-tight">{chapter.title}</h2>
                      <p className="text-gray-600 leading-relaxed">{chapter.description}</p>

                      {status === 'unlocked' && (
                        <div className="mt-6 inline-flex items-center gap-2 text-[#d55d42] font-medium text-sm">
                          {/* Start lesson <Play size={18} /> */}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Learn with AI */}
      <div className="hidden xl:block w-96 border-l border-gray-100 bg-white">
        <LearnWithAi />
      </div>

      {/* Chapter Preview Modal (Interactive touch) */}
      {selectedChapter && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-4">{selectedChapter.title}</h3>
            <p className="text-gray-600 mb-8">{selectedChapter.description}</p>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedChapter(null)}
                className="flex-1 py-4 rounded-2xl border border-gray-300 font-medium"
              >
                Close
              </button>
              <button className="flex-1 py-4 bg-[#A33D18] text-white rounded-2xl font-semibold hover:bg-[#8C2F12] transition-colors">
                Start Unit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Journey;