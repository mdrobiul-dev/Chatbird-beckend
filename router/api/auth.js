const express = require('express');
const registration = require('../../controllers/auth/registration');
const login = require('../../controllers/auth/login');
const emailvariefied = require('../../controllers/auth/emailVariefied');
const { forgotPassword } = require('../../controllers/auth/forgetPassword');
const authRout = express.Router()

authRout.post("/registration", registration)
authRout.post("/emailvariefication", emailvariefied)
authRout.post("/login", login)
authRout.post("/forgetpassword", forgotPassword)
authRout.post("/resetpassword", forgotPassword)

module.exports = authRout