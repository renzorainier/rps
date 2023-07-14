import React, { useState, useEffect } from "react";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase.js";

const Player2 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [previousResults, setPreviousResults] = useState([]);

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

    await updateGameState({ p2: "", winner: "" });
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
      {previousResults.length > 0 && (
        <div className="mt-4">
          <h3>Previous Results:</h3>
          <ul>
            {previousResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Player2;
