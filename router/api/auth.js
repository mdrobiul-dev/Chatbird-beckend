const express = require('express');
const registration = require('../../controllers/auth/registration');
const login = require('../../controllers/auth/login');
const emailvariefied = require('../../controllers/auth/emailVariefied');
const { forgotPassword } = require('../../controllers/auth/forgetPassword');
const resetPassword = require('../../controllers/auth/resetPassword');
const { profileUpdate } = require('../../controllers/auth/profileUpdate');
const validUser = require('../../middlewears/authMiddlewear');
const upload = require('../../middlewears/multer');

const authRout = express.Router()

authRout.post("/registration", registration)
authRout.post("/emailvariefication", emailvariefied)
authRout.post("/login", login)
authRout.post("/forgetpassword", forgotPassword)
authRout.post("/resetpassword/:randomString", resetPassword)
authRout.post("/profileupdate",validUser, upload.single('avatar'), profileUpdate)

module.exports = authRout