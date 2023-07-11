import React, { useState, useEffect } from "react";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";

const Player2 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [player2Option, setPlayer2Option] = useState(null);
  const [player2State, setPlayer2State] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleOptionClick = async (option) => {
    if (!disabled) {
      setSelectedOption(option);
      setDisabled(true);

      const player1DocRef = doc(db, "rps", "player1");
      await updateDoc(player1DocRef, { p1: option, p1state: "ready" });
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl text-black mb-4">{selectedOption}</div>
      <div className="text-lg mb-4">{player2State}</div>
      {gameResult && <div className="text-lg mb-4">{gameResult}</div>}
      <div className="space-x-4">
        {["rock", "paper", "scissors"].map((option) => (
          <button
            key={option}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              option === selectedOption ? "bg-blue-700" : ""
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={disabled}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Player2;
