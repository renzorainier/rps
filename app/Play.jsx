import React, { useState, useEffect } from "react";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase.js";

const Play = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [player2Option, setPlayer2Option] = useState(null);
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

  useEffect(() => {
    const player2DocRef = doc(db, "rps", "state");
    const unsubscribe = onSnapshot(player2DocRef, (doc) => {
      const data = doc.data();
      setPlayer2Option(data.p2);

      if (selectedOption && data.p2 && !gameResult) {
        const winner = determineWinner(selectedOption, data.p2);
        setGameResult(winner);
        handleUpdateWinner(winner);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [selectedOption]);

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
    await updateGameState({ winner });
  };

  const updateGameState = async (data) => {
    const player2DocRef = doc(db, "rps", "state");
    await updateDoc(player2DocRef, data);
  };

  useEffect(() => {
    if (gameResult) {
      setPreviousResults((prevResults) => [...prevResults, gameResult]);
    }
  }, [gameResult]);

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
            disabled={disabled}>
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
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleResetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Play;
