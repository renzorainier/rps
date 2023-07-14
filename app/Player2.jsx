import React, { useState, useEffect } from "react";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
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
      updateGameState({ p2: option });
    }
  };

  useEffect(() => {
    const player2DocRef = doc(db, "rps", "state");
    const unsubscribe = onSnapshot(player2DocRef, (doc) => {
      const data = doc.data();
      const winner = data?.winner || null;
      setGameResult(winner);
      setDisabled(false);
      setPreviousResults((prevResults) => [...prevResults, winner]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const updateGameState = async (data) => {
    const player2DocRef = doc(db, "rps", "state");
    await updateDoc(player2DocRef, data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {selectedOption && (
        <div className="text-4xl text-black mb-4">Selected: {selectedOption}</div>
      )}
      {gameResult && <div className="text-lg mb-4">Winner: {gameResult}</div>}
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
