const express = require('express');
const {createConverstion, conversationList}= require('../../controllers/conversationController');
const validUser = require('../../middlewears/authMiddlewear');
const { messageSend } = require('../../controllers/messageController');


const chatRoute = express.Router()

chatRoute.post("/createconversation", validUser , createConverstion)
chatRoute.get("/conversationlist", validUser, conversationList)
chatRoute.post("/sendmessage", validUser, messageSend)

module.exports = chatRoute