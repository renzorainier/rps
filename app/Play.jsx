import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase.js';

const Play = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [player2Option, setPlayer2Option] = useState(null);
  const [player2State, setPlayer2State] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  const handleOptionClick = async (option) => {
    setSelectedOption(option);

    const player1DocRef = doc(db, 'rps', 'player1');
    await updateDoc(player1DocRef, {
      p1: option,
    });
  };

  const handleResetGame = async () => {
    setSelectedOption(null);
    setPlayer2Option(null);
    setPlayer2State(null);
    setGameResult(null);

    const player1DocRef = doc(db, 'rps', 'player1');
    await updateDoc(player1DocRef, {
      p1: "",
    });

    const player2DocRef = doc(db, 'rps', 'player2');
    await updateDoc(player2DocRef, {
      p2: "",
    });
  };

  useEffect(() => {
    const player2DocRef = doc(db, 'rps', 'player2');
    const unsubscribe = onSnapshot(player2DocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setPlayer2Option(data.p2);
        setPlayer2State(data.p2state);

        // Compare the options to determine the winner
        if (selectedOption && data.p2) {
          const winner = determineWinner(selectedOption, data.p2);
          setGameResult(winner);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [selectedOption]);

  const determineWinner = (option1, option2) => {
    // Rock beats scissors, scissors beat paper, paper beats rock
    if (option1 === option2) {
      return 'Draw';
    } else if (
      (option1 === 'rock' && option2 === 'scissors') ||
      (option1 === 'scissors' && option2 === 'paper') ||
      (option1 === 'paper' && option2 === 'rock')
    ) {
      return 'Player 1 wins!';
    } else {
      return 'Player 2 wins!';
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-4 text-4xl">{selectedOption}</div>
      <div className="mb-4 text-lg">
        Player 2: {player2Option} {player2State}
      </div>
      {gameResult && <div className="mb-4 text-lg">{gameResult}</div>}
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
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleResetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default Play;
