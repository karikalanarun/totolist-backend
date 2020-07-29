const User = require("./user.model");

/**
 * @function getAllWatchingIssueIds
 * @param {String} userId
 * @return {Promise<[{watching_issues: []String}]>}
 */
const getAllWatchingIssueIds = (userId) => {
    return User.findById(userId, 'watching_issues')
}

module.exports = { getAllWatchingIssueIds }