import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase.js";
import React, { useState } from 'react';

const RockPaperScissors = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-x-4">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            selectedOption === 'rock' ? 'bg-blue-700' : ''
          }`}
          onClick={() => handleOptionClick('rock')}
        >
          Rock
        </button>
        <button
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
            selectedOption === 'paper' ? 'bg-red-700' : ''
          }`}
          onClick={() => handleOptionClick('paper')}
        >
          Paper
        </button>
        <button
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
            selectedOption === 'scissors' ? 'bg-green-700' : ''
          }`}
          onClick={() => handleOptionClick('scissors')}
        >
          Scissors
        </button>
      </div>
    </div>
  );
};

export default RockPaperScissors;
