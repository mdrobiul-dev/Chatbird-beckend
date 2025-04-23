const express = require('express');
const {createConverstion, conversationList}= require('../../controllers/conversationController');
const validUser = require('../../middlewears/authMiddlewear');
const chatRoute = express.Router()

chatRoute.post("/createconversation", validUser , createConverstion)
chatRoute.get("/conversationlist", validUser, conversationList)

module.exports = chatRoute