import React, { useEffect, useState } from 'react';
import { fetchChapters, fetchProgress } from '../services/authService';
import { Check, Play, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import LearnWithAi from '../components/LearnWithAi';
import { ProfileAvatar, ProfileModal } from '../components/Profileviewer';
import { useNavigate } from "react-router-dom";

const Journey = () => {
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [chaptersRes, progressRes] = await Promise.all([
          fetchChapters(user.level),
          fetchProgress(),
        ]);

        const data = chaptersRes.data;

        // Handle both response shapes
        let levelData;
        if (Array.isArray(data)) {
          levelData = data.find(
            (item) => item.level.toLowerCase() === user.level.toLowerCase()
          );
        } else if (data.level?.toLowerCase() === user.level.toLowerCase()) {
          levelData = data;
        } else {
          levelData = data;
        }

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

  const handleStart = (chapter) => {
    if (!chapter?.id) {
      console.error("Invalid chapter");
      return;
    }
    navigate(`/lessons/${chapter.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FCF8F5] font-sans text-[#1C1917] flex flex-col">
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      <div className="w-full pt-6 px-4">
        {/* Floating pill container matching the reference design */}
        <nav className="max-w-5xl mx-auto bg-white rounded-full px-4 md:px-3 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center justify-between sticky top-0 z-40">
          
          {/* Left Side: Avatar & Title (Styled to replace the logo) */}
          <div className="flex items-center gap-3 pl-2">
            {/* Wrapped in the reference's purple theme color */}
            <div className="text-[#8B5CF6]">
              <ProfileAvatar onClick={() => setIsProfileOpen(true)} className="cursor-pointer" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-gray-900 hidden sm:block">
              Your Journey
            </h1>
          </div>
          
          {/* Right Side: Level & Progress (Styled as the purple 'Free Trial' button) */}
          <div className="flex items-center gap-3 bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors text-white px-5 py-2 rounded-full shadow-sm cursor-default">
            <span className="text-sm font-medium whitespace-nowrap">Level {user.level || 1}</span>
            
            {/* Progress Bar styled with semi-transparent white */}
            <div className="hidden sm:block h-1.5 w-16 md:w-20 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            <span className="text-sm font-bold">{progressPercent}%</span>
          </div>

        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 overflow-x-hidden">
        
        {/* Merged Interactive Learn With AI Banner */}
        <LearnWithAi />

        {/* Path Container */}
        <div className="relative mx-auto mt-4">

          {/* ── Animated Timeline Line (Desktop Only) ── */}
          <style>{`
            @keyframes pulse-timeline {
              0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
              50%       { transform: translate(-50%, -50%) scale(2.4); opacity: 0; }
            }
          `}</style>

          <div className="absolute left-1/2 top-8 bottom-12 w-1.5 -translate-x-1/2 hidden md:block">

            {/* Layer 1 — full-height gray track */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#E5E5E5] via-[#D1D5DB] to-[#E5E5E5]" />

            {/* Layer 2 — orange fill, grows from top based on completion */}
            {progressPercent > 0 && (
              <div
                className="absolute top-0 left-0 right-0 rounded-full"
                style={{
                  height: `${progressPercent}%`,
                  background: 'linear-gradient(to bottom, #eb5e28, #f4a261)',
                  transition: 'height 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            )}

            {/* Layer 3 — pulsing tip dot at the bottom edge of the fill */}
            {progressPercent > 0 && progressPercent < 100 && (
              <div
                className="absolute"
                style={{ top: `${progressPercent}%`, left: '50%' }}
              >
                {/* Expanding pulse ring */}
                <div
                  style={{
                    position: 'absolute',
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(235, 94, 40, 0.28)',
                    animation: 'pulse-timeline 2s ease-in-out infinite',
                  }}
                />
                {/* Inner solid dot */}
                <div
                  style={{
                    position: 'absolute',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: '#eb5e28',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 0 3px rgba(235, 94, 40, 0.2), 0 2px 8px rgba(235, 94, 40, 0.4)',
                  }}
                />
              </div>
            )}

            {/* When 100% complete — solid dot at the bottom, no pulse */}
            {progressPercent === 100 && (
              <div
                className="absolute"
                style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: '#eb5e28',
                    boxShadow: '0 0 0 4px rgba(235, 94, 40, 0.2)',
                  }}
                />
              </div>
            )}

          </div>

          {isLoading ? (
            <div className="text-center py-20 text-gray-500 font-medium animate-pulse">Loading your path...</div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 font-medium">{error}</div>
          ) : (
            chapters.map((chapter, index) => {
              const status = getChapterStatus(chapter, index);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className={`relative mb-6 md:mb-20 flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Separate Chapter Circle for DESKTOP ONLY */}
                  <motion.button
                    whileHover={{ scale: status !== 'locked' ? 1.08 : 1 }}
                    whileTap={{ scale: status !== 'locked' ? 0.95 : 1 }}
                    onClick={() => {
                      if (status !== 'locked') {
                        setSelectedChapter(chapter);
                        handleStart?.(chapter);
                      }
                    }}
                    className={`hidden md:flex relative z-10 flex-shrink-0 w-24 h-24 rounded-full border-8 border-[#FCF8F5] shadow-lg items-center justify-center transition-all duration-300
                      ${
                        status === 'completed'
                          ? 'bg-[#A33D18] text-white'
                          : status === 'unlocked'
                          ? 'bg-white border-[#d55d42] shadow-[#d55d42]/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                  >
                    {status === 'completed' && <Check size={32} strokeWidth={4} />}
                    {status === 'unlocked' && <Play size={32} strokeWidth={3} className="text-[#d57142] ml-1" />}
                    {status === 'locked' && <Lock size={30} strokeWidth={3} />}
                  </motion.button>

                  {/* Chapter Card */}
                  <motion.div
                    whileHover={status !== 'locked' ? { scale: 1.02, y: -2 } : {}}
                    className={`flex-1 w-full bg-white rounded-3xl p-5 sm:p-8 border border-gray-100 transition-all ${
                      status !== 'locked' ? 'cursor-pointer shadow-sm hover:shadow-xl' : 'opacity-75'
                    }`}
                    onClick={() => status !== 'locked' && setSelectedChapter(chapter)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 text-[10px] sm:text-xs font-bold tracking-widest rounded-full ${
                            status === 'locked' ? 'bg-gray-100 text-gray-500' : 'bg-[#42B0D5]/10 text-[#d55d42]'
                          }`}>
                            UNIT {index + 1}
                          </span>
                          {status === 'completed' && (
                            <span className="text-emerald-600 text-xs sm:text-sm font-bold flex items-center gap-1">
                              ✓ Completed
                            </span>
                          )}
                        </div>

                        <h2 className={`text-xl sm:text-2xl font-bold mb-2 leading-tight ${status === 'locked' ? 'text-gray-500' : 'text-[#1C1917]'}`}>
                          {chapter.title}
                        </h2>
                      </div>

                      {/* Integrated Action Button for MOBILE ONLY */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents double firing with the card click
                          if (status !== 'locked') {
                            setSelectedChapter(chapter);
                            handleStart?.(chapter);
                          }
                        }}
                        className={`md:hidden flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          status === 'completed' ? 'bg-[#A33D18] text-white shadow-md' :
                          status === 'unlocked' ? 'bg-white border-[3px] border-[#d55d42] shadow-md shadow-[#d55d42]/20' :
                          'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {status === 'completed' && <Check size={24} strokeWidth={4} />}
                        {status === 'unlocked' && <Play size={24} strokeWidth={3} className="text-[#d57142] ml-1" />}
                        {status === 'locked' && <Lock size={22} strokeWidth={3} />}
                      </button>
                    </div>

                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-1">
                      {chapter.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })
          )}
        </div>
      </main>

      {/* Chapter Preview Modal */}
      {selectedChapter && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full p-6 sm:p-8 shadow-2xl"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-[#1C1917]">{selectedChapter.title}</h3>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">{selectedChapter.description}</p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => setSelectedChapter(null)}
                className="w-full sm:w-1/2 py-3.5 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => handleStart(selectedChapter)}
                className="w-full sm:w-1/2 py-3.5 bg-[#A33D18] text-white rounded-2xl font-bold hover:bg-[#8C2F12] shadow-lg shadow-[#A33D18]/20 transition-all active:scale-95"
              >
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