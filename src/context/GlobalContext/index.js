import React, { createContext, useContext, useReducer } from "react";

const initLocalScoreBoard = () => {
  const scoreBoard = localStorage.getItem("scoreBoard");
  if (scoreBoard) {
    return JSON.parse(scoreBoard);
  } else {
    localStorage.setItem(
      "scoreBoard",
      JSON.stringify([{ name: "Player1", score: 0 }])
    );
  }
};
const initLocalParams = () => {
  const snakeParams = localStorage.getItem("snakeParams");
  if (snakeParams) {
    return JSON.parse(snakeParams);
  } else {
    localStorage.setItem("snakeParams", JSON.stringify([]));
  }
};

const initialState = {
  modal: null,
  scoreBoard: initLocalScoreBoard(),
  params: initLocalParams(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SCOREBOARD":
      return {
        ...state,
        scoreBoard: action.payload,
      };
    case "HANDLE_MODAL":
      return {
        ...state,
        modal: action.payload,
      };
    case "HANDLE_PARAMS":
      return {
        ...state,
        params: action.payload,
      };
    default:
      return state;
  }
};

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
