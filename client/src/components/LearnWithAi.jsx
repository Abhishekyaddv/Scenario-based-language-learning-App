import React from 'react';
import { Sparkles, MessageCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const LearnWithAi = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to the AI conversation practice page
    navigate('/scenario');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="w-full bg-gradient-to-r from-[#FFF5EE] to-white rounded-3xl p-6 md:p-8 border-2 border-[#FCEAE1] shadow-md hover:shadow-xl hover:shadow-[#DE5B1A]/10 transition-all cursor-pointer relative overflow-hidden group mb-10"
    >
      {/* Background decorative element */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#DE5B1A]/20 to-transparent rounded-full opacity-50 transition-transform duration-500 group-hover:scale-125" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
        <div className="flex items-start sm:items-center gap-4">
          <div className="bg-[#DE5B1A] w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#DE5B1A]/30 transition-transform group-hover:rotate-12">
            <MessageCircle className="text-white" size={26} fill="currentColor" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="text-[#DE5B1A] hidden sm:block" size={18} />
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#1C1917]">
                Learn with AI
              </h2>
              <span className="bg-[#DE5B1A]/10 text-[#DE5B1A] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Recommended
              </span>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-lg">
              Supercharge your Spanish! Practice real-time speaking in context-aware, immersive AI scenarios.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto flex-shrink-0">
          <button className="w-full sm:w-auto bg-[#1C1917] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#332e2a] transition-colors">
            Try Now <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LearnWithAi;