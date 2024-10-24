import "./App.css";

import React, { useEffect, useRef, useState } from "react";

import Container from "./components/Container";
import GameOver from "./components/GameOver";
import Header from "./components/Header";
import Modal from "./components/Modals/Modal";
import { useGlobalContext } from "./context/GlobalContext";

function App({}) {
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

  return (
    <>
      {gameOver && (
        <GameOver
          gameOver={gameOver}
          setGameOver={setGameOver}
          setScore={setScore}
          setDirection={setDirection}
          setSnake={setSnake}
          setFood={setFood}
          mapSize={mapSize}
          score={score}
        />
      )}
      <Header
        score={score}
        gameOver={gameOver}
        mapSize={mapSize}
        snakeSpeed={snakeSpeed}
        onMapChange={(e) => setMapSize(e)}
        onSpeedChange={(e) => setSnakeSpeed(e)}
      />
      <Container>
        <div
          className="game-board"
          style={{
            gridTemplateColumns: `repeat(${mapSize}, 20px)`,
            gridTemplateRows: `repeat(${mapSize}, 20px)`,
          }}
        >
          {Array.from({ length: mapSize }).map((_, row) =>
            Array.from({ length: mapSize }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                className={`cell ${
                  snake.some(
                    (segment) => segment.x === col && segment.y === row
                  )
                    ? "snake"
                    : food.x === col && food.y === row
                    ? "food"
                    : ""
                }`}
              />
            ))
          )}
        </div>
      </Container>
    </>
  );
}

export default App;
