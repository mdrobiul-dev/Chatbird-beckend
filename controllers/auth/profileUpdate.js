const cloudinary = require("../../confiq/cloudinary")
const userSchema = require("../../modal/userSchema");
const fs = require('fs');
const profileUpdate = async (req, res) => {
  try {
    const { fullName, password } = req.body;
    const updateFields = {};

    if (fullName) updateFields.fullName = fullName.trim();
    if (password) updateFields.password = password;

    // 👇 use req.user.id from validUser middleware
    const userId = req.user.id;

    // 🔍 fetch current user from DB
    const user = await userSchema.findById(userId);

    if (req.file) {
      // 🗑️ delete old image from Cloudinary
      if (user.avatarPublicId) {
        await cloudinary.uploader.destroy(user.avatarPublicId);
      }

      // ⬆️ upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
      });

      fs.unlinkSync(req.file.path);

      updateFields.avatar = result.secure_url;
      updateFields.avatarPublicId = result.public_id;
    }

    // ✏️ update user in DB
    const updatedUser = await userSchema.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      updatedUser,
    });

  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).send("Server error!");
  }
};


module.exports = {profileUpdate}