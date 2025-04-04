const validateEmail = require("../../helpers/emailValidator");
const userSchema = require("../../modal/userSchema");

const login = async (req, res) => {

    const {email, password} = req.body;

    if(!email) {
        return res.status(400).send("email is required")
    }

    if(!validateEmail(email)) {
        return res.status(400).send("Email is invalid")
    }

    if(!password) {
        return res.status(400).send("password is required")
    }

    const existingUser = await userSchema.findOne({email})
    
    const isUserValid = await existingUser.isPasswordValid(password);

    if(!isUserValid) {
        return res.status(400).send("password is incorrect")
    }

    res.status(200).send("this is login page")
}

module.exports = login