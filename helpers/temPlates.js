const emailTemplates = (otp, fullName) => {
    return  `
      <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f2f2f2;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2f2f2; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h2 style="color: #333333;">Email Verification</h2>
              </td>
            </tr>
            <tr>
              <td style="color: #555555; font-size: 16px; line-height: 1.5;">
                <p>Hi <strong>${fullName}</strong>,</p>
                <p>Thank you for registering. Please use the OTP below to verify your email address:</p>
                <p style="font-size: 24px; font-weight: bold; color: #4CAF50; letter-spacing: 4px;">${otp}</p>
                <p>This code will expire in 5 minutes. If you didn’t request this, you can safely ignore this email.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 30px;">
                <p style="color: #999999; font-size: 12px;">© 2025 Chatweb. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
    `
}

module.exports = emailTemplates