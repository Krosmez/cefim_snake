import "./style.css";

import Container from "../Container";

export const Header = ({
  onMapChange,
  onSpeedChange,
  mapSize,
  snakeSpeed,
  isStarted,
}) => {
  const handleMapSizeChange = (event) => {
    if (mapSize === event.target.value) return;
    onMapChange(event.target.value);
  };

  const handleSnakeSpeedChange = (event) => {
    if (snakeSpeed === event.target.value) return;
    onSpeedChange(event.target.value);
  };

  return (
    <header className="header">
      <Container>
        <h1>Simple Snake Game</h1>
        <div className="optionContainer">
          <label htmlFor="mapSize">Map Size: </label>
          <select
            id="mapSize"
            onChange={handleMapSizeChange}
                      disabled={ isStarted }
          >
            <option value={16}>Small</option>
            <option value={24}>Normal</option>
            <option value={32}>Huge</option>
          </select>
        </div>
        <div className="optionContainer">
          <label htmlFor="mapSize">Snake Speed: </label>
          <select
            id="snakeSpeed"
            onChange={handleSnakeSpeedChange}
            disabled={isStarted}
          >
            <option value={500}>Slow</option>
            <option value={250}>Normal</option>
            <option value={100}>Fast</option>
          </select>
        </div>
      </Container>
    </header>
  );
};

export default Header;
