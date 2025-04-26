const express = require('express');
const {createConverstion, conversationList}= require('../../controllers/conversationController');
const validUser = require('../../middlewears/authMiddlewear');
const { messageSend, getmessage } = require('../../controllers/messageController');


const chatRoute = express.Router()

chatRoute.post("/createconversation", validUser , createConverstion)
chatRoute.get("/conversationlist", validUser, conversationList)
chatRoute.post("/sendmessage", validUser, messageSend)
chatRoute.get("/getmessage/:conversationId", validUser, getmessage)

module.exports = chatRoute