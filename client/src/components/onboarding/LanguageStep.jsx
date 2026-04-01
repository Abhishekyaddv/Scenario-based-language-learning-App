import React from 'react';

const LanguageStep = ({ activeId, setActiveId, onboardingData, setOnboardingData, onNext }) => {
  // Now explicitly restricted to just Spanish
  const languages = [
    { id: 2, name: 'Spanish', flag: '🇪🇸' },
  ];

  return (
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
              onNext();
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
  );
};

export default LanguageStep;
