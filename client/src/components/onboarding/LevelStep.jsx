import React from 'react';

const LevelStep = ({ activeLevelId, setActiveLevelId, onboardingData, setOnboardingData, onNext }) => {
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

  const CheckIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" width="12" height="12" stroke="currentColor" strokeWidth="2.5">
      <path d="M3 8l3.5 3.5L13 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
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
              onNext();
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
  );
};

export default LevelStep;
