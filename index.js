const express = require('express');
const cors = require('cors');
const router = require('./router');
const dbConnect = require('./confiq/dbConnect');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());

// ✅ Correct frontend URL
const FRONTEND_URL = 'https://chatbird-28dg.onrender.com';

// ✅ Use updated CORS origin
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

const httpServer = http.createServer(app);

dbConnect();

// ✅ Use same FRONTEND_URL in Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

global.io = io;

const activeUsers = new Map(); 

io.on("connection", (socket) => {
  socket.on("join_room", (conversationId) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} joined room: ${conversationId}`);
  });

  socket.on("leave_room", (conversationId) => {
    socket.leave(conversationId);
    console.log(`Socket ${socket.id} left room: ${conversationId}`);
  });

  socket.on("join_user", (userId) => {
    activeUsers.set(userId, socket.id);
    io.emit("active_users", Array.from(activeUsers.keys()));
  });

  socket.on("disconnect", () => {
    for (const [userId, sockId] of activeUsers.entries()) {
      if (sockId === socket.id) {
        activeUsers.delete(userId);
        break;
      }
    }
    io.emit("active_users", Array.from(activeUsers.keys()));
  });
});

// Routes
app.use(router);

// Listen on dynamic port for Render
const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});        

