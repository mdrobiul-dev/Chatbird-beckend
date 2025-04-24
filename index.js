const express = require('express')
const router = require ("./router")
const dbConnect = require('./confiq/dbConnect')
require('dotenv').config()
const app = express()
const http = require('http');
const httpserver = http.createServer(app);
const { Server } = require("socket.io");
app.use(express.json())
app.use(router)


const io = new Server(httpserver, {
  cors : "*"
});

global.io = io

dbConnect()

router.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8000, () => {
     console.log("server is running")
})