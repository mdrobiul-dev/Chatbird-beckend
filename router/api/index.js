const express = require('express');
const authRout = require('./auth');
const chatRoute = require('./chat');
const apiRouter = express.Router()

apiRouter.use("/auth", authRout)
apiRouter.use("/chat", chatRoute)

module.exports = apiRouter