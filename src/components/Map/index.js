import "./style.css";

import { useEffect, useState } from "react";

import grass from "../../assets/grass.jpg";

export const Map = ({
  pause,
  onClickPause,
  isStarted,
  mapSize,
  snake,
  food,
  direction,
}) => {
  const [isHead, setIsHead] = useState(snake[0]);

  useEffect(() => {
    setIsHead(snake[0]);
  }, [isHead, snake]);

  const bodySnake = (col, row) => {
    if (snake.some((segment) => segment.x === col && segment.y === row)) {
      return true;
    } else {
      return false;
    }
  };

  const isFoodEaten = (col, row) => {
    if (food.x === col && food.y === row) {
      return true;
    } else {
      return false;
    }
  };


  const isHeadSnake = (col, row) => {
    return isHead.x === col && isHead.y === row;
};

const getClassName = (col, row) => {
    let className = "";
    const headDirection = direction.toLowerCase();

    if (isHeadSnake(col, row)) {
        className += `snake-head snake-head-${headDirection}`;
    } else if (bodySnake(col, row)) {
        const segmentIndex = snake.findIndex(segment => segment.x === col && segment.y === row);
        const prevSegment = snake[segmentIndex - 1];
        const nextSegment = snake[segmentIndex + 1];

        if (segmentIndex === snake.length - 1) {
            // Tail segment
            className += "snake-tail";
            if (prevSegment) {
                if (prevSegment.x < col) {
                    className += " snake-tail-left";
                } else if (prevSegment.x > col) {
                    className += " snake-tail-right";
                } else if (prevSegment.y < row) {
                    className += " snake-tail-up";
                } else if (prevSegment.y > row) {
                    className += " snake-tail-down";
                }
            }
        } else if (prevSegment && nextSegment) {
            if (prevSegment.x === nextSegment.x) {
                className += "snake-body-vertical";
            } else if (prevSegment.y === nextSegment.y) {
                className += "snake-body-horizontal";
            } else {
                if ((prevSegment.x < col && nextSegment.y < row) || (nextSegment.x < col && prevSegment.y < row)) {
                    className += "snake-turn-top-left";
                } else if ((prevSegment.x > col && nextSegment.y < row) || (nextSegment.x > col && prevSegment.y < row)) {
                    className += "snake-turn-top-right";
                } else if ((prevSegment.x < col && nextSegment.y > row) || (nextSegment.x < col && prevSegment.y > row)) {
                    className += "snake-turn-bottom-left";
                } else if ((prevSegment.x > col && nextSegment.y > row) || (nextSegment.x > col && prevSegment.y > row)) {
                    className += "snake-turn-bottom-right";
                }
            }
        } else {
            className += "snake-body-horizontal"; // Default class if no previous or next segment
        }
    } else if (isFoodEaten(col, row)) {
        className += "food";
    }
    return className;
};
    
    const cellSize={width: `${42-mapSize}px`, height: `${42-mapSize}px`};

  return (
    <div className="game-board-container">
      {pause && (
        <div className="pause-overlay">
          <span className="pause-icon" onClick={onClickPause}>
            {isStarted ? "⏸️" : "▶️"}
          </span>
        </div>
      )}
      <div
        className="game-board"
        style={{
          gridTemplateColumns: `repeat(${mapSize}, ${42-mapSize}px)`,
          gridTemplateRows: `repeat(${mapSize}, ${42-mapSize}px)`,
        }}
      >
        {Array.from({ length: mapSize }).map((_, row) =>
          Array.from({ length: mapSize }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              className={`cell ${getClassName(col, row)}`}
              style={
                snake.some(
                  (segment) => segment.x === col && segment.y === row
                ) ||
                (food.x === col && food.y === row)
                  ? {...cellSize}
                  : { backgroundImage: `url(${grass})`, ...cellSize }
              }
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Map;
