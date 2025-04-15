const userSchema = require("../../modal/userSchema");

const profileUpdate = async (req, res) => {

    try {
        const {fullName, password, avatar} = req.body;

    const updateFileds = {};

    if(fullName) updateFileds.fullName = fullName.trim();
    if(password) updateFileds.password = password;
    if(avatar) updateFileds.avatar = avatar;

    const existngUser = await userSchema.findByIdAndUpdate("67f7b116500343b6def6ed71", updateFileds, {new : true})

    res.status(200).send(updateFileds)
    } catch (error) {
        res.status(500).send("Server error!")
    }
}

module.exports = {profileUpdate}