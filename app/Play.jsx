import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase.js';

const Play = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [player2Option, setPlayer2Option] = useState(null);
  const [player2State, setPlayer2State] = useState(null);

  const handleOptionClick = async (option) => {
    setSelectedOption(option);

    const player1DocRef = doc(db, 'rps', 'player1');
    await updateDoc(player1DocRef, {
      p1: option,
    });
  };

  useEffect(() => {
    const player2DocRef = doc(db, 'rps', 'player2');
    const unsubscribe = onSnapshot(player2DocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setPlayer2Option(data.p2);
        setPlayer2State(data.p2state);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-4 text-4xl">{selectedOption}</div>
      <div className="mb-4 text-lg">
        Player 2: {player2Option} {player2State}
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
