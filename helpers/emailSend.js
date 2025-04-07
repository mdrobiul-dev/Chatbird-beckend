const nodemailer = require("nodemailer");
const sendingEmail = async (email, subject, template, otp, fullName) => {
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
          from: '"Chatweb Support" <robiulhassanrobi33@gmail.com>', // clean & professional
          to: email,
          subject: subject,
          html: template(otp , fullName),
        };
    
        const info = await transporter.sendMail(mailOptions);
    
}

module.exports = sendingEmail