const express = require('express');
const registration = require('../../controllers/auth/registration');
const login = require('../../controllers/auth/login');
const authRout = express.Router()

authRout.post("/registration", registration)

authRout.post("/login", login)

module.exports = authRout