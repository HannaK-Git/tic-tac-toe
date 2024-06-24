import "./styles.css";
import Player from "./components/Player.js";
import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log.js";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.js";


// Initial game board state
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

/**
 * Determines the winner of the game based on the current game board state.
 * @param {Array} gameBoard - The current state of the game board.
 * @param {Object} players - An object containing player symbols and their respective names.
 * @returns {string|null} - The name of the winning player or null if there is no winner.
 */
function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

export default function App() {
  // State to track the active player ('X' or 'O')
  const [activePlayer, setActivePlayer] = useState("X");
  // State to track the history of game turns
  const [gameTurns, setGameTurns] = useState([]);
  // State to track player names
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  // Create a copy of the initial game board state
  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  // Update the game board based on the game turns
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  // Determine if there is a winner
  const winner = deriveWinner(gameBoard, players);
  // Determine if the game is a draw
  const hasDraw = gameTurns.length === 9 && !winner;

  /**
   * Handles the selection of a square on the game board.
   * @param {number} rowIndex - The row index of the selected square.
   * @param {number} colIndex - The column index of the selected square.
   */
  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0] == "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  /**
   * Handles a rematch by resetting the game turns.
   */
  function handleRematch() {
    setGameTurns([]);
  }

  /**
   * Handles the change of a player's name.
   * @param {string} symbol - The symbol of the player ('X' or 'O').
   * @param {string} newName - The new name of the player.
   */
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            onChangeName={handlePlayerNameChange}
            name="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            onChangeName={handlePlayerNameChange}
            name="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver rematch={handleRematch} winner={winner} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
