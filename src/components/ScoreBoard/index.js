import './style.css';
import { useGlobalContext } from "../../context/GlobalContext";

import React from 'react'

export default function ScoreBoard() {
    const { state } = useGlobalContext();
    const scoreBoard = state.scoreBoard;

    return (
        <div className="leaderboard">
            ⭐
            <h1>Leaderboard</h1>
            <ul className="a">
                {scoreBoard.slice(0,20).sort((a, b) => b.score - a.score).map((item, index) => (
                    <li key={index}>
                        {item.name}: {item.score}
                    </li>
                )) }
            </ul>
            ⭐
      </div>
  )
}
