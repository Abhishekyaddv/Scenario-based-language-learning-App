import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, XCircle, Send, Loader2, Sparkles, ChevronRight, Check
} from 'lucide-react';
import { validateFlashcard, saveFlashcardSession } from '../services/authService';

const FlashcardSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const language = user?.targetLanguage || 'Spanish';
  const level = user?.level || 'Beginner';

  const initialCards = location.state?.flashcards || [];
  const topic = location.state?.topic || 'Practice';

  const [cards, setCards] = useState(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentResult, setCurrentResult] = useState(null); // { correct, score, feedback }
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [finalSession, setFinalSession] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!initialCards || initialCards.length === 0) {
      navigate('/flashcards');
    }
  }, [initialCards, navigate]);

  useEffect(() => {
    if (inputRef.current && !currentResult && !isFinished) {
      inputRef.current.focus();
    }
  }, [currentIndex, currentResult, isFinished]);

  const currentCard = cards[currentIndex];

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isEvaluating) return;

    setIsEvaluating(true);
    try {
      const response = await validateFlashcard({
        question: currentCard.question,
        expectedAnswer: currentCard.answer,
        userAnswer: inputValue.trim(),
        language,
        level,
      });

      const validation = response.data.validation;
      setCurrentResult(validation);

      // Update the card in state with the result
      const newCards = [...cards];
      newCards[currentIndex] = {
        ...newCards[currentIndex],
        userAnswer: inputValue.trim(),
        score: validation.score,
        feedback: validation.feedback,
        correct: validation.correct,
      };
      setCards(newCards);

    } catch (err) {
      console.error(err);
      alert('Error validating answer. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInputValue('');
      setCurrentResult(null);
    } else {
      finishSession();
    }
  };

  const finishSession = async () => {
    setIsFinished(true);
    setIsSaving(true);
    try {
      const response = await saveFlashcardSession({
        topic,
        language,
        cards,
      });
      setFinalSession(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to save session, but you can still view your results.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isFinished) {
    const overallScore = finalSession?.overallScore || Math.round(cards.reduce((sum, c) => sum + (c.score || 0), 0) / cards.length);
    const xpEarned = finalSession?.xpEarned || Math.round(overallScore / 10);

    return (
      <div className="min-h-screen bg-[#F0FDF4] font-sans text-[#064e3b] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Confetti / Light beams */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
          <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-[#dcfce7] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/3"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-white rounded-[2.5rem] p-8 sm:p-12 max-w-md w-full shadow-2xl border-2 border-[#bbf7d0] text-center relative z-10"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#16A34A] to-[#22c55e] rounded-full mx-auto flex items-center justify-center shadow-lg shadow-[#16A34A]/40 mb-8 text-white relative">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Check size={48} strokeWidth={4} />
            </motion.div>
          </div>

          <h1 className="text-4xl font-black text-[#064e3b] mb-3">Mastered!</h1>
          <p className="text-[#064e3b]/70 text-lg font-medium mb-10">You finished the <span className="font-bold text-[#16A34A]">{topic}</span> deck.</p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-[#F0FDF4] p-5 rounded-3xl border border-[#bbf7d0] shadow-inner">
              <p className="text-xs text-[#16A34A] font-bold uppercase tracking-widest mb-1">Score</p>
              <p className="text-4xl font-black text-[#064e3b]">{overallScore}%</p>
            </div>
            <div className="bg-[#F0FDF4] p-5 rounded-3xl border border-[#bbf7d0] shadow-inner">
              <p className="text-xs text-[#16A34A] font-bold uppercase tracking-widest mb-1">XP Earned</p>
              <p className="text-4xl font-black text-[#064e3b]">+{xpEarned}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/journey')}
            className="w-full py-4 bg-[#16A34A] text-white rounded-2xl font-black text-lg hover:bg-[#15803d] shadow-xl shadow-[#16A34A]/30 transition-all"
          >
            Return to Journey
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!currentCard) return null;

  return (
    <div className="min-h-screen bg-[#F0FDF4] font-sans text-[#064e3b] flex flex-col relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern-session" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22c55e" strokeWidth="0.5" strokeOpacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-session)" />
        </svg>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#dcfce7] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
      </div>

      {/* Navbar */}
      <div className="w-full pt-6 px-6 relative z-50">
        <nav className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              if(window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
                navigate('/flashcards');
              }
            }}
            className="group flex items-center gap-2 text-[#064e3b] hover:text-red-500 transition-colors font-bold px-4 py-2 rounded-xl bg-white/60 hover:bg-white backdrop-blur-md border border-[#bbf7d0] shadow-sm"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Exit
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm font-black text-[#16A34A] tracking-widest uppercase">
              {currentIndex + 1} / {cards.length}
            </span>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#bbf7d0] px-4 py-2 rounded-xl shadow-sm">
              <span className="text-sm font-black text-[#16A34A] uppercase tracking-wider">{language}</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10 flex flex-col items-center justify-center relative z-10">
        
        {/* Progress Bar */}
        <div className="w-full max-w-lg mb-8 h-2 bg-[#dcfce7] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: ((currentIndex) / cards.length) * 100 + '%' }}
            className="h-full bg-[#16A34A]"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-xl flex flex-col items-center"
          >
            {/* The Flashcard */}
            <div className="w-full bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-[#16A34A]/10 border-2 border-[#bbf7d0] text-center mb-10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#16A34A] to-[#4ade80]"></div>
              
              <div className="mb-6 inline-flex bg-[#F0FDF4] border border-[#bbf7d0] px-4 py-1.5 rounded-full">
                 <span className="text-xs font-black text-[#16A34A] uppercase tracking-widest flex items-center gap-2">
                   <Sparkles size={12} /> Translate to {language}
                 </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-[#064e3b] leading-tight">
                {currentCard.question}
              </h2>
            </div>

            {/* Input / Result Area */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                {!currentResult ? (
                  <motion.form
                    key="input-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="relative"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      disabled={isEvaluating}
                      placeholder={`Type in ${language}...`}
                      className="w-full bg-white px-8 py-5 rounded-2xl text-xl font-bold text-[#064e3b] placeholder-[#16A34A]/40 border-2 border-[#bbf7d0] focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/10 transition-all outline-none pr-16 shadow-lg shadow-[#16A34A]/5"
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isEvaluating}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#16A34A] text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:bg-gray-300 hover:bg-[#15803d] hover:scale-105 active:scale-95 transition-all shadow-md"
                    >
                      {isEvaluating ? <Loader2 size={24} className="animate-spin" /> : <Send size={20} className="ml-[-2px]" />}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="result-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`w-full rounded-[2rem] p-8 border-2 shadow-xl ${
                      currentResult.correct 
                        ? 'bg-emerald-50 border-emerald-300 shadow-emerald-600/10' 
                        : 'bg-red-50 border-red-300 shadow-red-600/10'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      {currentResult.correct ? (
                        <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 mb-4 shadow-sm">
                          <CheckCircle2 size={32} />
                        </div>
                      ) : (
                        <div className="bg-red-100 p-3 rounded-full text-red-600 mb-4 shadow-sm">
                          <XCircle size={32} />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className={`text-2xl font-black ${currentResult.correct ? 'text-emerald-800' : 'text-red-800'}`}>
                          {currentResult.correct ? 'Spot On!' : 'Keep trying.'}
                        </h3>
                        <span className={`text-sm font-black px-3 py-1 rounded-lg ${currentResult.correct ? 'bg-emerald-200 text-emerald-800' : 'bg-red-200 text-red-800'}`}>
                          {currentResult.score}%
                        </span>
                      </div>
                      
                      <p className="text-[#064e3b]/80 font-medium text-lg mb-6">
                        You answered: <span className="italic font-bold text-[#064e3b]">"{inputValue}"</span>
                      </p>
                      
                      <div className="w-full bg-white p-5 rounded-2xl mb-6 border border-gray-100 shadow-sm">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Expected Answer</p>
                        <p className="text-2xl font-bold text-[#064e3b]">{currentCard.answer}</p>
                      </div>
                      
                      <p className="text-[#064e3b] text-base mb-8 flex items-start justify-center gap-2 bg-white/50 px-4 py-3 rounded-xl border border-white">
                        <Sparkles size={18} className="text-amber-500 shrink-0 mt-0.5" />
                        <span className="font-semibold">{currentResult.feedback}</span>
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNext}
                        className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all ${currentResult.correct
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30'
                          : 'bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/30'
                          }`}
                      >
                        {currentIndex < cards.length - 1 ? 'Next Card' : 'Finish Session'} <ChevronRight size={20} strokeWidth={3} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default FlashcardSession;
