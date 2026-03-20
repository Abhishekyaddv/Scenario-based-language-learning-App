import React from 'react'
import { useState } from 'react'
import { updateProfile } from '../services/authService';
import { useNavigate } from 'react-router-dom'


const Onboarding = () => {
  const navigate = useNavigate();

//   const onboardingData = {
//   targetLanguage: '',
//   level: '',
//   learningGoal: '',
//   interests: []       
// }
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0)
  const [activeId, setActiveId] = useState(null);
  const [activeLevelId, setActiveLevelId] = useState(null);
  const [activeGoalId, setActiveGoalId] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const [onboardingData, setOnboardingData] = useState({
        targetLanguage: '',
        level: '',
        learningGoal: '',
        interests: []       
      })



  const languages = [
    { id: 1, name: 'English', flag: '🇬🇧' },
    { id: 2, name: 'Spanish', flag: '🇪🇸' },
    { id: 3, name: 'French', flag: '🇫🇷' },
    { id: 4, name: 'German', flag: '🇩🇪' },
    { id: 5, name: 'Japanese', flag: '🇯🇵' },
    { id: 6, name: 'Hindi', flag: '🇮🇳' },
    { id: 7, name: 'Italian', flag: '🇮🇹' },
    { id: 8, name: 'Korean', flag: '🇰🇷' },
  ];

  const levels = [
    { 
      id: 'beg', 
      title: 'Beginner', 
      desc: 'Master essential phrases, basic grammar, and common vocabulary to start speaking.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      id: 'int', 
      title: 'Intermediate', 
      desc: 'Engage in fluid conversations, understand past/future tenses, and express complex opinions.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.253 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.253 1.253" />
        </svg>
      )
    },
    { 
      id: 'adv', 
      title: 'Advanced', 
      desc: 'Navigate nuanced topics, grasp idiomatic expressions, and master professional communication.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
  ];

  const goals = [
    {
      id: 'travel',
      title: 'Travel',
      desc: 'Get around confidently, ask for directions, and explore new cultures.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'casual',
      title: 'Casual',
      desc: 'Chat with friends, understand lyrics, and enjoy foreign movies.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    },
    {
      id: 'work',
      title: 'Work',
      desc: 'Boost your career prospects and communicate professionally.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'other',
      title: 'Other',
      desc: 'Challenge your brain, learn for fun, or just try something new.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

const interestsList = [
    { id: 'food', label: 'Food & Dining', icon: '🍣' },
    { id: 'music', label: 'Music', icon: '🎧' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'history', label: 'History', icon: '🏛️' },
    { id: 'tech', label: 'Technology', icon: '💻' },
    { id: 'art', label: 'Art & Design', icon: '🎨' },
    { id: 'nature', label: 'Nature', icon: '🌲' },
    { id: 'movies', label: 'Movies & TV', icon: '🍿' },
    { id: 'reading', label: 'Reading', icon: '📚' },
    { id: 'gaming', label: 'Gaming', icon: '🎮' },
    { id: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'fashion', label: 'Fashion', icon: '👗' },
  ];


  const toggleInterest = (id) => {
    setSelectedInterests((prev) => 
      prev.includes(id) 
        ? prev.filter((item) => item !== id) // Remove if already selected
        : [...prev, id]                      // Add if not selected
    );
  };

  const handleNext = async () => {
    setIsLoading(true);
    if (selectedInterests.length > 0) {
      // console.log("Proceeding with interests:", selectedInterests);
      setOnboardingData({...onboardingData, interests: selectedInterests});
    }

     try {
      const response = await updateProfile(onboardingData);
        localStorage.setItem('token', response.data.token)
        navigate('/journey')
        console.log('Profile updated successfully:', response.data);
     } catch (error) {
        console.error('Error updating profile:', error);
      
     } finally {
    setIsLoading(false);

     }
  };

  const handelClick = () =>{
    setCurrentStep(currentStep+1)
  }
 
   console.log(onboardingData);
  
  return (
    <>
      <h1>Onboarding</h1>
      <p>this is step {currentStep}</p>

      {/* --- SECTION 0: LANGUAGE SELECTION --- */}
      {currentStep === 0 && (<div className="min-h-screen bg-[#F0F8FF] p-8 flex flex-col items-center justify-center font-sans">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-[#0284C7] mb-8 text-center tracking-tight">
          Choose Your Language
        </h2>
        
        {/* The Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          
          {languages.map((lang) => (
            
            <div
              key={lang.id}
              onClick={() =>{ setActiveId(lang.id), handelClick(), setOnboardingData({...onboardingData, targetLanguage: lang.name})}}
              className={`
                group relative flex flex-col items-center justify-center p-8
                bg-white rounded-3xl cursor-pointer
                transition-all duration-300 ease-out
                border-2
                active:scale-95
                ${
                  activeId === lang.id
                    ? 'border-[#38BDF8] shadow-[0_8px_30px_rgb(56,189,248,0.3)] scale-105 z-10'
                    : 'border-[#E0F2FE] shadow-sm hover:shadow-[0_8px_25px_rgb(186,230,253,0.5)] hover:-translate-y-1.5 hover:border-[#7DD3FC]'
                }
              `}
            >
              {/* Flag with a subtle bounce on card hover */}
              <span 
                className="text-5xl mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1"
                role="img" 
                aria-label={`${lang.name} flag`}
              >
                {lang.flag}
              </span>
              
              {/* Language Name */}
              <span 
                className={`
                  text-lg font-semibold transition-colors duration-300
                  ${activeId === lang.id ? 'text-[#0284C7]' : 'text-[#7DD3FC] group-hover:text-[#0EA5E9]'}
                `}
              >
                {lang.name}
              </span>

              {/* Decorative subtle background glow for active state */}
              {activeId === lang.id && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#E0F2FE]/50 to-transparent rounded-3xl pointer-events-none" />
              )}
            </div>

            
          ))}

            </div>
          </div>
        </div>
        
      )}
      

      {/* --- SECTION 1: LEVEL SELECTION --- */}
      {currentStep === 1 && (<section>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-[#0284C7] tracking-tight">
              Define Your Level
            </h2>
            <p className="text-[#7DD3FC] mt-2 text-lg">Where are you on your journey?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {levels.map((level) => (
              /* Inline Level Card - Modern, whitish/skybule, animated */
              <button
                key={level.id}
                onClick={() => {setActiveLevelId(level.id), handelClick(), setOnboardingData({...onboardingData, level: level.title})}}
                className={`
                  group relative p-8 rounded-3xl bg-white text-left w-full
                  border-2 transition-all duration-300 ease-out outline-none
                  flex flex-col h-full active:scale-[0.97]
                  focus:ring-4 focus:ring-[#BAE6FD]
                  ${
                    activeLevelId === level.id
                      ? 'border-[#38BDF8] shadow-[0_15px_40px_rgb(56,189,248,0.2)] bg-[#F0F9FF]'
                      : 'border-[#E0F2FE] shadow-sm hover:border-[#7DD3FC] hover:shadow-lg hover:-translate-y-2'
                  }
                `}
              >
                {/* Modern Icon Container */}
                <div className={`
                  mb-6 p-3 rounded-xl inline-flex self-start transition-colors duration-300
                  ${activeLevelId === level.id ? 'bg-[#38BDF8] text-white' : 'bg-[#E0F2FE] text-[#0EA5E9] group-hover:bg-[#BAE6FD]'}
                `}>
                  {level.icon}
                </div>

                {/* Text Content */}
                <h3 className="text-2xl font-bold mb-3 text-[#1E293B]">
                  {level.title}
                </h3>
                <p className="text-[#64748B] text-base leading-relaxed flex-grow">
                  {level.desc}
                </p>

                {/* Subtle visual indicator corner decoration */}
                <div className={`
                  absolute top-5 right-5 w-4 h-4 rounded-full border-2 transition-all duration-300
                  ${activeLevelId === level.id ? 'border-[#38BDF8] bg-[#38BDF8]' : 'border-[#E0F2FE] group-hover:border-[#7DD3FC]'}
                `}/>
              </button>
            ))}
          </div>
        </section>)}

      {/* --- SECTION 2: LEARNING GOAL --- */}
      {currentStep === 2 && (<section className="w-full max-w-6xl mx-auto py-8 font-sans">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-[#0284C7] tracking-tight">
          What's your learning goal?
        </h2>
        <p className="text-[#7DD3FC] mt-2 text-lg">Choose your primary motivation.</p>
      </div>

      {/* Grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => {setActiveGoalId(goal.id), handelClick(), setOnboardingData({...Onboarding, learningGoal: goal.id})}}
            className={`
              group relative p-6 rounded-3xl bg-white text-left w-full
              border-2 transition-all duration-300 ease-out outline-none
              flex flex-col h-full active:scale-[0.97]
              focus:ring-4 focus:ring-[#BAE6FD]
              ${
                activeGoalId === goal.id
                  ? 'border-[#38BDF8] shadow-[0_15px_40px_rgb(56,189,248,0.2)] bg-[#F0F9FF]'
                  : 'border-[#E0F2FE] shadow-sm hover:border-[#7DD3FC] hover:shadow-lg hover:-translate-y-2'
              }
            `}
          >
            <div className={`
              mb-6 p-3 rounded-xl inline-flex self-start transition-colors duration-300
              ${activeGoalId === goal.id ? 'bg-[#38BDF8] text-white' : 'bg-[#E0F2FE] text-[#0EA5E9] group-hover:bg-[#BAE6FD]'}
            `}>
              {goal.icon}
            </div>

            <h3 className="text-xl font-bold mb-2 text-[#1E293B]">
              {goal.title}
            </h3>
            
            <p className="text-[#64748B] text-sm leading-relaxed flex-grow">
              {goal.desc}
            </p>

            <div className={`
              absolute top-5 right-5 w-4 h-4 rounded-full border-2 transition-all duration-300
              ${activeGoalId === goal.id ? 'border-[#38BDF8] bg-[#38BDF8]' : 'border-[#E0F2FE] group-hover:border-[#7DD3FC]'}
            `}/>
          </button>
        ))}
      </div>
        </section>)}
      
      {/* --- SECTION 3: PICK INTERESTS --- */}
      {currentStep === 3 && (<section className="w-full max-w-4xl mx-auto py-12 px-6 font-sans">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#0284C7] tracking-tight">
          What interests you?
        </h2>
        <p className="text-[#7DD3FC] mt-3 text-lg">
          Pick as many as you like. We'll tailor your vocabulary to these topics.
        </p>
      </div>

      {/* Tighter grid for multiple selections */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
        {interestsList.map((interest) => {
          const isSelected = selectedInterests.includes(interest.id);

          return (
            <button
              key={interest.id}
              onClick={() => {toggleInterest(interest.id)}}
              className={`
                group relative flex items-center justify-start gap-3 p-4 rounded-2xl
                transition-all duration-300 ease-out outline-none select-none
                border-2 active:scale-95 focus:ring-4 focus:ring-[#BAE6FD]
                ${
                  isSelected
                    ? 'bg-[#0EA5E9] border-[#0284C7] text-white shadow-[0_8px_20px_rgb(14,165,233,0.3)]'
                    : 'bg-white border-[#E0F2FE] text-[#1E293B] hover:border-[#7DD3FC] hover:shadow-md hover:-translate-y-1'
                }
              `}
            >
              <span className={`text-2xl transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                {interest.icon}
              </span>
              <span className={`font-semibold text-sm md:text-base ${isSelected ? 'text-white' : 'text-[#475569]'}`}>
                {interest.label}
              </span>

              {/* Little checkmark indicator for selected state */}
              {isSelected && (
                <div className="absolute top-2 right-2 text-white opacity-80">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Manual Next Button */}
      <div className="flex justify-center border-t border-[#E0F2FE] pt-8">
        <button
          onClick={handleNext}
          
          disabled={selectedInterests.length === 0 && isLoading}
          className={`
            px-10 py-4 rounded-full font-bold text-lg tracking-wide
            transition-all duration-300 ease-out
            ${
              selectedInterests.length > 0
                ? 'bg-[#0284C7] text-white shadow-[0_10px_25px_rgb(2,132,199,0.4)] hover:bg-[#0369A1] hover:-translate-y-1 active:scale-95 cursor-pointer'
                : 'bg-[#F0F8FF] text-[#BAE6FD] border-2 border-[#E0F2FE] cursor-not-allowed'
            }
          `}
        >
          {selectedInterests.length > 0 ? 'Continue' : 'Select at least one'}
        </button>
      </div>
        </section>)}

      <button onClick={handelClick}>Click me </button>
      
    </>
  )
}

export default Onboarding