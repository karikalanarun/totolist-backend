const express = require("express");
const users = express.Router();
const { getAllUsers, getAllNonFriendUsers, getAllFriends } = require("./users.controller");

users.get("/", getAllUsers);

users.get("/non-friends", getAllNonFriendUsers)

users.get("/friends", getAllFriends)

module.exports = users;
