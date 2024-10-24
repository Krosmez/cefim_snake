import "./style.css";

import React from "react";

import Container from "../Container";
import { useGlobalContext } from "../../context/GlobalContext";

export default function ScoreBoard() {
  const { state } = useGlobalContext();
  const scoreBoard = state.scoreBoard;

  return (
    <div className="leaderboard">
      <Container>
        <h1>Leaderboard</h1>
        <ul className="scoreList">
          {scoreBoard
            ?.slice(0, 20)
            .sort((a, b) => b.score - a.score)
            .map((item, index) => (
              <li key={index} className="scoreItem">
                {item.name}: {item.score}
              </li>
            ))}
        </ul>
      </Container>
    </div>
  );
}
