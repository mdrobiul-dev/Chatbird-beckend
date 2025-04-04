const validateEmail = require("../../helpers/emailValidator")
const userSchema = require("../../modal/userSchema")

const registration = async (req, res) => {

    const {fullName, email, password, avatar} = req.body

    if(!fullName) {
        return res.status(400).send("fullName is required")
    }

    if(!email) {
        return res.status(400).send("email is required")
    }

    if(!password) {
        return res.status(400).send("password is required")
    }

    if(!validateEmail(email)) {
        return res.status(400).send("Email is invalid")
    }
    if(existingUser) {
        return res.status(400).send("Email is already in use")
    }
    const userData = new userSchema({
        fullName, email, password, avatar
    })

   await userData.save()

    res.send(userData)
}

module.exports = registration