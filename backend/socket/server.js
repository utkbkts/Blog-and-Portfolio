import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

const app = express();
const server = http.createServer(app);
dotenv.config();

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  onlineUsers.push(socket.id);

  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user !== socket.id);

    io.emit("onlineUsers", onlineUsers);
  });
});

export { app, io, server };
