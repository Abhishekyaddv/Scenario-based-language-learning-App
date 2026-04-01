import React, { useState } from 'react';
import { updateProfile } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import LingoAILoader from '../components/LingoAILoader';

// Components
import { styles } from '../components/onboarding/OnboardingStyles';
import LanguageStep from '../components/onboarding/LanguageStep';
import LevelStep from '../components/onboarding/LevelStep';
import GoalStep from '../components/onboarding/GoalStep';
import InterestsStep from '../components/onboarding/InterestsStep';

const Onboarding = () => {
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [activeLevelId, setActiveLevelId] = useState(null);
  const [activeGoalId, setActiveGoalId] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const [onboardingData, setOnboardingData] = useState({
    targetLanguage: '',
    level: '',
    learningGoal: '',
    interests: []
  });

  const TOTAL_STEPS = 4;
  const stepLabels = ['Language', 'Level', 'Goal Setting', 'Interests'];

  // ── FIX #1: The actual save handler (401 BUG FIXED) ──
  const handleNext = async () => {
    if (selectedInterests.length === 0 || isLoading) return;

    setIsLoading(true);
    const finalData = { ...onboardingData, interests: selectedInterests };

    try {
      const response = await updateProfile(finalData);
      
      // FIXED 401 bug: updateProfile returns response.data.user
      // It DOES NOT return a new token. Do not set 'token' to undefined!
      if (response.data && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      setShowLoader(true);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showLoader) {
    return <LingoAILoader onComplete={() => navigate('/journey')} />;
  }

  const handleClick = () => setCurrentStep((s) => s + 1);
  const progressPct = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <>
      <style>{styles}</style>
      <div className="ob-root">
        {/* ── Progress bar ── */}
        <div className="ob-progress-wrap">
          <div className="ob-progress-meta">
            <span>Step {currentStep + 1} of {TOTAL_STEPS}</span>
            <span>{stepLabels[currentStep]}</span>
          </div>
          <div className="ob-progress-track">
            <div className="ob-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* ── Step Rendering ── */}
        {currentStep === 0 && (
          <LanguageStep 
            activeId={activeId} 
            setActiveId={setActiveId} 
            onboardingData={onboardingData} 
            setOnboardingData={setOnboardingData} 
            onNext={handleClick} 
          />
        )}
        
        {currentStep === 1 && (
          <LevelStep 
            activeLevelId={activeLevelId} 
            setActiveLevelId={setActiveLevelId} 
            onboardingData={onboardingData} 
            setOnboardingData={setOnboardingData} 
            onNext={handleClick} 
          />
        )}

        {currentStep === 2 && (
          <GoalStep 
            activeGoalId={activeGoalId} 
            setActiveGoalId={setActiveGoalId} 
            onboardingData={onboardingData} 
            setOnboardingData={setOnboardingData} 
            onNext={handleClick} 
          />
        )}

        {currentStep === 3 && (
          <InterestsStep 
            selectedInterests={selectedInterests} 
            setSelectedInterests={setSelectedInterests} 
            handleNext={handleNext} 
            isLoading={isLoading} 
          />
        )}
      </div>
    </>
  );
};

export default Onboarding;
