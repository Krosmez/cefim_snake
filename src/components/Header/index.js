import "./style.css";

import Container from "../Container";
import { useGlobalContext } from "../../context/GlobalContext";

export const Header = ({
  onMapChange,
  onSpeedChange,
  isStarted,
  onSubjectiveControlsChange,
}) => {
  const { state, dispatch } = useGlobalContext();
  const handleMapSizeChange = (event) => {
    onMapChange(event.target.value);
    dispatch({
      type: "HANDLE_PARAMS",
      payload: { ...state.params, mapSize: event.target.value },
    });
    localStorage.setItem("snakeParams", JSON.stringify(state.params));
  };

  const handleSnakeSpeedChange = (event) => {
    onSpeedChange(event.target.value);
    dispatch({
      type: "HANDLE_PARAMS",
      payload: { ...state.params, snakeSpeed: event.target.value },
    });
    localStorage.setItem("snakeParams", JSON.stringify(state.params));
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
              value={state.params?.mapSize || 16}
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
              value={state.params?.snakeSpeed || 500}
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
