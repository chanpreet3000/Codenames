import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import PlayerCards from "../PlayerCard/PlayerCards";
import Settings from "../Settings/Settings";

export default function CreateRoom({ socket }) {
  const { roomId } = useParams();
  const [error, setError] = useState(false);
  const [settings, setSettings] = useState({
    "Total words": "20",
    "Time to guess words": "120",
    "Elimination Word": "True",
  });
  const [roomPlayers, setRoomPlayers] = useState({});

  useEffect(() => {
    tryToJoinRoom();
  }, []);

  const tryToJoinRoom = () => {
    socket.emit("joinRoomWithId", { roomId, name: localStorage.getItem("playerName") });
    socket.on("roomDoesNotExists", () => {
      setError(true);
      console.error("Room doesnot exists");
    });
    socket.on("roomJoinedWithId", (roomId) => {
      socket.on("roomGameStateChanged", (roomGameState) => {
        console.log("roomGameStateChanged with ", roomGameState);
      });
      socket.on("roomSettingsChanged", (settings) => {
        console.log("Chaning the settings set by the admin");
        setSettings(settings);
      });
      socket.on("roomPlayerListChanged", (playersInfo) => {
        setRoomPlayers(playersInfo);
      });
    });
  };

  const onSettingsChange = (settings) => {
    if (!isAdmin()) return;
    socket.emit("changeRoomSettings", { roomId, settings });
  };

  const isAdmin = () => {
    return roomPlayers.admin === socket.id;
  };

  return error ? (
    <div>Room with ID {roomId} not found!</div>
  ) : (
    <>
      <div className="create-room__container">
        <h1>Room ID: {roomId}</h1>
        <div className="create-room__wrapper">
          <div className="create-room__players">
            <div className="create-room__title">Players</div>
            <PlayerCards players={roomPlayers.players} admin={roomPlayers.admin} />
          </div>
          <div className="create-room__settings">
            <div className="create-room__title">Settings</div>
            <Settings admin={isAdmin()} onSettingsChange={onSettingsChange} values={settings} />
          </div>
        </div>
      </div>
    </>
  );
}
