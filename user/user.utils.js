const User = require("./user.model");

/**
 * @function getFriendsIds
 * @param {String} userId
 * @return {Promise<[{watching_issues: []String}]>}
 */
const getFriendsIds = (userId) => {
    return User.findById(userId, 'friends')
}

/**
 * @function getFriendsIds
 * @param {String} userId
 * @return {Promise<[{watching_issues: []String}]>}
 */
const getUser = (userId) => {
    return User.findById(userId, 'id email first_name last_name')
}

module.exports = { getFriendsIds, getUser }