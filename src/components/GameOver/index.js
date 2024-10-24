import { useEffect, useRef, useState } from "react";

import Modal from "../Modals/Modal";
import { useGlobalContext } from "../../context/GlobalContext";

const GameOver = ({
  gameOver,
  setGameOver,
  setScore,
  setDirection,
  setSnake,
  setFood,
  mapSize,
  score,
}) => {
  const { dispatch, state } = useGlobalContext();
  const [name, setName] = useState("");

  /**
   * Save new score in scoreBoard
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const newScoreBoard = [...state.scoreBoard, { name, score }];

    newScoreBoard.sort((a, b) => b.score - a.score);
    newScoreBoard.pop();
    dispatch({ type: "UPDATE_SCOREBOARD", payload: newScoreBoard });
    setScore(0);
  };

  return (
    <Modal modalHeader="Game Over">
      <button
        className="restart"
        onClick={() => {
          setGameOver(false);
          setDirection("RIGHT");
          setSnake([{ x: mapSize / 2, y: mapSize / 2 }]);
          setFood({
            x: parseInt(Math.random() * mapSize),
            y: parseInt(Math.random() * mapSize),
          });
        }}
      >
        Restart
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          label="input your name: "
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </Modal>
  );
};

export default GameOver;
