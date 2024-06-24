import "../styles.css";

/**
 * GameBoard component renders the game board for a tic-tac-toe game.
 * @param {function} onSelectSquare - Function to handle square selection.
 * @param {Array} board - 2D array representing the game board state.
 */

export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* Call onSelectSquare with the row and column indices when the 
                button is clicked */}
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {/* Disable the button if the cell already has a player symbol */}
                  {playerSymbol}
                </button>{" "}
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
