import "./App.css";
import { useGlobalContext } from "./context/GlobalContext";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const { state, dispatch } = useGlobalContext();
  const [mapSize, setMapSize] = useState(16);
  const [snakeSpeed, setSnakeSpeed] = useState(100);
  const [snake, setSnake] = useState([{ x: mapSize / 2, y: mapSize / 2 }]);
  const [food, setFood] = useState({
    x: parseInt(Math.random() * mapSize),
    y: parseInt(Math.random() * mapSize),
  });
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const restartButtonRef = useRef(null);

 

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== 'DOWN') setDirection("UP");
          break;
        case "ArrowDown":
            if (direction !== 'UP') setDirection("DOWN");
          break;
        case "ArrowLeft":
            if (direction !== 'RIGHT') setDirection("LEFT");
          break;
        case "ArrowRight":
            if (direction !== 'LEFT') setDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
        default:
          break;
      }

      newSnake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * mapSize),
          y: Math.floor(Math.random() * mapSize),
        });
        setScore(score + 1);
      } else {
        newSnake.pop();
      }

      if (
        head.x < 0 ||
        head.x >= mapSize ||
        head.y < 0 ||
        head.y >= mapSize ||
        newSnake
          .slice(1)
          .some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
      } else {
        setSnake(newSnake);
      }
    };

    const interval = setInterval(moveSnake, snakeSpeed);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver]);

  useEffect(() => {
    console.log("state", state.scoreBoard);
  }, [state.scoreBoard]);

  /**
   * Save new score in scoreBoard
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newScoreBoard = [...state.scoreBoard, {  name,  score }];
    
    newScoreBoard.sort((a, b) => b.score - a.score);
    newScoreBoard.pop();
    dispatch({ type: "UPDATE_SCOREBOARD", payload: newScoreBoard });
    setScore(0);
    
  }
  useEffect(() => {
    if (gameOver && restartButtonRef.current) {
      restartButtonRef.current.focus();
    }
  }, [gameOver]);
    const handleMapSizeChange = (event) => {
        if (mapSize === event.target.value) return;
        setMapSize(event.target.value);
        setSnake([{ x: parseInt(event.target.value) / 2, y: parseInt(event.target.value) / 2 }]);
        setFood({ x: parseInt(Math.random() * event.target.value), y: parseInt(Math.random() * event.target.value) });
    };
    
    const handleSnakeSpeedChange = (event) => {
        if (snakeSpeed === event.target.value) return;
        setSnakeSpeed(event.target.value);
    }


    /** Modifier la valeur du champs text */
  function handleChange(e) {    
    setName( e.target.value );
  }
    return (
        <div>
        { gameOver &&
            <>
                <p className="game-over">Game Over</p>
                <button className="restart" onClick={ () => {
                    setGameOver(false);
                    setDirection("RIGHT");
                    setSnake([{ x: mapSize / 2, y: mapSize / 2 }]);
                    setFood({ x: parseInt(Math.random() * mapSize), y: parseInt(Math.random() * mapSize) });
                } }
                    ref={ restartButtonRef }
                >Restart</button>
                <form onSubmit={handleSubmit} >
                  <input type="text" value={name} label="input your name: " name="name" onChange={handleChange} />
                </form>
            </>
        }
        <div>
            <label htmlFor="mapSize">Map Size: </label>
            <select id="mapSize" onChange={handleMapSizeChange} disabled={!gameOver}>
                <option value={16}>Small</option>
                <option value={24}>Normal</option>
                <option value={32}>Huge</option>
            </select>
            <label htmlFor="mapSize">Snake Speed: </label>
            <select id="snakeSpeed" onChange={handleSnakeSpeedChange} disabled={!gameOver}>
                <option value={500}>Slow</option>
                <option value={250}>Normal</option>
                <option value={100}>Fast</option>
            </select>
        </div>
        <div className="game-info">
          <div>Score: {score}</div>
      </div>
      <div className="game-board" style={{gridTemplateColumns: `repeat(${mapSize}, 20px)`, gridTemplateRows: `repeat(${mapSize}, 20px)`}}>
        {Array.from({ length: mapSize }).map((_, row) =>
          Array.from({ length: mapSize }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              className={`cell ${
                snake.some((segment) => segment.x === col && segment.y === row)
                  ? "snake"
                  : food.x === col && food.y === row
                  ? "food"
                  : ""
              }`}
            />
          ))
        )
      }
    </div>
    </div>
  );
}

export default App;
