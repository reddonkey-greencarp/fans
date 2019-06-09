const axios = require("axios");
const { NodeHost } = require("../../config/const");

/**
 * @typedef Answer
 * @type {Object}
 * @property {string} question - the simplest content (without emoji and faces)
 * @property {string} questionURL - the url of the question
 * @property {string} content - the content of answer
 * @property {string} url - the url of the answer
 * @property {string} author - the author of the answer
 */

/**
 * @typedef Question
 * @type {Array.<Answer>}
 */

/**
 * @returns {Promise.<Question>}
 */
module.exports = async () => {
  try {
    let resp = await axios.get(NodeHost + "/zhihu/question");
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};
