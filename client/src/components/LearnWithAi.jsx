import React from 'react'
import { 
  Check, 
  Play, 
  Lock, 
  Sparkles, 
  MessageCircle, 
  Type, 
  BookOpen, 
  ChevronRight, 
  MessageSquare,
  User,
  Settings,
  LogOut,
  Flame,
  Award
} from 'lucide-react';

const LearnWithAi = () => {
  return (
    <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-[#FFF5EE] rounded-3xl p-6 border border-[#FCEAE1]">
              <div className="flex items-center gap-2 mb-6 text-[#1C1917]">
                <Sparkles className="text-[#DE5B1A]" size={20} />
                <h2 className="text-lg font-extrabold tracking-tight">Learn with AI</h2>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                {/* AI Card 1 */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="bg-[#F5F8FF] w-8 h-8 rounded-lg flex items-center justify-center mb-4">
                    <MessageCircle size={16} className="text-[#3A5B7C]" />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5">AI Conversation Practice</h3>
                  <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                    Real-time speaking practice with context-aware AI.
                  </p>
                  <button className="text-[10px] font-bold text-[#DE5B1A] flex items-center gap-1 uppercase tracking-wider">
                    Try Now <ChevronRight size={12} />
                  </button>
                </div>

                {/* AI Card 2 */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="bg-[#EAF5F4] w-8 h-8 rounded-lg flex items-center justify-center mb-4">
                    <Type size={16} className="text-[#2B6A68]" />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5">Grammar Tutor</h3>
                  <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                    Deep dive into complex sentence structures.
                  </p>
                  <button className="text-[10px] font-bold text-[#DE5B1A] flex items-center gap-1 uppercase tracking-wider">
                    Review Rules <ChevronRight size={12} />
                  </button>
                </div>

                {/* AI Card 3 */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="bg-[#F3F4F6] w-8 h-8 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen size={16} className="text-[#374151]" />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5">Personalized Vocabulary</h3>
                  <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                    Words generated from your interests and weak points.
                  </p>
                  <button className="text-[10px] font-bold text-[#DE5B1A] flex items-center gap-1 uppercase tracking-wider">
                    Study List <ChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* Today's Goal */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold">Today's Goal</span>
                  <span className="text-xs font-bold text-[#A33D18]">20/30 XP</span>
                </div>
                <div className="h-1.5 w-full bg-[#FCEAE1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#A33D18] w-[66%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default LearnWithAi