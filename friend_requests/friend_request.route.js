const express = require("express");
const friendRequest = express.Router();
const { create, accept } = require("./friend_request.controller");

friendRequest.post("/", create);

friendRequest.patch("/:request_id/accept", accept);

module.exports = friendRequest;
