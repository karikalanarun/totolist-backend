const { internalErr, makeResponse } = require("../utils");
const User = require("./user.model");

const getAllUsers = async (_, res) => {
  try {
    const users = await User.find({}, "_id name email");
    res.send(makeResponse(users));
  } catch (error) {
    internalErr(res);
  }
};

module.exports = {
  getAllUsers,
};
