const nodemailer = require("nodemailer");
const validateEmail = require("../../helpers/emailValidator");
const userSchema = require("../../modal/userSchema");

const registration = async (req, res) => {
  const { fullName, email, password, avatar } = req.body;

  // Basic validation
  if (!fullName) return res.status(400).send("fullName is required");
  if (!email) return res.status(400).send("email is required");
  if (!password) return res.status(400).send("password is required");
  if (!validateEmail(email)) return res.status(400).send("Email is invalid");

  try {
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) return res.status(400).send("Email is already in use");

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpiredAt = new Date(Date.now() + 5 * 60 * 1000)

    // Save user to DB
    const userData = new userSchema({ fullName, email, password, avatar, otp , otpExpiredAt });
    await userData.save();

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "robiulhassanrobi33@gmail.com",
        pass: "pegg iyln xikz fhiy", // Make sure this is a valid app password
      },
    });

    // Send email
    const mailOptions = {
      from: '"MyApp Support" <robiulhassanrobi33@gmail.com>', // clean & professional
      to: email,
      subject: "Email Verification",
      html: `<p>Hello ${fullName},</p><p>Your OTP for email verification is: <strong>${otp}</strong></p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    return res.status(200).send("Registration successful. OTP sent to your email.");
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).send("Something went wrong. Please try again later.");
  }
};

module.exports = registration;
