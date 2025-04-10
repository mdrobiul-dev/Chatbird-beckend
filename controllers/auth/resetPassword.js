const userSchema = require("../../modal/userSchema");

const resetPassword = async (req, res) => {
    const {randomString} = req.params.randomString;
    const {email} = req.query.email;
    const { newPassword} = req.body;

    if(!randomString) return res.status(400).send("invalid credential")
    if(!email) return res.status(400).send("invalid credential")

    const existingUser = await userSchema.findOne({email})

    if(!existingUser) return res.status(400).send("invalid credential")

    if(existingUser.randomString !== randomString || existingUser.linkExpiredAt < Date.now()) return res.status(400).send("invalid credential")

     existingUser.password = newPassword ;
     existingUser.randomString = null;
     existingUser.linkExpiredAt = null;
     await existingUser.save();

     res.status(200).send("password reset succesfull")
}

module.exports = resetPassword