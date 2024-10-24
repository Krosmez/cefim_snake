import "./style.css";

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
    if (isHead.x === col && isHead.y === row) {
      return true;
    } else {
      return false;
    }
  };

  const getClassName = (col, row) => {
    let className = "";
    const headDirection = direction.toLowerCase();

    if (isHeadSnake(col, row)) {
      className += `snake-head snake-head-${headDirection}`;
    } else if (bodySnake(col, row)) {
      className += "snake";
    } else if (isFoodEaten(col, row)) {
      className += "food";
    }
    return className;
  };

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
          gridTemplateColumns: `repeat(${mapSize}, 20px)`,
          gridTemplateRows: `repeat(${mapSize}, 20px)`,
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
                  ? {}
                  : { backgroundImage: `url(${grass})` }
              }
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Map;
