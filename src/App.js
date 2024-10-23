import "./App.css";

import React, { useEffect, useState } from "react";

function App() {
  const [mapSize, setMapSize] = useState(20);
  const [speed, setSpeed] = useState(200);
  const [snake, setSnake] = useState([{ x: mapSize/2, y: mapSize/2 }]);
  const [food, setFood] = useState({ x: parseInt(Math.random() * mapSize), y: parseInt(Math.random() * mapSize) });
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [scoreBoard, setScoreBoard] = useState([
    { name: "Player 1", score: 10 },
    { name: "Player 2", score: 20 },
    { name: "Player 3", score: 30 },
    { name: "Player 4", score: 40 },
    { name: "Player 5", score: 50 },
  ]);
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection("UP");
          break;
        case "ArrowDown":
          setDirection("DOWN");
          break;
        case "ArrowLeft":
          setDirection("LEFT");
          break;
        case "ArrowRight":
          setDirection("RIGHT");
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
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        });
        setScore(score + 1);
      } else {
        newSnake.pop();
      }

      if (
        head.x < 0 ||
        head.x >= 20 ||
        head.y < 0 ||
        head.y >= 20 ||
        newSnake
          .slice(1)
          .some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
      } else {
        setSnake(newSnake);
      }
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver]);

  /**
   * Save new score in scoreBoard
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newScoreBoard = [...scoreBoard, {  name,  score }];
    
    // newScoreBoard.sort((a, b) => b.score - a.score);
    // newScoreBoard.pop();
    setScoreBoard(newScoreBoard);
    setScore(0);
    
  }
  /**
   * Local Storage for Score Board
   */
  useEffect(() => {
    localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
    console.log(scoreBoard);

  }, [scoreBoard]);

  function handleChange(e) {
    // console.log(e.target.value);
    
    setName( e.target.value );
  }

  return (
    <div class="game">
      <div className="game-board">
        {gameOver ? (
          <div className="game-over">
            <h1>Game Over</h1>
            <form  onSubmit={handleSubmit} >
              <input type="text" value={name} label="input your name: " name="name" onChange={handleChange} />
            </form>
          </div>
        ) : (
          Array.from({ length: 20 }).map((_, row) =>
            Array.from({ length: 20 }).map((_, col) => (
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
        )}
      </div>
      <div className="game-info">
        <div>Score: {score}</div>
      </div>
    </div>
  );
}

export default App;
