import React from 'react'
import { useState } from 'react'
import { updateProfile } from '../services/authService';
import { useNavigate } from 'react-router-dom'
import LingoAILoader from '../components/LingoAILoader';

/* ─── Inline styles / design tokens ──────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600&display=swap');

  .ob-root {
    min-height: 100vh;
    background: radial-gradient(ellipse at 0% 0%, #f7d9c4 0%, #fdf3ee 40%, #fdf6f2 100%);
    font-family: 'DM Sans', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1rem 4rem;
    position: relative;
    overflow-x: hidden;
  }

  /* ── Progress bar ── */
  .ob-progress-wrap {
    width: 100%;
    max-width: 640px;
    padding: 2rem 0 0;
    margin-bottom: 2.5rem;
  }
  .ob-progress-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9e7060;
    margin-bottom: 0.55rem;
  }
  .ob-progress-track {
    width: 100%;
    height: 5px;
    background: #e8cfc5;
    border-radius: 99px;
    overflow: hidden;
  }
  .ob-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #c0442a, #e07050);
    border-radius: 99px;
    transition: width 0.5s cubic-bezier(.4,0,.2,1);
  }

  /* ── Page heading ── */
  .ob-heading {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  .ob-heading h2 {
    font-family: 'Lora', serif;
    font-size: clamp(2rem, 5vw, 2.8rem);
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.15;
    margin: 0 0 0.5rem;
  }
  .ob-heading h2 em {
    font-style: italic;
    color: #c0442a;
  }
  .ob-heading p {
    font-size: 0.95rem;
    color: #7a5a50;
    margin: 0;
    max-width: 440px;
    line-height: 1.6;
  }

  /* ── Continue button ── */
  .ob-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2.4rem;
    border-radius: 999px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: all 0.25s ease;
  }
  .ob-btn-primary {
    background: #1a3f52;
    color: #fff;
    box-shadow: 0 6px 20px rgba(26,63,82,0.3);
  }
  .ob-btn-primary:hover {
    background: #15303f;
    transform: translateY(-1px);
    box-shadow: 0 10px 28px rgba(26,63,82,0.35);
  }
  .ob-btn-primary:active { transform: translateY(0); }
  .ob-btn-disabled {
    background: #e8cfc5;
    color: #b89088;
    cursor: not-allowed;
    box-shadow: none;
  }

  /* ─────────────────────────────────────────────
     STEP 0 — Language list
  ───────────────────────────────────────────── */
  .ob-lang-list {
    width: 100%;
    max-width: 540px;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    max-height: 420px;
    overflow-y: auto;
    padding-right: 4px;
  }
  .ob-lang-list::-webkit-scrollbar { width: 4px; }
  .ob-lang-list::-webkit-scrollbar-track { background: transparent; }
  .ob-lang-list::-webkit-scrollbar-thumb { background: #dbb9ae; border-radius: 99px; }

  .ob-lang-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.85rem 1.1rem;
    background: #fff;
    border: 2px solid #f0ddd8;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.22s ease;
    user-select: none;
  }
  .ob-lang-item:hover {
    border-color: #c0442a;
    box-shadow: 0 4px 14px rgba(192,68,42,0.1);
    transform: translateX(3px);
  }
  .ob-lang-item.active {
    background: #2b7db8;
    border-color: #2b7db8;
    box-shadow: 0 6px 20px rgba(43,125,184,0.3);
  }
  .ob-lang-flag {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #f5ede9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .ob-lang-item.active .ob-lang-flag { background: rgba(255,255,255,0.2); }
  .ob-lang-name {
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
    flex: 1;
    transition: color 0.2s;
  }
  .ob-lang-item.active .ob-lang-name { color: #fff; }
  .ob-lang-check {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #e0c8c2;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .ob-lang-item.active .ob-lang-check {
    background: #fff;
    border-color: #fff;
  }
  .ob-lang-check svg { display: none; }
  .ob-lang-item.active .ob-lang-check svg { display: block; }

  .ob-lang-hint {
    margin-top: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.1rem;
    background: rgba(192,68,42,0.07);
    border-radius: 12px;
    font-size: 0.8rem;
    color: #9e7060;
    max-width: 540px;
  }

  /* ─────────────────────────────────────────────
     STEP 1 — Level cards
  ───────────────────────────────────────────── */
  .ob-level-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    width: 100%;
    max-width: 860px;
  }
  @media (max-width: 640px) {
    .ob-level-grid { grid-template-columns: 1fr; }
  }

  .ob-level-card {
    position: relative;
    background: #fff;
    border: 2px solid #f0ddd8;
    border-radius: 22px;
    padding: 1.8rem 1.5rem 1.5rem;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    outline: none;
    user-select: none;
  }
  .ob-level-card:hover {
    border-color: #c0442a;
    box-shadow: 0 8px 28px rgba(192,68,42,0.12);
    transform: translateY(-3px);
  }
  .ob-level-card.active {
    border-color: #c0442a;
    background: #f0f7fc;
    box-shadow: 0 10px 32px rgba(192,68,42,0.18);
  }
  .ob-level-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: #f5ede9;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  .ob-level-card.active .ob-level-icon-wrap { background: #f5ede9; }
  .ob-level-icon-wrap svg, .ob-level-icon-wrap span { color: #c0442a; font-size: 1.4rem; }
  .ob-level-title {
    font-family: 'Lora', serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #1a1a1a;
  }
  .ob-level-desc {
    font-size: 0.85rem;
    color: #7a5a50;
    line-height: 1.6;
    flex: 1;
  }
  .ob-level-num {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #c0442a;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ob-level-radio {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #dbb9ae;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  .ob-level-card.active .ob-level-radio {
    border-color: #c0442a;
    background: #c0442a;
  }
  .ob-level-card.active .ob-level-radio::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #fff;
  }
  .ob-check-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #c0442a;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(192,68,42,0.4);
  }
  .ob-check-badge svg { color: #fff; width: 14px; height: 14px; }

  /* ─────────────────────────────────────────────
     STEP 2 — Goal cards (desktop: row, mobile: list)
  ───────────────────────────────────────────── */
  .ob-goal-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
    width: 100%;
    max-width: 960px;
  }
  @media (max-width: 768px) {
    .ob-goal-grid {
      grid-template-columns: 1fr;
      max-width: 540px;
    }
    .ob-goal-card {
      flex-direction: row !important;
      align-items: center !important;
      text-align: left !important;
      padding: 1rem 1.2rem !important;
    }
    .ob-goal-card .ob-goal-icon-wrap { margin-bottom: 0 !important; flex-shrink: 0; }
    .ob-goal-card-body { flex: 1; }
  }

  .ob-goal-card {
    position: relative;
    background: #fff;
    border: 2px solid #f0ddd8;
    border-radius: 22px;
    padding: 1.8rem 1.4rem;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    outline: none;
    user-select: none;
  }
  .ob-goal-card:hover {
    border-color: #c0442a;
    box-shadow: 0 8px 28px rgba(192,68,42,0.12);
    transform: translateY(-3px);
  }
  .ob-goal-card.active {
    background: #c0442a;
    border-color: #c0442a;
    box-shadow: 0 12px 36px rgba(192,68,42,0.35);
  }
  .ob-goal-icon-wrap {
    width: 58px;
    height: 58px;
    border-radius: 16px;
    background: #f5ede9;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.2rem;
    transition: background 0.2s;
  }
  .ob-goal-card.active .ob-goal-icon-wrap { background: rgba(255,255,255,0.22); }
  .ob-goal-icon-wrap svg { color: #c0442a; transition: color 0.2s; }
  .ob-goal-card.active .ob-goal-icon-wrap svg { color: #fff; }
  .ob-goal-title {
    font-family: 'Lora', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #1a1a1a;
    transition: color 0.2s;
  }
  .ob-goal-card.active .ob-goal-title { color: #fff; }
  .ob-goal-desc {
    font-size: 0.8rem;
    color: #7a5a50;
    line-height: 1.55;
    transition: color 0.2s;
  }
  .ob-goal-card.active .ob-goal-desc { color: rgba(255,255,255,0.82); }

  /* ─────────────────────────────────────────────
     STEP 3 — Interests
  ───────────────────────────────────────────── */
  .ob-interests-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.8rem;
    width: 100%;
    max-width: 640px;
    margin-bottom: 2.5rem;
  }
  @media (max-width: 520px) {
    .ob-interests-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .ob-interest-btn {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.75rem 1rem;
    border-radius: 14px;
    border: 2px solid #f0ddd8;
    background: #fff;
    cursor: pointer;
    transition: all 0.22s ease;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: #4a3530;
    user-select: none;
    outline: none;
    position: relative;
  }
  .ob-interest-btn:hover {
    border-color: #c0442a;
    box-shadow: 0 4px 12px rgba(192,68,42,0.1);
    transform: translateY(-2px);
  }
  .ob-interest-btn.active {
    background: #ed8c72;
    border-color: #1a1a1a;
    color: #fff;
    box-shadow: 0 6px 18px rgba(26,122,176,0.3);
  }
  .ob-interest-emoji { font-size: 1.2rem; flex-shrink: 0; }

  /* ─── Divider ── */
  .ob-divider {
    width: 100%;
    max-width: 640px;
    border: none;
    border-top: 1px solid #e8cfc5;
    margin-bottom: 2rem;
  }
`

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
      num: 'Level 01',
      desc: 'Starting from scratch. We focus on foundational concepts, core terminology, and building a consistent learning habit.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'int',
      title: 'Intermediate',
      num: 'Level 02',
      desc: 'Familiar with the basics. You\'re ready for complex problem-solving, nuanced strategies, and practical application.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'adv',
      title: 'Advanced',
      num: 'Level 03',
      desc: 'Deep expertise. Mastery of advanced architectures, optimizations, and theoretical frameworks for high-impact results.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7a6 6 0 11-11.682 0 6 6 0 0111.682 0z" />
        </svg>
      )
    },
  ];

  const goals = [
    {
      id: 'travel',
      title: 'Travel',
      desc: 'Ordering food, navigating streets, and local phrases.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      id: 'casual',
      title: 'Casual',
      desc: 'Daily conversations, hobbies, and meeting new people.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      id: 'work',
      title: 'Work',
      desc: 'Professional emails, meetings, and business etiquette.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'other',
      title: 'Other',
      desc: 'Academic study, literature, or personal curiosity.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
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
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // ── BUG FIX #1: Build final payload locally so async state isn't stale ──
  // ── BUG FIX #2: fixed disabled logic (|| not &&) ──
  const handleNext = async () => {

    console.log('token:', localStorage.getItem('token'));

    if (selectedInterests.length === 0 || isLoading) return;
    setIsLoading(true);
    const finalData = { ...onboardingData, interests: selectedInterests };
    try {

      const response = await updateProfile(finalData);
      localStorage.setItem('token', response.data.token);
      setShowLoader(true);
      // navigate('/journey');

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

  const CheckIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" width="12" height="12" stroke="currentColor" strokeWidth="2.5">
      <path d="M3 8l3.5 3.5L13 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

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

        {/* ══════════════════════════════════════════
            STEP 0 — Choose Language
        ══════════════════════════════════════════ */}
        {currentStep === 0 && (
          <>
            <div className="ob-heading">
              <h2>Choose your <em>learning</em> path.</h2>
              <p>Select the language you want to master. We'll tailor your experience based on your choice.</p>
            </div>

            <div className="ob-lang-list">
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  className={`ob-lang-item${activeId === lang.id ? ' active' : ''}`}
                  onClick={() => {
                    setActiveId(lang.id);
                    setOnboardingData({ ...onboardingData, targetLanguage: lang.name });
                    handleClick();
                  }}
                >
                  <div className="ob-lang-flag">{lang.flag}</div>
                  <span className="ob-lang-name">{lang.name}</span>
                  <div className="ob-lang-check">
                    <svg viewBox="0 0 16 16" fill="none" width="12" height="12" stroke="#2b7db8" strokeWidth="2.5">
                      <path d="M3 8l3.5 3.5L13 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="ob-lang-hint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
              </svg>
              Don't see your language? We're adding more soon.
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            STEP 1 — Define Level
        ══════════════════════════════════════════ */}
        {currentStep === 1 && (
          <>
            <div className="ob-heading">
              <h2>Define your <em>ascent.</em></h2>
              <p>Choose the proficiency level that matches your current expertise. We'll tailor your learning path accordingly.</p>
            </div>

            <div className="ob-level-grid">
              {levels.map((level) => (
                <button
                  key={level.id}
                  className={`ob-level-card${activeLevelId === level.id ? ' active' : ''}`}
                  onClick={() => {
                    setActiveLevelId(level.id);
                    setOnboardingData({ ...onboardingData, level: level.title });
                    handleClick();
                  }}
                >
                  {activeLevelId === level.id && (
                    <div className="ob-check-badge"><CheckIcon /></div>
                  )}
                  <div className="ob-level-icon-wrap">{level.icon}</div>
                  <div className="ob-level-title">{level.title}</div>
                  <div className="ob-level-desc">{level.desc}</div>
                  <div className="ob-level-num">
                    {level.num}
                    <div className="ob-level-radio" />
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            STEP 2 — Learning Goal
        ══════════════════════════════════════════ */}
        {currentStep === 2 && (
          <>
            <div className="ob-heading">
              <h2>What's your <em>purpose?</em></h2>
              <p>We'll tailor your learning path based on your primary objective. You can change this later in your settings.</p>
            </div>

            {/* ── BUG FIX #3: was {...Onboarding, …} — now correctly uses onboardingData ── */}
            <div className="ob-goal-grid">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  className={`ob-goal-card${activeGoalId === goal.id ? ' active' : ''}`}
                  onClick={() => {
                    setActiveGoalId(goal.id);
                    setOnboardingData({ ...onboardingData, learningGoal: goal.id });
                    handleClick();
                  }}
                >
                  {activeGoalId === goal.id && (
                    <div className="ob-check-badge"><CheckIcon /></div>
                  )}
                  <div className="ob-goal-icon-wrap">{goal.icon}</div>
                  <div className="ob-goal-card-body">
                    <div className="ob-goal-title">{goal.title}</div>
                    <div className="ob-goal-desc">{goal.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            STEP 3 — Interests
        ══════════════════════════════════════════ */}
        {currentStep === 3 && (
          <>
            <div className="ob-heading">
              <h2>What <em>interests</em> you?</h2>
              <p>Pick as many as you like. We'll tailor your vocabulary to these topics.</p>
            </div>

            <div className="ob-interests-grid">
              {interestsList.map((interest) => {
                const isSelected = selectedInterests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    className={`ob-interest-btn${isSelected ? ' active' : ''}`}
                    onClick={() => toggleInterest(interest.id)}
                  >
                    <span className="ob-interest-emoji">{interest.icon}</span>
                    {interest.label}
                  </button>
                );
              })}
            </div>

            <hr className="ob-divider" />

            <button
              onClick={handleNext}
              disabled={selectedInterests.length === 0 || isLoading}
              className={`ob-btn ${selectedInterests.length > 0 && !isLoading ? 'ob-btn-primary' : 'ob-btn-disabled'}`}
            >
              {isLoading ? 'Saving…' : selectedInterests.length > 0 ? <>Continue →</> : 'Select at least one'}
            </button>
          </>
        )}

      </div>
    </>
  );
};

export default Onboarding;
