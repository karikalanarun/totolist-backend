const FriendRequest = require("./friend_requests.model");
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
    // const friendRequest = await
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
