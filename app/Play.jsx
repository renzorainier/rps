import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase.js";

function Play() {
  const [gameState, setGameState] = useState("");
  const [playerChoice, setPlayerChoice] = useState("");
  const [otherPlayerChoice, setOtherPlayerChoice] = useState("");
  const [winner, setWinner] = useState("");

  const handlePlayerChoice = async (choice) => {
    setPlayerChoice(choice);

    await updateDoc(doc(db, "game", "player1"), {
      choice: choice,
    });
  };

  const getGameStateFromFirebase = async () => {
    const gameRef = doc(db, "game", "state");
    const snapshot = await getDoc(gameRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      setGameState(data.state);

      if (data.state === "result") {
        setOtherPlayerChoice(data.otherPlayerChoice);
        determineWinner(playerChoice, data.otherPlayerChoice);
      }
    }
  };

  const determineWinner = (playerChoice, otherPlayerChoice) => {
    if (playerChoice === otherPlayerChoice) {
      setWinner("It's a tie!");
    } else if (
      (playerChoice === "rock" && otherPlayerChoice === "scissors") ||
      (playerChoice === "paper" && otherPlayerChoice === "rock") ||
      (playerChoice === "scissors" && otherPlayerChoice === "paper")
    ) {
      setWinner("You win!");
    } else {
      setWinner("You lose!");
    }
  };

  useEffect(() => {
    const gameRef = doc(db, "game", "state");
    const unsubscribe = onSnapshot(gameRef, (doc) => {
      const data = doc.data();
      if (data) {
        setGameState(data.state);

        if (data.state === "result") {
          setOtherPlayerChoice(data.otherPlayerChoice);
          determineWinner(playerChoice, data.otherPlayerChoice);
        }
      }
    });

    getGameStateFromFirebase();

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Rock Paper Scissors</h1>

      {gameState === "" && (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handlePlayerChoice("rock")}>
            Rock
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handlePlayerChoice("paper")}>
            Paper
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handlePlayerChoice("scissors")}>
            Scissors
          </button>
        </div>
      )}

      {gameState === "result" && (
        <div>
          <p>Your choice: {playerChoice}</p>
          <p>Other player's choice: {otherPlayerChoice}</p>
          <p>Result: {winner}</p>
        </div>
      )}

      {gameState === "result" && (
        <div>
          <p>Waiting for the other player...</p>
        </div>
      )}
    </div>
  );
}

export default Play;
