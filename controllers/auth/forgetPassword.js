const sendingEmail = require("../../helpers/emailSend");
const { generateRandomString } = require("../../helpers/randomeString");
const { forgetPasswordTemplate } = require("../../helpers/temPlates");
const userSchema = require("../../modal/userSchema");

const forgotPassword = async (req, res) => {
    const  {email}  = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await userSchema.findOne({email})

    if(!existingUser) return res.status(400).send("invalid credential")

    // initiate password reset logic 

    const randomString = generateRandomString(25)
 
    existingUser.randomString = randomString;
    existingUser.linkExpiredAt = new Date(Date.now() + 5 * 60 * 1000);
    await existingUser.save()

    sendingEmail(email, "Reset Your password", forgetPasswordTemplate, randomString)

    res.status(200).json({ message: "Password reset instructions sent to email" });
};

module.exports = { forgotPassword };