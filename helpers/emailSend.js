const nodemailer = require("nodemailer");
const sendingEmail = async (email, subject, template, random, fullName) => {
     // Setup nodemailer
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "robiulhassanrobi33@gmail.com",
            pass: "pegg iyln xikz fhiy", 
          },
        });
    
        // Send email
        const mailOptions = {
          from: '"Chatweb Support" <robiulhassanrobi33@gmail.com>', 
          to: email,
          subject: subject,
          html: template(random , fullName || ""),
        };
    
        const info = await transporter.sendMail(mailOptions);
    
}

module.exports = sendingEmail