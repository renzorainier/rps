import React, { useState, useEffect } from 'react';
import { collection, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase.js';

const Play = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [player2Option, setPlayer2Option] = useState(null);
  const [player2State, setPlayer2State] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [isGameFinished, setIsGameFinished] = useState(true);

  const handleOptionClick = async (option) => {
    if (!isGameFinished) {
      setSelectedOption(option);

      const player1DocRef = doc(db, 'rps', 'player1');
      await updateDoc(player1DocRef, { p1: option });
    }
  };

  const handleResetGame = async () => {
    setSelectedOption(null);
    setPlayer2Option(null);
    setPlayer2State(null);
    setGameResult(null);
    setIsGameFinished(false);

    const player1DocRef = doc(db, 'rps', 'player1');
    await updateDoc(player1DocRef, { p1: '' });

    const player2DocRef = doc(db, 'rps', 'player2');
    await updateDoc(player2DocRef, { p2: '' });
  };

  useEffect(() => {
    const player2DocRef = doc(db, 'rps', 'player2');
    const unsubscribe = onSnapshot(player2DocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setPlayer2Option(data.p2);
        setPlayer2State(data.p2state);

        if (selectedOption && data.p2) {
          const winner = determineWinner(selectedOption, data.p2);
          setGameResult(winner);
          setIsGameFinished(true);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [selectedOption]);

  const determineWinner = (option1, option2) => {
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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl text-black mb-4">{selectedOption}</div>
      <div className="text-lg mb-4">
        Player 2: {player2Option} {player2State}
      </div>
      {gameResult && <div className="text-lg mb-4">{gameResult}</div>}
      <div className="space-x-4">
        {['rock', 'paper', 'scissors'].map((option) => (
          <button
            key={option}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              option === selectedOption ? 'bg-blue-700' : ''
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={isGameFinished}
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
