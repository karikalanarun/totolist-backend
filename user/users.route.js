const express = require('express');
const users = express.Router();
const { getAllUsers } = require("./users.controller")

users.get('/', getAllUsers);

module.exports = users;
