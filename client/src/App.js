import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import CreateRoom from "./CreateRoom/CreateRoom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage socket={socket} />} />
      <Route path="/room/:roomId" element={<CreateRoom socket={socket} />} />
    </Routes>
  );
}

export default App;
