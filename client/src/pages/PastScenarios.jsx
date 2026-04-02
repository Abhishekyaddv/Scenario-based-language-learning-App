import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchScenarioHistory } from '../services/authService';
import { ArrowLeft, Clock, Globe, Award, Star, BookOpen, AlertCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PastScenarios() {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetchScenarioHistory();
        setScenarios(response.data);
      } catch (err) {
        console.error("Failed to fetch scenarios:", err);
        setError("Failed to load your past scenarios. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-[#FCF8F5] font-sans text-[#1C1917] p-4 sm:p-6 md:p-8">
      {/* Navigation */}
      <nav className="max-w-5xl mx-auto flex items-center justify-between mb-8 md:mb-12">
        <button 
          onClick={() => navigate('/journey')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#DE5B1A] transition-colors font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
        >
          <ArrowLeft size={18} />
          Back to Journey
        </button>
        <div className="flex items-center gap-3 bg-[#DE5B1A]/10 text-[#DE5B1A] px-5 py-2 rounded-full font-bold">
          <BookOpen size={18} />
          <span>Past Scenarios</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Your Journey History</h1>
          <p className="text-gray-600 text-lg">Review your past conversations, analyze mistakes, and track your fluency progression.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#DE5B1A]">
            <div className="w-12 h-12 border-4 border-[#DE5B1A]/30 border-t-[#DE5B1A] rounded-full animate-spin mb-4" />
            <p className="font-semibold animate-pulse">Loading history...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 flex items-center gap-3">
            <AlertCircle />
            {error}
          </div>
        ) : scenarios.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100">
            <div className="bg-[#FCF8F5] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">No past scenarios yet</h3>
            <p className="text-gray-500 mb-6">Complete an AI roleplay scenario to start building your history!</p>
            <button 
              onClick={() => navigate('/scenario')}
              className="bg-[#1C1917] text-white px-6 py-3 rounded-full font-bold hover:bg-[#332e2a] transition-colors shadow-lg"
            >
              Start New Scenario
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {scenarios.map((scenario, index) => (
                <motion.div
                  key={scenario._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedScenario(scenario)}
                  className="bg-white rounded-3xl p-6 border-2 border-transparent hover:border-[#DE5B1A]/20 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-[#FCF8F5] text-gray-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Clock size={12} />
                      {formatDate(scenario.createdAt)}
                    </div>
                    <div className={`text-xs font-bold px-3 py-1 rounded-full border ${getScoreColor(scenario.overallScore)}`}>
                      Score: {scenario.overallScore}%
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold mb-2 text-[#1C1917] line-clamp-2 leading-snug group-hover:text-[#DE5B1A] transition-colors">
                    {scenario.scenarioType || "Open Conversation"}
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1.5 text-sm bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg font-medium">
                      <Globe size={14} className="text-gray-400" />
                      {scenario.language}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg font-medium capitalize">
                      <Star size={14} className="text-amber-400" />
                      {scenario.level}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm bg-[#DE5B1A]/5 text-[#DE5B1A] px-3 py-1.5 rounded-lg font-bold ml-auto">
                      <Award size={16} />
                      +{scenario.xpEarned} XP
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Transcript Modal */}
      <AnimatePresence>
        {selectedScenario && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScenario(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#FCF8F5] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-start shrink-0">
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold pr-8">
                    {selectedScenario.scenarioType || "Open Conversation"}
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5"><Globe size={14} /> {selectedScenario.language}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {formatDate(selectedScenario.createdAt)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedScenario(null)}
                  className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors text-gray-600 shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Transcript Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 scroll-smooth">
                {selectedScenario.transcript && selectedScenario.transcript.map((turn, index) => (
                  <div key={turn._id || index} className="space-y-4">
                    
                    {/* AI Message */}
                    {turn.aiText && (
                      <div className="flex items-end gap-3">
                        <div className="bg-[#DE5B1A] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                          AI
                        </div>
                        <div className="bg-white px-5 py-3.5 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 max-w-[85%]">
                          <p className="text-gray-800 leading-relaxed">{turn.aiText}</p>
                        </div>
                      </div>
                    )}

                    {/* User Response */}
                    {turn.userResponse && (
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-end gap-3 justify-end w-full">
                          <div className="bg-[#1C1917] text-white px-5 py-3.5 rounded-2xl rounded-br-sm shadow-sm max-w-[85%]">
                            <p className="leading-relaxed">{turn.userResponse}</p>
                          </div>
                          <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                            You
                          </div>
                        </div>

                        {/* Feedback Box (if not perfect) */}
                        {turn.score < 100 && (
                          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 max-w-[85%] mr-11 w-full relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400"></div>
                            
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${getScoreColor(turn.score)}`}>
                                Score: {turn.score}
                              </span>
                              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Feedback</span>
                            </div>
                            
                            <p className="text-sm text-gray-700 italic mb-3">"{turn.feedback}"</p>
                            
                            {turn.corrected && (
                              <div className="bg-white p-3 rounded-xl border border-orange-100 shadow-sm">
                                <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider block mb-1">Better alternative:</span>
                                <p className="text-sm font-medium text-gray-900">{turn.corrected}</p>
                              </div>
                            )}
                          </div>
                        )}
                        {/* Perfect Score Praise */}
                        {turn.score === 100 && (
                          <div className="mr-11 text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                            <Sparkles size={12} /> Perfect Response
                          </div>
                        )}
                      </div>
                    )}
                    
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sparkles icon component since it was missed from lucide-react imports initially
function Sparkles(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}
