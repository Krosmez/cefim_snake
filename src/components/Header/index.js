import "./style.css";

import Container from "../Container";

export const Header = ({
  onMapChange,
  onSpeedChange,
  isStarted,
  onSubjectiveControlsChange,
}) => {
  const handleMapSizeChange = (event) => {
    onMapChange(event.target.value);
  };

  const handleSnakeSpeedChange = (event) => {
    onSpeedChange(event.target.value);
  };

  const handleSubjectiveControlsChange = () => {
    onSubjectiveControlsChange();
  };

  return (
    <header className="header">
      <Container>
        <h1>Simple Snake Game</h1>
        <div className="optionContainer">
          <div className="optionItem">
            <label htmlFor="subjectiveControls">Subjective Controls </label>
            <input
              type="checkbox"
              id="subjectiveControls"
              onChange={handleSubjectiveControlsChange}
              disabled={isStarted}
            />
          </div>
          <div className="optionItem">
            <label htmlFor="mapSize">Size </label>
            <input
              type="range"
              id="mapSize"
              min="16"
              max="32"
              onChange={handleMapSizeChange}
              disabled={isStarted}
            />
          </div>
          <div className="optionItem">
            <label htmlFor="snakeSpeed">Speed </label>
            <input
              type="range"
              id="snakeSpeed"
              min="100"
              max="900"
              onChange={handleSnakeSpeedChange}
              disabled={isStarted}
            />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
