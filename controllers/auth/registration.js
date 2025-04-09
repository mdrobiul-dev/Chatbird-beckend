const sendingEmail = require("../../helpers/emailSend");
const validateEmail = require("../../helpers/emailValidator");
const {emailTemplates} = require("../../helpers/temPlates");
const userSchema = require("../../modal/userSchema");

//registration function

const registration = async (req, res) => {
  const { fullName, email, password, avatar } = req.body;

  // Basic validation
  if (!fullName) return res.status(400).send("fullName is required");
  if (!email) return res.status(400).send("email is required");
  if (!password) return res.status(400).send("password is required");
  if (!validateEmail(email)) return res.status(400).send("Email is invalid");

  
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) return res.status(400).send("Email is already in use");

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpiredAt = new Date(Date.now() + 5 * 60 * 1000)

    // Save user to DB
    const userData = new userSchema({ fullName, email, password, avatar, otp , otpExpiredAt });
    await userData.save();

    sendingEmail(email, "variefy your email", emailTemplates, otp, fullName)


    return res.status(200).send("Registration successful. OTP sent to your email.");
  
};



module.exports = registration;
