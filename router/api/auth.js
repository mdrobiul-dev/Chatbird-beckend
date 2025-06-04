const express = require('express');
const { registration, emailvariefied, forgotPassword, resetPassword, profileUpdate, login, resentOtp } = require('../../controllers/authController');

const validUser = require('../../middlewears/authMiddlewear');
const upload = require('../../middlewears/multer');

const authRout = express.Router()

authRout.post("/registration", registration)
authRout.post("/emailvariefication", emailvariefied)
authRout.post("/resentotp", resentOtp)
authRout.post("/login", login)
authRout.post("/forgetpassword", forgotPassword)
authRout.post("/resetpassword/:randomString", resetPassword)
authRout.post("/profileupdate",validUser, upload.single('avatar'), profileUpdate)

module.exports = authRout