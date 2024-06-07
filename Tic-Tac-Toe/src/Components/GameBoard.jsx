import React from "react";
import Square from "./Square";
import "/src/App.css";

const GameBoard = ({
  gameState,
  setGameState,
  currentPlayer,
  setCurrentPlayer,
  finishedArrayState,
  setFinishedArrayState,
  socket,
  playingAs,
  finishedState,
}) => {
  return (
    <div className="game-board">
      {gameState.map((arr, rowIndex) =>
        arr.map((e, colIndex) => {
          return (
            <Square
              key={rowIndex * 3 + colIndex}
              id={rowIndex * 3 + colIndex}
              socket={socket}
              playingAs={playingAs}
              gameState={gameState}
              finishedArrayState={finishedArrayState}
              finishedState={finishedState}
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              setGameState={setGameState}
              currentElement={e}
            />
          );
        })
      )}
    </div>
  );
};

export default GameBoard;
