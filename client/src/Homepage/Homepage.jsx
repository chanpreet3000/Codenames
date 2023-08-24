import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Homepage({ socket }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const createRoom = () => {
    socket.emit("createRoom");
    socket.on("roomCreatedWithId", (roomId) => {
      navigate(`/room/${roomId}`);
    });
  };
  useEffect(() => {
    var playerName = localStorage.getItem("playerName");
    if (playerName === null) playerName = "";
    setName(playerName);
  }, []);

  return (
    <div className="homepage-form">
      <h1>CodeNames</h1>
      <input
        className="homepage-input"
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(event) => {
          localStorage.setItem("playerName", event.target.value);
          setName(event.target.value);
        }}
      />
      <button className="homepage-btn">Join Room</button>
      <button className="homepage-btn" onClick={createRoom}>
        Create Room
      </button>
    </div>
  );
}
