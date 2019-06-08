const axios = require("axios");
const { NodeHost } = require("../../config/const");

/**
 * @typedef FollowersRes
 * @type {Object}
 *
 * @property {number} followers
 */

/**
 * @returns {Promise.<FollowersRes>}
 */
module.exports = async () => {
  try {
    let resp = await axios.get(NodeHost + "/weibo/star/follower");
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};
