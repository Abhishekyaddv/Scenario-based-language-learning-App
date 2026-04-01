import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateScenario } from '../services/authService';
import { 
  ArrowLeft, 
  Sparkles, 
  Globe, 
  Loader2, 
  ArrowRight, 
  Clock,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GeneratingModal from '../components/GeneratingModal';

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
      setError('Something went wrong generating your scenario. Please try again after some time.');
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
    <>
      {/* ── Dino Game Loading Modal ── */}
      <GeneratingModal isOpen={isGenerating} />

      <div className="min-h-screen bg-[#FCF8F5] font-sans text-[#1C1917] flex flex-col relative overflow-hidden">

      {/* ── Warm animated background orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(235,94,40,0.40), transparent)',
          top: '-15%', left: '-12%', filter: 'blur(80px)',
          animation: 'orb-float-1 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 550, height: 550, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,162,97,0.40), transparent)',
          bottom: '0%', right: '-8%', filter: 'blur(80px)',
          animation: 'orb-float-2 15s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(247,197,159,0.30), transparent)',
          top: '35%', right: '15%', filter: 'blur(60px)',
          animation: 'orb-float-3 18s ease-in-out infinite',
        }} />
      </div>

      {/* ── Floating Pill Navbar ── */}
      <div className="w-full pt-5 px-4 relative z-50">
        <nav
          className="max-w-3xl mx-auto flex items-center justify-between px-3 py-2.5"
          style={{
            background: 'rgba(255,252,242,0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(204,197,185,0.45)',
            borderRadius: 999,
            boxShadow: '0 4px 20px rgba(37,36,34,0.07)',
          }}
        >
          <button
            onClick={() => navigate('/journey')}
            className="group flex items-center gap-2 text-gray-500 hover:text-[#eb5e28] transition-colors font-medium px-3 py-1.5 rounded-full hover:bg-[#FFF5EE]"
          >
            <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-semibold">Back</span>
          </button>

          {/* Language Badge */}
          <div className="flex items-center gap-2 bg-[#FFF5EE] border border-[#FCEAE1] px-4 py-1.5 rounded-full">
            <Globe size={15} className="text-[#eb5e28]" />
            <span className="text-sm font-bold text-[#eb5e28]">{language}</span>
          </div>
        </nav>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full"
        >

          {/* ── Hero Header ── */}
          <motion.div variants={itemVariants} className="mb-10 text-center">
            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFF5EE] to-white border border-[#FCEAE1] px-4 py-1.5 rounded-full mb-7 shadow-sm">
              <Sparkles size={14} className="text-[#eb5e28]" fill="currentColor" />
              <span className="text-[11px] font-extrabold text-[#eb5e28] uppercase tracking-widest">AI Practice Area</span>
            </div>

            {/* Large headline */}
            <h1
              className="font-black tracking-tight mb-5 text-[#1C1917] leading-[1.05]"
              style={{ fontSize: 'clamp(42px, 7vw, 72px)' }}
            >
              Design your<br />
              <span style={{
                background: 'linear-gradient(135deg, #eb5e28 0%, #f4a261 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                scenario.
              </span>
            </h1>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-lg mx-auto font-normal">
              Tell us where you are and what you need to do. We'll instantly build a realistic,
              context-aware environment for you to practice in.
            </p>
          </motion.div>

          {/* ── Example chips — flex-wrap multi-row ── */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">Need inspiration?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {examples.map((example, i) => (
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  key={i}
                  onClick={() => {
                    setSituation(example);
                    setError('');
                  }}
                  disabled={isGenerating}
                  className="text-xs px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-500 font-semibold hover:border-[#eb5e28]/40 hover:text-[#eb5e28] hover:bg-[#FFF5EE] transition-all disabled:opacity-40 disabled:cursor-not-allowed text-left"
                >
                  {example.length > 48 ? example.slice(0, 48) + '…' : example}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── Main Input Card ── */}
          <motion.div variants={itemVariants} className="mb-6">
            <div
              className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 ${
                error
                  ? 'border-2 border-red-300 shadow-lg shadow-red-100/60'
                  : situation.length > 0
                  ? 'border-2 border-[#eb5e28]/60 shadow-xl shadow-[#eb5e28]/8'
                  : 'border border-gray-100 shadow-lg hover:shadow-xl focus-within:border-[#eb5e28]/40 focus-within:shadow-xl'
              }`}
            >
              {/* Card label row */}
              <div className="flex items-center gap-2 px-6 pt-5 pb-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your situation</span>
                {charCount >= 20 && (
                  <span className="text-[10px] font-bold text-[#eb5e28] bg-[#FFF5EE] px-2 py-0.5 rounded-full">
                    ✓ Ready
                  </span>
                )}
              </div>

              {/* Textarea — no left padding icon offset */}
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
                className="w-full px-6 py-4 bg-transparent text-[#1C1917] text-base md:text-lg font-normal placeholder-gray-300 focus:outline-none resize-none disabled:opacity-50 leading-relaxed"
              />

              {/* Divider */}
              <div className="mx-6 border-t border-gray-100" />

              {/* Progress bar + char counter row */}
              <div className="px-6 py-3 flex items-center gap-5">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${charCount >= 20 ? 'bg-[#eb5e28]' : 'bg-gray-300'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((charCount / 20) * 100, 100)}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
                <span className={`text-xs font-bold tabular-nums transition-colors ${charCount >= 20 ? 'text-[#eb5e28]' : 'text-gray-400'}`}>
                  {charCount} / 250
                </span>
              </div>

              {/* Divider */}
              <div className="mx-6 border-t border-gray-100" />

              {/* Bottom action row — context info LEFT, generate button RIGHT */}
              <div className="px-5 py-4 flex items-center justify-between gap-4">
                {/* Context chips */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-[#FCF8F5] border border-gray-100 px-3 py-1.5 rounded-full">
                    <Globe size={13} className="text-[#eb5e28]" />
                    <span className="text-xs font-bold text-[#1C1917]">{language}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#FCF8F5] border border-gray-100 px-3 py-1.5 rounded-full">
                    <Target size={13} className="text-[#eb5e28]" />
                    <span className="text-xs font-bold text-[#1C1917] capitalize">{(user?.level || 'Beginner').toLowerCase()}</span>
                  </div>
                  <div className="items-center gap-1.5 bg-[#FCF8F5] border border-gray-100 px-3 py-1.5 rounded-full hidden sm:flex">
                    <Clock size={13} className="text-[#eb5e28]" />
                    <span className="text-xs font-bold text-[#1C1917]">~5 mins</span>
                  </div>
                </div>

                {/* Generate pill button */}
                <motion.button
                  whileHover={isReady ? { scale: 1.03 } : {}}
                  whileTap={isReady ? { scale: 0.97 } : {}}
                  onClick={handleGenerate}
                  disabled={!isReady}
                  className={`relative flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden ${
                    isReady
                      ? 'bg-gradient-to-r from-[#eb5e28] to-[#d4521e] text-white shadow-lg shadow-[#eb5e28]/30 hover:shadow-xl hover:shadow-[#eb5e28]/40'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {/* Shine effect */}
                  {isReady && !isGenerating && (
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine" />
                  )}

                  {isGenerating ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Building...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} className={isReady ? 'text-white' : 'text-gray-400'} fill={isReady ? 'currentColor' : 'none'} />
                      <span>Generate</span>
                      <ArrowRight size={15} className={isReady ? 'text-white' : 'text-gray-400'} />
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-semibold text-red-500 mt-3 px-2 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Generating message */}
            <AnimatePresence>
              {isGenerating && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm font-medium text-gray-400 mt-4 animate-pulse"
                >
                  Give us a few seconds to set up your practice environment...
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

        </motion.div>
      </main>

      {/* Keyframes */}
      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          20% { left: 200%; }
          100% { left: 200%; }
        }
        .animate-shine { animation: shine 3s infinite; }

        @keyframes orb-float-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.9; }
          33%       { transform: translate(40px, 30px) scale(1.08); opacity: 1; }
          66%       { transform: translate(-20px, 50px) scale(0.95); opacity: 0.8; }
        }
        @keyframes orb-float-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.9; }
          40%       { transform: translate(-50px, -30px) scale(1.1); opacity: 1; }
          70%       { transform: translate(30px, -50px) scale(0.92); opacity: 0.75; }
        }
        @keyframes orb-float-3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(-30px, 40px) scale(1.12); }
        }
      `}</style>
    </div>
    </>
  );
};

export default ScenarioPage;