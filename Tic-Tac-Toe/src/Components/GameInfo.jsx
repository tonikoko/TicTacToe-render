import React from "react";
import "/src/App.css";

const GameInfo = ({ currentPlayer, playingAs, opponentName, playerName }) => {
  return (
    <div className="game-info">
      <div
        className={`left ${
          currentPlayer === playingAs ? "current-move-" + currentPlayer : ""
        }`}
      >
        {playerName} <span>| {playingAs === "circle" ? "O" : "X"}</span>
      </div>
      <div
        className={`right ${
          currentPlayer !== playingAs ? "current-move-" + currentPlayer : ""
        }`}
      >
        {opponentName} <span>| {playingAs === "circle" ? "X" : "O"}</span>
      </div>
    </div>
  );
};

export default GameInfo;
