import React from 'react';

const GoalStep = ({ activeGoalId, setActiveGoalId, onboardingData, setOnboardingData, onNext }) => {
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

  const CheckIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" width="12" height="12" stroke="currentColor" strokeWidth="2.5">
      <path d="M3 8l3.5 3.5L13 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      <div className="ob-heading">
        <h2>What's your <em>purpose?</em></h2>
        <p>We'll tailor your learning path based on your primary objective. You can change this later in your settings.</p>
      </div>

      <div className="ob-goal-grid">
        {goals.map((goal) => (
          <button
            key={goal.id}
            className={`ob-goal-card${activeGoalId === goal.id ? ' active' : ''}`}
            onClick={() => {
              setActiveGoalId(goal.id);
              setOnboardingData({ ...onboardingData, learningGoal: goal.id });
              onNext();
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
  );
};

export default GoalStep;
