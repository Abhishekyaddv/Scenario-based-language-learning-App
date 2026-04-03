import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { updateProfile } from '../services/authService';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const languages = [
  { id: 'spanish', name: 'Spanish', flag: '🇪🇸' },
  { id: 'french', name: 'French', flag: '🇫🇷' },
  { id: 'italian', name: 'Italian', flag: '🇮🇹' },
  { id: 'german', name: 'German', flag: '🇩🇪' },
  { id: 'japanese', name: 'Japanese', flag: '🇯🇵' },
  { id: 'hindi', name: 'Hindi', flag: '🇮🇳' },
];

const LanguageSelection = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load existing target language from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.targetLanguage) {
      setSelectedLang(user.targetLanguage.toLowerCase());
    } else {
      setSelectedLang('spanish'); // default fallback
    }
  }, []);

  const handleContinue = async () => {
    if (!selectedLang) return;
    
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const originalLang = user.targetLanguage ? user.targetLanguage.toLowerCase() : '';
      
      // Only make API call if the language changed or if missing
      if (selectedLang !== originalLang) {
        // find full name for DB consistency
        const langObj = languages.find(l => l.id === selectedLang);
        const nameToSave = langObj ? langObj.name : selectedLang;
        
        const response = await updateProfile({ targetLanguage: nameToSave });
        if (response.data && response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      
      navigate('/journey');
    } catch (error) {
      console.error('Failed to update language', error);
      toast.error('Failed to update language selection.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF8F5] flex flex-col items-center justify-center p-6 font-sans text-[#1C1917]">
      <Toaster position="top-center" />
      
      <div className="max-w-3xl w-full">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-[#eb5e28]/10 text-[#eb5e28] text-sm font-bold tracking-wider rounded-full mb-4">
            DASHBOARD
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Choose your <span className="text-[#A33D18]">learning path</span>.
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Select the language you want to focus on right now. You can always change this later.
          </p>
        </motion.div>

        {/* Grid Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12"
        >
          {languages.map((lang, idx) => {
            const isSelected = selectedLang === lang.id;
            
            return (
              <motion.button
                key={lang.id}
                whileHover={{ scale: isSelected ? 1 : 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedLang(lang.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (idx * 0.05) }}
                className={`relative flex flex-col items-center justify-center p-6 md:p-8 rounded-[2rem] border-2 transition-all duration-300 w-full ${
                  isSelected 
                    ? 'border-[#DE5B1A] bg-white shadow-[0_8px_30px_rgba(222,91,26,0.15)] ring-4 ring-[#DE5B1A]/10 z-10' 
                    : 'border-transparent bg-white shadow-sm hover:shadow-md text-gray-400 hover:text-gray-700'
                }`}
              >
                {/* Checkmark icon for selected */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#DE5B1A] text-white rounded-full flex items-center justify-center shadow-md">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
                
                <span className="text-5xl md:text-6xl mb-4 filter drop-shadow-sm">{lang.flag}</span>
                <span className={`text-lg md:text-xl font-bold ${isSelected ? 'text-[#1C1917]' : ''}`}>
                  {lang.name}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Action button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <button
            onClick={handleContinue}
            disabled={!selectedLang || isLoading}
            className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
              !selectedLang || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#1C1917] text-white hover:bg-black hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1'
            }`}
          >
            {isLoading ? 'Updating...' : 'Continue to Journey'}
            {!isLoading && <ArrowRight size={20} className={selectedLang ? 'animate-pulse' : ''} />}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageSelection;
