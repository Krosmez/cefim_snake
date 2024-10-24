import React, { createContext, useContext, useReducer } from "react";

const initialLocalStorage = () => {
    const scoreBoard = localStorage.getItem("scoreBoard");
    if (scoreBoard) {
        return JSON.parse(scoreBoard);
    } else {
        localStorage.setItem("scoreBoard", JSON.stringify([{ name: "Player1", score: 0 }]));
    }
}
const initialState = {
  modal: null,
  scoreBoard: initialLocalStorage(),
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
