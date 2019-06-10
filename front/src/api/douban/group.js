import { NodeHost } from "../../config/const";
import axios from "axios";

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
export default async () => {
  try {
    let resp = await axios.get(NodeHost + "/douban/group");
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};
