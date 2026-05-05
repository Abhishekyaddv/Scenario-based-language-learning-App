import React from 'react';
import { Sparkles, MessageCircle, ChevronRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const LearnWithAi = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 mb-10">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="text-[#DE5B1A]" size={20} />
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#1C1917]">
          AI Practice Zone
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scenario Practice Card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/scenario')}
          className="w-full bg-gradient-to-r from-[#FFF5EE] to-white rounded-3xl p-6 border-2 border-[#FCEAE1] shadow-sm hover:shadow-xl hover:shadow-[#DE5B1A]/10 transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#DE5B1A]/20 to-transparent rounded-full opacity-50 transition-transform duration-500 group-hover:scale-125" />
          
          <div className="relative z-10 mb-4">
            <div className="bg-[#DE5B1A] w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-[#DE5B1A]/30 transition-transform group-hover:rotate-12 mb-4">
              <MessageCircle className="text-white" size={24} fill="currentColor" />
            </div>
            <h3 className="text-lg font-extrabold tracking-tight text-[#1C1917] mb-1">
              Scenarios
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Practice real-time speaking in immersive, context-aware AI environments.
            </p>
          </div>
          
          <div className="relative z-10 flex items-center text-[#DE5B1A] font-bold text-sm">
            Try Now <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* Flashcard Practice Card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/flashcards')}
          className="w-full bg-gradient-to-r from-[#F0FDF4] to-white rounded-3xl p-6 border-2 border-[#DCFCE7] shadow-sm hover:shadow-xl hover:shadow-[#16A34A]/10 transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#16A34A]/20 to-transparent rounded-full opacity-50 transition-transform duration-500 group-hover:scale-125" />
          
          <div className="relative z-10 mb-4">
            <div className="bg-[#16A34A] w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-[#16A34A]/30 transition-transform group-hover:rotate-12 mb-4">
              <Layers className="text-white" size={24} fill="currentColor" />
            </div>
            <h3 className="text-lg font-extrabold tracking-tight text-[#1C1917] mb-1">
              Flashcards
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Master vocabulary rapidly with tailored, AI-generated flashcard sets.
            </p>
          </div>
          
          <div className="relative z-10 flex items-center text-[#16A34A] font-bold text-sm">
            Try Now <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LearnWithAi;