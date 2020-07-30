const express = require("express");
const users = express.Router();
const { getAllUsers, getAllNonFriendUsers } = require("./users.controller");

users.get("/", getAllUsers);

users.get("/non-friends", getAllNonFriendUsers)

module.exports = users;
