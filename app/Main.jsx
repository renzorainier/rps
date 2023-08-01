
import React, { useState } from "react";
import Play from "./Play.jsx";
import Player2 from "./Player2.jsx";

const Main = () => {
  const [showMain, setShowMain] = useState(true);
  const [showPlayer1, setShowPlayer1] = useState(false);
  const [showPlayer2, setShowPlayer2] = useState(false);

  const handlePlayer1ButtonClick = () => {
    setShowMain(false);
    setShowPlayer1(true);
  };

  const handlePlayer2ButtonClick = () => {
    setShowMain(false);
    setShowPlayer2(true);
  };

  return (
    <>
      {showMain && (
        <div className="flex flex-col items-center justify-center h-screen">
          <button
            onClick={handlePlayer1ButtonClick}
            className="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Player 1
          </button>
          <button
            onClick={handlePlayer2ButtonClick}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Player 2
          </button>
        </div>
      )}
      {showPlayer1 && <Play />}
      {showPlayer2 && <Player2 />}
    </>
  );
};

export default Main;
