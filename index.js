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




const io = new Server(httpServer, {
  cors : "*"
});

global.io = io

dbConnect()

app.use(router)

httpServer.listen(8000, () => {
     console.log("server is running")
})