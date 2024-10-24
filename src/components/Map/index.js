import "./style.css";

import grass from "../../assets/grass.jpg";

export const Map = ({
  pause,
  onClickPause,
  isStarted,
  mapSize,
  snake,
  food,
}) => {
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
              className={`cell ${
                snake.some((segment) => segment.x === col && segment.y === row)
                  ? "snake"
                  : food.x === col && food.y === row
                  ? "food"
                  : ""
              }`}
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
