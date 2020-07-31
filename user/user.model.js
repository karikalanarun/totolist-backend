const mongoose = require("mongoose");

const User = mongoose.model("User", {
  first_name: String,
  last_name: String,
  email: { type: String, unique: true, index: true },
  password: String,
  friends: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  todos: [{ type: mongoose.SchemaTypes.ObjectId, ref: "TodoList" }]
});

module.exports = User;
