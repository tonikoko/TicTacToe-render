import React, { useState, useEffect } from "react";
import "./App.css";
import GameInfo from "./Components/GameInfo";
import GameBoard from "./Components/GameBoard";
import WaitingScreen from "./Components/WaitingScreen";
import GameOverScreen from "./Components/GameStatus";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const App = () => {
  const [gameState, setGameState] = useState(renderFrom);
  const [currentPlayer, setCurrentPlayer] = useState("circle");
  const [finishedState, setFinishedState] = useState(false);
  const [finishedArrayState, setFinishedArrayState] = useState([]);
  const [playOnline, setPlayOnline] = useState(false);
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState(null);
  const [playingAs, setPlayingAs] = useState(null);

  const checkWinner = () => {
    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
        return gameState[row][0];
      }
    }

    for (let col = 0; col < gameState.length; col++) {
      if (
        gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col]
      ) {
        setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
        return gameState[0][col];
      }
    }

    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    ) {
      return gameState[0][0];
    }

    if (
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0]
    ) {
      return gameState[0][2];
    }

    const isDrawMatch = gameState.flat().every((e) => {
      if (e === "circle" || e === "cross") return true;
    });

    if (isDrawMatch) return "draw";

    return null;
  };

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setFinishedState(winner);
    }
  }, [gameState]);

  const takePlayerName = async () => {
    const result = await Swal.fire({
      title: "Gib deinen Name ein",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Du musst etwas schreiben!";
        }
      },
    });

    return result;
  };

  const playOnlineClick = async () => {
    const result = await takePlayerName();

    if (!result.isConfirmed) {
      return;
    }

    const username = result.value;
    setPlayerName(username);

    const newSocket = io("http://localhost:3000", {
      autoConnect: true,
    });

    newSocket?.on("connect", () => {
      setPlayOnline(true);
      newSocket.emit("request_to_play", {
        playerName: username,
      });
    });

    setSocket(newSocket);
  };

  useEffect(() => {
    if (socket) {
      socket.on("opponentLeftMatch", () => {
        setFinishedState("opponentLeftMatch");
      });

      socket.on("playerMoveFromServer", (data) => {
        const id = data.state.id;
        setGameState((prevState) => {
          let newState = [...prevState];
          const rowIndex = Math.floor(id / 3);
          const colIndex = id % 3;
          newState[rowIndex][colIndex] = data.state.sign;
          return newState;
        });
        setCurrentPlayer(data.state.sign === "circle" ? "cross" : "circle");
      });

      socket.on("OpponentNotFound", () => {
        setOpponentName(false);
      });

      socket.on("OpponentFound", (data) => {
        setPlayingAs(data.playingAs);
        setOpponentName(data.opponentName);
      });
    }
  }, [socket]);

  if (!playOnline) {
    return (
      <div className="start-game">
        <button onClick={playOnlineClick} className="playOnline">
          Spiele online
        </button>
      </div>
    );
  }

  if (playOnline && !opponentName) {
    return <WaitingScreen />;
  }

  return (
    <div className="main-div">
      <GameInfo
        currentPlayer={currentPlayer}
        playingAs={playingAs}
        opponentName={opponentName}
        playerName={playerName}
      />
      <GameBoard
        gameState={gameState}
        setGameState={setGameState}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        finishedArrayState={finishedArrayState}
        setFinishedArrayState={setFinishedArrayState}
        socket={socket}
        playingAs={playingAs}
        finishedState={finishedState}
      />
      <GameOverScreen
        finishedState={finishedState}
        playingAs={playingAs}
        opponentName={opponentName}
      />
    </div>
  );
};

export default App;
