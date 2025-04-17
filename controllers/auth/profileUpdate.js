const cloudinary = require("../../confiq/cloudinary")
const userSchema = require("../../modal/userSchema");
const fs = require('fs');
const profileUpdate = async (req, res) => {
    try {
      const { fullName, password } = req.body;
      const updateFields = {};

      if (fullName) updateFields.fullName = fullName.trim();
      if (password) updateFields.password = password;
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'avatars', 
        });

        console.log(result)
  
        fs.unlinkSync(req.file.path);
  
        updateFields.avatar = result.secure_url;
      }

      const existingUser = await userSchema.findByIdAndUpdate(
        "67f7b116500343b6def6ed71",
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