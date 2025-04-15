const cloudinary = require("../../confiq/cloudinary")
const userSchema = require("../../modal/userSchema");
const fs = require('fs');
const profileUpdate = async (req, res) => {
    try {
      const { fullName, password } = req.body;
      const updateFields = {};
  
      // Update name and password if sent
      if (fullName) updateFields.fullName = fullName.trim();
      if (password) updateFields.password = password;
  
      // If image was uploaded, upload to Cloudinary
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'avatars', // optional: Cloudinary folder
        });
  
        // Delete the local file after upload
        fs.unlinkSync(req.file.path);
  
        // Add Cloudinary URL to avatar field
        updateFields.avatar = result.secure_url;
      }
  
      // Update the user in DB — change this hardcoded ID to use from token or request
      const existingUser = await userSchema.findByIdAndUpdate(
        "67f7b116500343b6def6ed71", // <-- replace with dynamic user ID in real code
        updateFields,
        { new: true }
      );
  
      res.status(200).json({
        message: "Profile updated successfully",
        updatedUser: existingUser,
      });
  
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).send("Server error!");
    }
  };

module.exports = {profileUpdate}