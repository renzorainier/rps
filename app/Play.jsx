import React, { useState, useEffect } from "react";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase.js";

const Play = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [player2Option, setPlayer2Option] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleOptionClick = (option) => {
    if (!disabled) {
      setSelectedOption(option);
      setDisabled(true);
    }
  };

  const handleResetGame = async () => {
    setSelectedOption(null);
    setPlayer2Option(null);
    setGameResult(null);
    setDisabled(false);

    const player2DocRef = doc(db, "rps", "player2");
    await updateDoc(player2DocRef, { p2: "" });
  };

  useEffect(() => {
    const player2DocRef = doc(db, "rps", "state");
    const unsubscribe = onSnapshot(player2DocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setPlayer2Option(data.p2);

        if (selectedOption && data.p2 && !gameResult) {
          const winner = determineWinner(selectedOption, data.p2);
          setGameResult(winner);
          handleUpdateWinner(winner);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [selectedOption, gameResult]);

  const determineWinner = (option1, option2) => {
    if (option1 === option2) {
      return "Draw";
    } else if (
      (option1 === "rock" && option2 === "scissors") ||
      (option1 === "scissors" && option2 === "paper") ||
      (option1 === "paper" && option2 === "rock")
    ) {
      return "Player 1 wins!";
    } else {
      return "Player 2 wins!";
    }
  };

  const handleUpdateWinner = async (winner) => {
    const player2DocRef = doc(db, "rps", "state");
    await updateDoc(player2DocRef, { winner });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl text-black mb-4">{selectedOption}</div>
      {gameResult && <div className="text-lg mb-4">{gameResult}</div>}
      <div className="space-x-4">
        {["rock", "paper", "scissors"].map((option) => (
          <button
            key={option}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              option === selectedOption ? "bg-blue-700" : ""
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={disabled}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Play;
