import { NodeHost } from "../../config/const";
import axios from "axios";
/**
 * @typedef Post
 * @type {Object}
 * @property {string} createdAt - the create time, usually "刚刚" or "x分钟前"
 * @property {string} content - the content of post (may be null)
 * @property {string} pic - the url of the pic if has (null for none)
 * @property {number} comments - the number of comments
 * @property {number} likes - the numbers of likes
 */

/**
 * @typedef KeywordRes
 * @type {Object}
 * @property {string} title - the title that you could directly display, it will usually be "又有人在微博提到杨超越了"
 * @property {string} link - the link of the search result
 * @property {Post[]} items - the posts that gots
 */

/**
 * get weibo keyword searching results
 * @param {string} key The keyword you want
 * @default "杨超越"
 * @returns {Promise.<KeywordRes>} - data the result data
 */
export default async (key = "杨超越") => {
  try {
    let resp = await axios.get(
      NodeHost + "/weibo/keyword/" + encodeURIComponent(key)
    );
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};
