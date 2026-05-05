import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateFlashcards } from '../services/authService';
import { 
  ArrowLeft, 
  Sparkles, 
  Globe, 
  Loader2, 
  ArrowRight, 
  Target,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GeneratingModal from '../components/GeneratingModal';

const examplesByLanguage = {
  Spanish: [
    "Ordering food at a local restaurant",
    "Navigating the airport and public transit",
    "Greetings and polite conversational phrases",
    "Shopping for clothes and bargaining",
    "Medical emergencies and pharmacy visits",
    "Booking a hotel room and asking for amenities",
  ],
  French: [
    "Ordering pastries at a boulangerie",
    "Asking for directions to tourist attractions",
    "Introducing yourself and small talk",
    "Buying tickets at a train station",
    "Shopping at a local market",
    "Describing symptoms to a doctor",
  ],
  German: [
    "Ordering beer and food at a Biergarten",
    "Using the U-Bahn and buying tickets",
    "Common greetings and polite phrases",
    "Shopping for souvenirs",
    "Checking into a hotel",
    "Asking for help in an emergency",
  ],
  Italian: [
    "Ordering espresso and pasta",
    "Asking for directions to the museum",
    "Greetings and introductions",
    "Shopping at a local market",
    "Using public transportation",
    "Describing a medical issue",
  ],
  Japanese: [
    "Ordering food at a ramen shop",
    "Asking for directions to the station",
    "Polite greetings and introductions",
    "Shopping at a convenience store",
    "Using the subway system",
    "Apologizing and asking for help",
  ],
  Portuguese: [
    "Ordering coffee and a pastry",
    "Asking for directions to the beach",
    "Greetings and polite phrases",
    "Shopping for groceries",
    "Using public transit",
    "Describing a headache at the pharmacy",
  ],
  Hindi: [
    "Ordering chai and street food",
    "Haggling with an auto-rickshaw driver",
    "Basic greetings and introductions",
    "Shopping at a local bazaar",
    "Asking for train platform information",
    "Medical vocabulary",
  ],
  Mandarin: [
    "Ordering food at a restaurant",
    "Asking for directions",
    "Basic greetings and introductions",
    "Bargaining at a night market",
    "Taking the subway",
    "Describing a cold or illness",
  ],
};

const FlashcardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const language = user?.targetLanguage || 'Spanish';
  const examples = examplesByLanguage[language] || examplesByLanguage['Spanish'];
  const creditsStr = user?.credits;
  const credits = creditsStr !== undefined ? Number(creditsStr) : 0;

  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const charCount = topic.length;
  const isReady = topic.trim().length >= 5 && !isGenerating && credits > 0;

  const handleGenerate = async () => {
    if (topic.trim().length < 5) {
      setError('Please describe your topic in a bit more detail (at least 5 characters).');
      return;
    }
    setError('');
    setIsGenerating(true);
    try {
      const response = await generateFlashcards({ topic, language });
      const newCredits = response.data.credits;
      if (newCredits !== undefined) {
         const updatedUser = { ...user, credits: newCredits };
         localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      navigate('/flashcards/session', {
        state: {
          flashcards: response.data.flashcards,
          topic,
        },
      });
    } catch (err) {
      setError('Something went wrong generating your flashcards. Please try again later.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

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
      <GeneratingModal isOpen={isGenerating} />

      {/* Emerald Theme Background */}
      <div className="min-h-screen bg-[#F0FDF4] font-sans text-[#064e3b] flex flex-col relative overflow-hidden">
        
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22c55e" strokeWidth="0.5" strokeOpacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#dcfce7] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#bbf7d0] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        </div>

        {/* Top Navbar */}
        <div className="w-full pt-6 px-6 relative z-50">
          <nav className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate('/journey')}
              className="group flex items-center gap-2 text-[#064e3b] hover:text-[#16A34A] transition-colors font-bold px-4 py-2 rounded-xl bg-white/60 hover:bg-white backdrop-blur-md border border-[#bbf7d0] shadow-sm"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              Back
            </button>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#bbf7d0] px-4 py-2 rounded-xl shadow-sm">
                <Globe size={16} className="text-[#16A34A]" />
                <span className="text-sm font-black text-[#16A34A] uppercase tracking-wider">{language}</span>
              </div>
            </div>
          </nav>
        </div>

        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            
            {/* Left Column: Header & Intro */}
            <motion.div variants={itemVariants} className="md:col-span-5 text-left">
              <div className="inline-flex items-center gap-2 bg-white border border-[#22c55e]/30 px-4 py-2 rounded-xl mb-6 shadow-sm">
                <Layers size={16} className="text-[#16A34A]" />
                <span className="text-xs font-black text-[#16A34A] uppercase tracking-widest">{credits} Credits Left</span>
              </div>

              <h1
                className="font-black tracking-tight mb-6 text-[#064e3b] leading-[1.1]"
                style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
              >
                Master your <br />
                <span className="text-[#16A34A] relative">
                  vocabulary
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#bbf7d0]" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
              </h1>

              <p className="text-[#064e3b]/70 text-lg leading-relaxed font-medium mb-8">
                Generate custom flashcards tailored to your specific needs. From airport navigation to ordering food, master the words that matter to you.
              </p>

              {credits === 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
                  <h3 className="text-red-800 font-bold mb-1">Out of Credits</h3>
                  <p className="text-red-600 text-sm">
                    You have run out of free tier credits for generation.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Right Column: Input Card & Examples */}
            <motion.div variants={itemVariants} className="md:col-span-7">
              <div
                className={`bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl transition-all duration-300 border-2 ${
                  error
                    ? 'border-red-300 shadow-red-100/60'
                    : topic.length > 0
                    ? 'border-[#16A34A]/50 shadow-[#16A34A]/10'
                    : 'border-transparent shadow-gray-200/50 hover:shadow-2xl hover:border-[#16A34A]/20'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#064e3b]">What do you want to learn?</h2>
                  {charCount >= 5 && (
                    <span className="text-[10px] font-black text-white bg-[#16A34A] px-2.5 py-1 rounded-lg uppercase tracking-wider">
                      Ready
                    </span>
                  )}
                </div>

                <div className="bg-[#F0FDF4] rounded-2xl p-4 mb-6 border border-[#bbf7d0]">
                  <textarea
                    value={topic}
                    onChange={(e) => {
                      setTopic(e.target.value);
                      if (error) setError('');
                    }}
                    disabled={isGenerating || credits === 0}
                    placeholder="e.g. Navigating the airport and asking for gates..."
                    rows={3}
                    maxLength={100}
                    className="w-full bg-transparent text-[#064e3b] text-lg font-medium placeholder-[#16A34A]/40 focus:outline-none resize-none disabled:opacity-50"
                  />
                </div>

                {/* Example Pills */}
                <div className="mb-8">
                  <p className="text-xs font-bold text-[#064e3b]/50 uppercase tracking-widest mb-3">Quick Suggestions</p>
                  <div className="flex flex-wrap gap-2">
                    {examples.slice(0, 4).map((example, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setTopic(example);
                          setError('');
                        }}
                        disabled={isGenerating || credits === 0}
                        className="text-xs px-3 py-2 rounded-lg border border-[#bbf7d0] bg-[#F0FDF4] text-[#16A34A] font-bold hover:bg-[#16A34A] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed text-left"
                      >
                        {example.length > 35 ? example.slice(0, 35) + '…' : example}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 bg-[#F0FDF4] border border-[#bbf7d0] px-3 py-1.5 rounded-lg">
                    <Target size={14} className="text-[#16A34A]" />
                    <span className="text-xs font-bold text-[#064e3b] capitalize">{(user?.level || 'Beginner').toLowerCase()}</span>
                  </div>

                  <motion.button
                    whileHover={isReady ? { scale: 1.02 } : {}}
                    whileTap={isReady ? { scale: 0.98 } : {}}
                    onClick={handleGenerate}
                    disabled={!isReady}
                    className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 overflow-hidden ${
                      isReady
                        ? 'bg-[#16A34A] text-white shadow-lg shadow-[#16A34A]/30 hover:bg-[#15803d]'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isReady && !isGenerating && (
                      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine" />
                    )}

                    {isGenerating ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} className={isReady ? 'text-white' : 'text-gray-400'} />
                        <span>Build Cards</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-bold text-red-500 mt-4 px-2 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </motion.div>
        </main>

        <style>{`
          @keyframes shine {
            0% { left: -100%; }
            20% { left: 200%; }
            100% { left: 200%; }
          }
          .animate-shine { animation: shine 3s infinite; }
        `}</style>
      </div>
    </>
  );
};

export default FlashcardPage;
