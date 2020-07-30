const FriendRequest = require("./friend_requests.model");
const User = require("../user/user.model")
const { internalErr, makeResponse } = require("../utils");

/**
 * @route
 * @param {Object} req
 * @param {Object} res
 * @description this will create a friend request
 */
const create = async ({ body: { raised_by, raised_to } }, res) => {
  try {
    const friendRequest = new FriendRequest({
      raised_by,
      raised_to,
      status: "created",
    });
    await friendRequest.save();
    res.send(makeResponse({ created: friendRequest.id }));
  } catch (error) {
    console.log("errr ::: ", error);
    internalErr(res);
  }
};

/**
 * @route
 * @param {Object} req
 * @param {Object} res
 * @description this will create a friend request
 */
const accept = async ({ params: { request_id } }, res) => {
  try {
    // get the friend request
    const friendRequest = await FriendRequest.findById(request_id);
    // update the friend list of user who raised the request
    const session = await User.startSession();
    await User.updateOne({ _id: friendRequest.raised_by }, { $push: { friends: friendRequest.raised_to } }).session(session)
    await User.updateOne({ _id: friendRequest.raised_to }, { $push: { friends: friendRequest.raised_by } }).session(session)
    await friendRequest.update({ status: "accepted" }).session(session);
    res.send(makeResponse({ accepted: request_id }));
    // update the friend list of user who accepted the request
  } catch (error) {
    console.log("errr ::: ", error);
    internalErr(res);
  }
};

// /**
//  * @route
//  * @param {Object} req
//  * @param {Object} res
//  * @description this will create a friend request
//  */
// const remove = ({ body: { raised_by, raised_to } }, res) => {
//     try {
//         const friendRequest = new FriendRequest({ raised_by, raised_to, status: "created" })
//         await friendRequest.save();
//         res.send(makeResponse({ created: friendRequest.id }))
//     } catch (error) {
//         console.log("errr ::: ", error)
//         internalErr(res)
//     }
// };

module.exports = { create, accept };
