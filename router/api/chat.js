const express = require('express');
const chatRoute = express.Router()

chatRoute.get("/hello", (req, res) => {

    res.send("chat route")
})

module.exports = chatRoute