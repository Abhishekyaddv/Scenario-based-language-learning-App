import React, { useState } from 'react'
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

const Profileviewer = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <div 
        className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col shadow-sm ${
          isProfileOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div 
          className="p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className="w-10 h-10 rounded-full bg-[#A33D18] flex items-center justify-center text-white font-bold flex-shrink-0">
            JD
          </div>
          
          {/* Expanded Profile Info */}
          <div className={`ml-3 overflow-hidden transition-all duration-300 whitespace-nowrap ${isProfileOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
            <h3 className="font-bold text-sm">Jane Doe</h3>
            <p className="text-xs text-gray-500">Learner Pro</p>
          </div>
        </div>

        {isProfileOpen && (
          <div className="p-4 flex flex-col gap-6 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#FFF5EE] p-3 rounded-xl flex flex-col items-center border border-[#FDECE4]">
                <Flame className="text-[#DE5B1A] mb-1" size={20} />
                <span className="font-bold text-lg">14</span>
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Day Streak</span>
              </div>
              <div className="bg-[#FFF5EE] p-3 rounded-xl flex flex-col items-center border border-[#FDECE4]">
                <Award className="text-[#DE5B1A] mb-1" size={20} />
                <span className="font-bold text-lg">4.2k</span>
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Total XP</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4 border-t border-gray-100 pt-4">
              <button className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-[#A33D18] p-2 rounded-lg hover:bg-[#FFF5EE] transition-colors">
                <User size={18} /> My Account
              </button>
              <button className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-[#A33D18] p-2 rounded-lg hover:bg-[#FFF5EE] transition-colors">
                <Settings size={18} /> Preferences
              </button>
              <button className="flex items-center gap-3 text-sm font-medium text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors mt-auto">
                <LogOut size={18} /> Log Out
              </button>
            </div>
          </div>
        )}
      </div>
  )
}

export default Profileviewer