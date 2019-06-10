import { NodeHost } from "../../config/const";
import axios from "axios";
/**
 * @typedef Post
 * @type {Object}
 * @property {string} title - the simplest content (without emoji and faces)
 * @property {string} createdAt - the create time, usually "刚刚" or "x分钟前"
 * @property {string} content - the content of post (may be null)
 * @property {string} pic - the url of the pic if has (null for none)
 * @property {number} comments - the number of comments
 * @property {number} likes - the numbers of likes
 * @property {string} reposts - the number of reports
 */

/**
 * @typedef StarRes
 * @type {Object}
 * @property {string} title - the title that can be directly displayed
 * @property {string} link - the link to the star's weibo
 * @property {string} image - the avatar of the star
 * @property {Post[]} items - the post of the star
 */

/**
 * @returns {Promise.<StarRes>}
 */
export default async () => {
  try {
    let resp = await axios.get(NodeHost + "/weibo/star");
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};
