const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const PORT = 8000;
const cors = require("cors");
const { handlePlayerConnection } = require("./connectionManager");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  handlePlayerConnection(io, socket);
});

server.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
