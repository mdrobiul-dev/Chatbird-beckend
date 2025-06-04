const express = require('express')
const cors = require('cors');
const router = require ("./router")
const dbConnect = require('./confiq/dbConnect')
require('dotenv').config()
const http = require('http');
const { Server } = require("socket.io");
const app = express()
app.use(express.json())
app.use(cors());
const httpServer  = http.createServer(app);


dbConnect()


const io = new Server(httpServer, {
  cors : "*"
});

global.io = io

// Store active users in memory
const activeUsers = new Map(); // userId => socketId

io.on("connection", (socket) => {
  // console.log("🔌 New socket connected:", socket.id);

  // Join a chat room
  socket.on("join_room", (conversationId) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} joined room: ${conversationId}`);
  });

  // Leave a chat room
  socket.on("leave_room", (conversationId) => {
    socket.leave(conversationId);
    console.log(`Socket ${socket.id} left room: ${conversationId}`);
  });

  // User comes online
  socket.on("join_user", (userId) => {
    activeUsers.set(userId, socket.id);
    // console.log(`User ${userId} is now active`);

    // Send updated active user list to all clients
    io.emit("active_users", Array.from(activeUsers.keys()));
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    for (const [userId, sockId] of activeUsers.entries()) {
      if (sockId === socket.id) {
        activeUsers.delete(userId);
        // console.log(`User ${userId} disconnected`);
        break;
      }
    }

    // Send updated list again after disconnect
    io.emit("active_users", Array.from(activeUsers.keys()));
  });
});

app.use(router)

httpServer.listen(8000, () => {
     console.log("server is running")
})