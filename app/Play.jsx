import React, { useState } from 'react';
import { collection, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase.js';

const Play = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        {selectedOption}
      </div>
      <div className="space-x-4">
        {['rock', 'paper', 'scissors'].map((option) => (
          <button
            key={option}
            className={`bg-${option === selectedOption ? option : ''}-500 hover:bg-${option === selectedOption ? option : ''}-700 font-bold py-2 px-4 rounded`}
            onClick={() => handleOptionClick(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Play;
