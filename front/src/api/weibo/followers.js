import { NodeHost } from "../../config/const";
import axios from "axios";
/**
 * @typedef FollowersRes
 * @type {Object}
 *
 * @property {number} followers
 */

/**
 * @returns {Promise.<FollowersRes>}
 */
export default async () => {
  try {
    let resp = await axios.get(NodeHost + "/weibo/star/follower");
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};
