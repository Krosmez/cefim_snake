import "./App.css";

import React, { useEffect, useState } from "react";

function App() {
  const [mapSize, setMapSize] = useState(20);
  const [speed, setSpeed] = useState(200);
  const [snake, setSnake] = useState([{ x: mapSize/2, y: mapSize/2 }]);
  const [food, setFood] = useState({ x: Math.random() * mapSize, y: Math.random() * mapSize });
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);

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

  return (
    <div className="game-board">
      {gameOver ? (
        <div className="game-over">Game Over</div>
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
  );
}

export default App;
