const userSchema = require("../../modal/userSchema");

const profileUpdate = async (req, res) => {

    const {fullName, password, avatar} = req.body;

    const updateFileds = {};

    if(fullName) updateFileds.fullName = fullName;
    if(password) updateFileds.password = password;
    if(avatar) updateFileds.avatar = avatar;

    const existngUser = await userSchema.findByIdAndUpdate("", updateFileds, {new : true})

    res.status(200).send(updateFileds)
}

module.exports = {profileUpdate}