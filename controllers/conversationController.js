const conversationSchema = require("../modal/conversationSchema");
const userSchema = require("../modal/userSchema");

const createConverstion = async (req, res) => {
  try {
    const { participantemail } = req.body;

    if (!participantemail) {
      return res.status(400).send({ error: "email is required" });
    }

    if (participantemail === req.user.email) {
      return res.status(400).send({ error: "try with another email" });
    }

    const participantUserData = await userSchema.findOne({
      email: participantemail,
    });

    if (!participantUserData) {
      return res.status(400).send({ error: "no user found" });
    }

    const existingConversation = await conversationSchema.findOne({
      $or: [
        { creator: req.user._id, participant: participantUserData._id },
        { creator: participantUserData._id, participant: req.user._id },
      ],
    });

    if (existingConversation) {
      return res.status(400).send({ error: "conversation alreadry exist" });
    }

    const conversation = new conversationSchema({
      creator: req.user._id,
      participant: participantUserData._id,
    });

    await conversation.save();

    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send({ error: "server error" });
  }
};

const conversationList = async (req, res) => {
  try {
    const conversation = await conversationSchema
      .find({
        $or: [{ creator: req.user._id }, { participant: req.user._id }],
      })
      .populate("creator", "fullName email avatar")
      .populate("participant", "fullName email avatar")
      .populate("lastmessage").sort({ 'updatedAt': -1 })
;

    if (!conversation) {
      return res.status(200).send({ error: "No conversation yet" });
    }

    return res.status(200).send({ success: conversation });
  } catch (error) {
      res.status(500).send("Server error!");
  }
};

module.exports = { createConverstion, conversationList };
