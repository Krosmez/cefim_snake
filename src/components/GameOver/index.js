import "./style.css";

import Modal from "../Modals/Modal";
import { useGlobalContext } from "../../context/GlobalContext";
import { useState } from "react";

const GameOver = ({
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
        dispatch({ type: "UPDATE_SCOREBOARD", payload: newScoreBoard });
        localStorage.setItem("scoreBoard", JSON.stringify(newScoreBoard));
        setScore(0);
    };

    return (
        <Modal modalHeader="Game Over" setGameOver={setGameOver}>
            <div className="modal-body">
                <h2>Your score: {score}</h2>
                <ul className="a">
                    {state.scoreBoard.slice(0, 3).map((item, index) => (
                        <li key={index}>
                            {item.name}: {item.score}
                        </li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="modal-footer">
                        <input
                            type="text"
                            value={ name }
                            placeholder="Enter your name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button onClick={handleSubmit}>Save</button>
                </div>
            </form>
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
        </Modal>
    );
};

export default GameOver;
