import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateScenario } from '../services/authService';
import { 
  ArrowLeft, 
  Sparkles, 
  Globe, 
  Loader2, 
  ArrowRight, 
  MessageSquare,
  Clock,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const examples = [
  "I'm at a remote village in Mexico and want to buy a cold drink from a local shop",
  "I need to ask for directions to the train station in Paris",
  "I'm at a local market in Tokyo trying to negotiate the price of a souvenir",
  "I checked into the wrong hotel room and need to explain to the front desk",
  "I'm at a pharmacy in Spain trying to describe my symptoms to the pharmacist",
  "I want to compliment a chef at a small restaurant in Italy about the food",
];

const ScenarioPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const language = user?.targetLanguage || 'Spanish';

  const [situation, setSituation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const charCount = situation.length;
  const isReady = situation.trim().length >= 20 && !isGenerating;

  const handleGenerate = async () => {
    if (situation.trim().length < 20) {
      setError('Please describe your situation in a bit more detail — at least 20 characters.');
      return;
    }
    setError('');
    setIsGenerating(true);
    try {
      const response = await generateScenario({ situation, language });
      navigate('/scenario/session', {
        state: {
          script: response.data.script,
          situation,
        },
      });
    } catch (err) {
      setError('Something went wrong generating your scenario. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-[#FCF8F5] font-sans text-[#1C1917] flex flex-col">

      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 bg-[#FCF8F5]/90 backdrop-blur-md border-b border-gray-200 px-4 md:px-8 py-3 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/journey')}
            className="group flex items-center gap-2 text-gray-500 hover:text-[#eb5e28] transition-colors font-medium bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:border-[#eb5e28]/30"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Back</span>
          </button>

          {/* Language Badge */}
          <div className="flex items-center gap-2 bg-[#FFF5EE] border border-[#FCEAE1] px-4 py-2 rounded-full shadow-sm">
            <Globe size={16} className="text-[#eb5e28]" />
            <span className="text-sm font-bold text-[#eb5e28]">{language}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="mb-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFF5EE] to-white border border-[#FCEAE1] px-4 py-1.5 rounded-full mb-6 shadow-sm">
              <Sparkles size={16} className="text-[#eb5e28]" fill="currentColor" />
              <span className="text-xs font-extrabold text-[#eb5e28] uppercase tracking-widest">AI Practice Area</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-[#1C1917]">
              Design your scenario
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto sm:mx-0">
              Tell us where you are and what you need to do. We'll instantly build a realistic, context-aware environment for you to practice in.
            </p>
          </motion.div>

          {/* Text Input Area */}
          <motion.div variants={itemVariants} className="mb-10">
            <div className={`relative bg-white rounded-3xl p-1 transition-all duration-300 shadow-sm ${
              error ? 'border-2 border-red-300 shadow-red-100' :
              situation.length > 0 ? 'border-2 border-[#eb5e28] shadow-[#eb5e28]/10' :
              'border-2 border-transparent shadow-md focus-within:border-[#eb5e28]/50 focus-within:shadow-xl'
            }`}>
              <div className="absolute top-5 left-5 text-gray-400">
                <MessageSquare size={20} />
              </div>
              <textarea
                value={situation}
                onChange={(e) => {
                  setSituation(e.target.value);
                  if (error) setError('');
                }}
                disabled={isGenerating}
                placeholder="e.g. I'm at a small café in Barcelona and want to order breakfast and ask the waiter for a local recommendation..."
                rows={5}
                maxLength={250}
                className="w-full pl-12 pr-6 py-5 bg-transparent rounded-3xl text-[#1C1917] text-lg font-medium placeholder-gray-300 focus:outline-none resize-none disabled:opacity-50"
              />
              
              {/* Dynamic Character Counter / Progress */}
              <div className="px-6 pb-4 flex items-center justify-between">
                <div className="flex-1 mr-6 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${charCount >= 20 ? 'bg-[#eb5e28]' : 'bg-gray-300'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((charCount / 20) * 100, 100)}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                <span className={`text-xs font-bold transition-colors ${charCount >= 20 ? 'text-[#eb5e28]' : 'text-gray-400'}`}>
                  {charCount} / 250
                </span>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="text-sm font-semibold text-red-500 mt-3 px-2 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Inspiration / Examples */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gray-200" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Need inspiration?</p>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
              {examples.map((example, i) => (
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  key={i}
                  onClick={() => {
                    setSituation(example);
                    setError('');
                  }}
                  disabled={isGenerating}
                  className="text-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 font-medium
                             hover:border-[#eb5e28]/40 hover:text-[#eb5e28] hover:bg-[#FFF5EE] hover:shadow-sm
                             transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {example.length > 50 ? example.slice(0, 50) + '…' : example}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Settings Summary Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#FCF8F5] flex items-center justify-center text-[#eb5e28]">
                <Target size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Level</p>
                <p className="text-sm font-extrabold text-[#1C1917] capitalize">{(user?.level || 'Beginner').toLowerCase()}</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#FCF8F5] flex items-center justify-center text-[#eb5e28]">
                <Globe size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Language</p>
                <p className="text-sm font-extrabold text-[#1C1917]">{language}</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#FCF8F5] flex items-center justify-center text-[#eb5e28]">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Duration</p>
                <p className="text-sm font-extrabold text-[#1C1917]">~5 mins</p>
              </div>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div variants={itemVariants} className="relative">
            <motion.button
              whileHover={isReady ? { scale: 1.02 } : {}}
              whileTap={isReady ? { scale: 0.98 } : {}}
              onClick={handleGenerate}
              disabled={!isReady}
              className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-extrabold text-lg transition-all duration-300 relative overflow-hidden ${
                isReady
                  ? 'bg-gradient-to-r from-[#eb5e28] to-[#d4521e] text-white shadow-xl shadow-[#eb5e28]/30 hover:shadow-2xl hover:shadow-[#eb5e28]/40 border-none'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
              }`}
            >
              {/* Shine effect on ready button */}
              {isReady && !isGenerating && (
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine" />
              )}

              {isGenerating ? (
                <>
                  <Loader2 size={24} className="animate-spin text-white" />
                  <span>Building your scenario...</span>
                </>
              ) : (
                <>
                  <Sparkles size={22} className={isReady ? "text-white" : "text-gray-400"} fill={isReady ? "currentColor" : "none"} />
                  <span>Generate AI Scenario</span>
                  <ArrowRight size={22} className={isReady ? "text-white" : "text-gray-400"} />
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {isGenerating && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 right-0 text-center text-sm font-medium text-gray-500 mt-4 animate-pulse"
                >
                  Give us a few seconds to set up your practice environment...
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

        </motion.div>
      </main>

      {/* Shine Animation Keyframes (added via style tag for simplicity without modifying tailwind config) */}
      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          20% { left: 200%; }
          100% { left: 200%; }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default ScenarioPage;