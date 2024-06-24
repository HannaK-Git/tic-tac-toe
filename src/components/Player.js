import { useState } from "react";
import "../styles.css";

/**
 * Player component represents a player in the game with the ability to edit their name.
 * @param {string} name - The initial name of the player.
 * @param {string} symbol - The symbol associated with the player (e.g., 'X' or 'O').
 * @param {boolean} isActive - Indicates if the player is currently active.
 * @param {function} onChangeName - Function to handle name change.
 */
export default function Player({ name, symbol, isActive, onChangeName }) {
  // State to track if the name is being edited
  const [isEditing, setIsEditing] = useState(false);
  // State to track the player's name
  const [playerName, setPlayerName] = useState(name);

  /**
   * Toggle the editing state and call onChangeName if editing is being stopped.
   */
  function handleEditing() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  /**
   * Update the playerName state with the new value from the input field.
   * @param {object} event - The event object from the input field.
   */
  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
