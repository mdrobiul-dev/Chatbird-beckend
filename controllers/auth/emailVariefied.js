const userSchema = require("../../modal/userSchema");

const emailvariefied  = async (req, res) => {

    const {email, otp} = req.body; 

    if (!email) return res.status(400).send("email is required");

    if (!otp) return res.status(400).send("otp is required");

const variefiedUser  = await userSchema.findOne({email, otp, otpExpiredAt : {$gt:Date.now()}})

if(!variefiedUser ) return res.status(400).send("invalid request");

variefiedUser.otp = null ;
variefiedUser.otpExpiredAt = null ;
variefiedUser.isVarified = true ;
await variefiedUser.save() ;

res.status(200).send("Registration succesfull , email variefied succesfull ")

}

module.exports = emailvariefied 