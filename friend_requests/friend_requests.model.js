const mongoose = require("mongoose");

const FriendRequest = mongoose.model("friend_requests", {
  raised_by: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  raised_to: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["created", "accepted", "rejected"],
    default: "created",
  },
});

module.exports = FriendRequest;
