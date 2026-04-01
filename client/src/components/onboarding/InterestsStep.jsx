import React from 'react';

const InterestsStep = ({ 
  selectedInterests, 
  setSelectedInterests, 
  handleNext, 
  isLoading 
}) => {
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

  return (
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
        {isLoading ? 'Saving…' : selectedInterests.length > 0 ? 'Continue →' : 'Select at least one'}
      </button>
    </>
  );
};

export default InterestsStep;
