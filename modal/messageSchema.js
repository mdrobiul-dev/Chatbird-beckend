const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reciever: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "conversation",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
