const axios = require("axios");
const { NodeHost } = require("../../config/const");

/**
 * @typedef GroupPost
 * @type {Object}
 *
 * @property {string} author - the author of the post in the group
 * @property {string} title - the title of the post
 * @property {string} content - the content of the post
 * @property {string} href - the link of the post
 */

/**
 * @returns {Promise.<Array.<GroupPost>>}
 */
module.exports = async () => {
  try {
    let resp = await axios.get(NodeHost + "/douban/group");
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};
