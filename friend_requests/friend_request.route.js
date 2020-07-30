const express = require("express");
const friendRequest = express.Router();
const { create, accept, getAllPendingRequests, getAllRequestsRaisedByUser } = require("./friend_request.controller");

friendRequest.post("/", create);

friendRequest.patch("/:request_id/accept", accept);

friendRequest.get("/pending_requests", getAllPendingRequests)

friendRequest.get("/request_by_user", getAllRequestsRaisedByUser)

module.exports = friendRequest;
