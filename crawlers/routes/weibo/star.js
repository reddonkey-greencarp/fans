const got = require('got');

module.exports = (uid = '5644764907') => {
  return new Promise((resolve, reject) => {
    got
      .get(`https://m.weibo.cn/api/container/getIndex`, {
        query: {
          type: 'uid',
          value: `${uid}`,
        },
        headers: {
          Referer: 'https://m.weibo.cn/',
        },
        json: true,
      })
      .then(resp => {
        resolve({
          followers: resp.body.data.userInfo.followers_count,
        });
      });
  });
};
