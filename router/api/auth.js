const express = require('express');
const registration = require('../../controllers/auth/registration');
const login = require('../../controllers/auth/login');
const emailvariefied = require('../../controllers/auth/emailVariefied');
const authRout = express.Router()

authRout.post("/registration", registration)
authRout.post("/emailvariefication", emailvariefied)
authRout.post("/login", login)

module.exports = authRout