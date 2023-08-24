import React from "react";
import "./styles.css";

export default function PlayerCards({ players, admin }) {
  return (
    players && (
      <div className="player-cards">
        {players.map((player, ind) => {
          return (
            <div key={player.playerId} className="player-card">
              <div className="player-card-row">
                <span>{ind + 1 + ". " + player.name}</span>
                {player.playerId === admin && <span>(Admin)</span>}
              </div>
              <div className="player-card-id">{player.playerId}</div>
            </div>
          );
        })}
      </div>
    )
  );
}
