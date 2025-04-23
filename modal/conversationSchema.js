const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    participant: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    lastmessage: {
      type: Schema.Types.ObjectId,
      ref: "message",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversation", conversationSchema)