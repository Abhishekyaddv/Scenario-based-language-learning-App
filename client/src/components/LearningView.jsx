import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, CheckCircle2, Volume2 } from 'lucide-react';

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

const LearningView = ({ learningMaterial, onStart, isFirstPart = true, user = {} }) => {
  if (!learningMaterial) return null;

  const handleTTS = (text) => {
    const lang = languageMap[user?.targetLanguage] || 'es-ES';
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full h-full flex items-center justify-center p-4 md:p-8"
    >
      <div className="max-w-3xl w-full bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col">
        {/* Header Section */}
        <div className="relative px-8 md:px-12 pt-12 pb-14 overflow-hidden" style={{ background: 'linear-gradient(135deg, #eb5e28, #f4a261)' }}>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <BookOpen size={180} />
          </div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold tracking-wide backdrop-blur-md mb-6">
              <Sparkles size={16} />
              <span>LEARNING MODULE</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {learningMaterial.title}
            </h1>
            {learningMaterial.intro && (
              <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                {learningMaterial.intro}
              </p>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="px-8 md:px-12 py-10 bg-[#FCF8F5] flex-1">
          <div className="mb-8 flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#252422]">Key Concepts to Learn</h2>
            <div className="h-px bg-gray-200 flex-1 ml-4" />
          </div>

          <div className="grid gap-4 md:gap-5">
            {learningMaterial.concepts?.map((concept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm flex gap-4 hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                {/* Subtle left border accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#eb5e28] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 size={24} className="text-[#eb5e28] stroke-[2.5px]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-[#252422] leading-snug">
                      {concept.term}
                    </h3>
                    <button 
                      onClick={() => handleTTS(concept.term)}
                      className="p-1.5 text-gray-400 hover:text-[#eb5e28] hover:bg-[#eb5e28]/10 rounded-full transition-colors flex-shrink-0 focus:outline-none"
                      title="Listen"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    {concept.explanation}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-8 md:px-12 py-8 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-sm font-medium text-gray-500 text-center sm:text-left">
            {isFirstPart ? "Read through all concepts? You are ready to practice." : "Review this concept before your next exercise."}
          </div>
          <button
            onClick={onStart}
            className="w-full sm:w-auto relative group overflow-hidden rounded-2xl px-10 py-4 font-bold text-white shadow-lg transition-transform hover:-translate-y-1 active:translate-y-0"
            style={{ background: '#eb5e28' }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
              {isFirstPart ? "Start Exercises" : "Continue Practice"}
              <ArrowRightWrapper />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ArrowRightWrapper = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default LearningView;
