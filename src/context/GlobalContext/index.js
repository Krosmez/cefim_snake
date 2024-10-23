import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  scoreBoard:[
    { name: "Satan", score: 666 },
    { name: "Player 02", score: 2 },
    { name: "Player 03", score: 3 },
    { name: "Jonathan", score: 100 },
    { name: "Player 05", score: 5 },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SCOREBOARD":
      return {
        ...state,
        scoreBoard: action.payload,
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