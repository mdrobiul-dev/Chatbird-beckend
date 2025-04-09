const { generateRandomString } = require("../../helpers/randomeString");
const userSchema = require("../../modal/userSchema");

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await userSchema.findOne({email})

    if(!existingUser) return res.status(400).send("invalid credential")

    // Here you'd normally initiate password reset logic (e.g., send reset link)
 
    const randomString = generateRandomString(25)

    existingUser.randomString = randomString;
    existingUser.linkExpiredAt = linkExpiredAt;
    existingUser.save()


    res.status(200).json({ message: "Password reset instructions sent to email" });
};

module.exports = { forgotPassword };