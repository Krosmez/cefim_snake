import "./App.css";

import React, { useEffect, useState } from "react";

import Container from "./components/Container";
import GameOver from "./components/GameOver";
import Header from "./components/Header";
import Map from "./components/Map";
import ScoreBoard from "./components/ScoreBoard";
import { useGlobalContext } from "./context/GlobalContext";

function App() {
  const { dispatch } = useGlobalContext();
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
  const [pause, setPause] = useState(true);
    const [isStarted, setIsStarted] = useState(false);
    const [subjectiveControls, setSubjectiveControls] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN" && !subjectiveControls) setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP" && !subjectiveControls) setDirection("DOWN");
          break;
          case "ArrowLeft":
              if (subjectiveControls) switch (direction) {
                  case "UP":
                      setDirection("LEFT");
                      break;
                  case "RIGHT":
                      setDirection("UP");
                      break;
                  case "DOWN":
                      setDirection("RIGHT");
                      break;
                  default:
                      setDirection("DOWN");
                      break;
              } else if (direction !== "RIGHT") setDirection("LEFT");
        break;
        case "ArrowRight":
            if (subjectiveControls) switch (direction) {
                case "UP":
                setDirection("RIGHT");
                break;
                case "RIGHT":
                setDirection("DOWN");
                break;
                case "DOWN":
                setDirection("LEFT");
                break;
                default:
                setDirection("UP");
                break;
            } else if (direction !== "LEFT") setDirection("RIGHT");
          break;
        case " ":
          setIsStarted(true);
          setPause(!pause);
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction, pause]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      if (pause) return;
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
        setPause(true);
        setIsStarted(false);
        setGameOver(true);
      } else {
        setSnake(newSnake);
      }
    };

    const interval = setInterval(moveSnake, snakeSpeed);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver, snakeSpeed, mapSize, score, pause]);

  useEffect(() => {
    if (gameOver) {
      dispatch({
        type: "HANDLE_MODAL",
        payload: (
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
        ),
      });
    }
  }, [dispatch, gameOver, mapSize, score]);

  return (
    <>
      <Header
        gameOver={gameOver}
        mapSize={mapSize}
        snakeSpeed={snakeSpeed}
        onMapChange={(e) => setMapSize(e)}
        onSpeedChange={(e) => setSnakeSpeed(e)}
        pause={pause}
        isStarted={ isStarted }
        onSubjectiveControlsChange={ () => setSubjectiveControls(!subjectiveControls) }
      />
      <Container>
        <div className="active-score">
          <span>Score: {score}</span>
        </div>
        <Map
          pause={pause}
          onClickPause={ () => {
            setPause(!pause);
            setIsStarted(true);
          } }
          isStarted={isStarted}
          mapSize={mapSize}
          snake={snake}
          food={food}
          direction={direction}
        />
        <ScoreBoard />
      </Container>
    </>
  );
}

export default App;
