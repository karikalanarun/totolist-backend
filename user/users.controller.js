const { internalErr, makeResponse } = require("../utils");
const User = require("./user.model");

const getAllUsers = async (_, res) => {
  try {
    const users = await User.find({}, "_id first_name second_name email");
    res.send(makeResponse(users));
  } catch (error) {
    internalErr(res);
  }
};

const getAllNonFriendUsers = async ({ user: { id } }, res) => {
  try {
    const users = await User.find({
      _id: { $nin: [id] },
      friends: { $nin: [id] }
    }, "_id first_name last_name second_name email");
    res.send(makeResponse(users));
  } catch (error) {
    console.log("error ::: ", error)
    internalErr(res);
  }
}

const getAllFriends = async ({ user: { id } }, res) => {
  try {
    const user = await User.findById(id, "friends").populate("friends", ["id", "first_name", "second_name", "email"]);
    console.log("user ::: ", user)
    res.send(makeResponse(user.friends))
  } catch (error) {
    console.log("error ::: ", error)
    internalErr(res);
  }
}

module.exports = {
  getAllUsers,
  getAllNonFriendUsers,
  getAllFriends
};
