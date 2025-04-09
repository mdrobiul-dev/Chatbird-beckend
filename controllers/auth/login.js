const validateEmail = require("../../helpers/emailValidator");
const userSchema = require("../../modal/userSchema");
const jwt = require('jsonwebtoken');

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

    if(!existingUser.isVarified) return res.status(200).send("email not variefied")

    if(!existingUser) return res.status(200).send("email not found")
    
    const isUserValid = await existingUser.isPasswordValid(password);

    if(!isUserValid) {
        return res.status(400).send("password is incorrect")
    }

   const acces_token = jwt.sign({
        data: {
            email : existingUser.email,
            _id : existingUser._id
        }
      }, process.env.SECRET_KEY, { expiresIn: '24h' });

    const loggedUser = {
        email : existingUser.email,
        _id : existingUser._id,
        fullName : existingUser.fullName,
        avatar : existingUser.avatar,
        isVarified : existingUser.isVarified,
        createdAt : existingUser.createdAt,
        updatedAt : existingUser.updatedAt
    }

    res.status(200).send({message: "login succesful", user : loggedUser, acces_token})
}

module.exports = login