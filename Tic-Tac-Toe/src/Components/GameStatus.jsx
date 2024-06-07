import React from "react";
import "/src/App.css";

const GameOverScreen = ({ finishedState, playingAs, opponentName }) => {
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <div className="game-status">
      {finishedState &&
        finishedState !== "opponentLeftMatch" &&
        finishedState !== "draw" && (
          <h3 className="finished-state">
            Du hast{" "}
            {finishedState === playingAs ? "gewonnen 🥇" : "verloren 👎"}
          </h3>
        )}
      {finishedState &&
        finishedState !== "opponentLeftMatch" &&
        finishedState === "draw" && (
          <h3 className="finished-state">Es steht unentschieden</h3>
        )}
      {!finishedState && opponentName && (
        <h2>Du spielst gegen: {opponentName}</h2>
      )}
      {finishedState && finishedState === "opponentLeftMatch" && (
        <h3 className="finished-state">Dein Gegner ist gegangen</h3>
      )}
      {finishedState && (
        <button onClick={reloadPage} className="reload-button">
          Neues Spiel
        </button>
      )}
    </div>
  );
};

export default GameOverScreen;
