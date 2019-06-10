import { NodeHost } from "../../config/const";
import axios from "axios";
/**
 * @typedef SuperIndexRes
 * @type {Object}
 *
 * @property {string} title - the title of the super index
 * @property {string} link - the link of the super index
 * @property {string} description - the description of the super index ("#杨超越# 的超话")
 * @property {string} detail - the detail of the super index ("阅读230.3亿　帖子48.1万　粉丝57.3万")
 * @property {string} rank - the rank of the star
 */

/**
 * @returns {Promise.<SuperIndexRes>}
 */
export default async () => {
  try {
    let resp = await axios.get(NodeHost + "/weibo/super_index");
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};
