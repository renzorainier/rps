import React, { useState, useEffect } from "react";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
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

  useEffect(() => {
    if (gameResult) {
      setPreviousResults((prevResults) => [...prevResults, gameResult]);
      setDisabled(false); // Enable buttons after game result
      setTimeout(handleResetGame, 500);
    }
  }, [gameResult]);

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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-4xl text-black mb-8 font-bold">
        Rock Paper Scissors
      </div>
      <div className="text-3xl text-black mb-4 font-bold">
        Your Choice: {selectedOption}
      </div>
      {gameResult && (
        <div className="text-2xl text-black mb-6 font-bold">
          Result: {gameResult}
        </div>
      )}
      <div className="space-x-4">
        {["rock", "paper", "scissors"].map((option) => (
          <button
            key={option}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg ${
              option === selectedOption ? "bg-blue-700" : ""
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={disabled}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
      {previousResults.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Previous Results:</h3>
          <ul className="list-disc pl-6">
            {previousResults.map((result, index) => (
              <li key={index} className="text-gray-800">
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Play;
