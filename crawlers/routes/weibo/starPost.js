const got = require('got');
const util = require('./utils');

module.exports = (uid = '5644764907') => {
  return new Promise(async (resolve, reject) => {
    const containerResp = await got.get({
      url: `https://m.weibo.cn/api/container/getIndex`,
      query: {
        type: 'uid',
        value: `${uid}`,
      },
      headers: {
        Referer: 'https://m.weibo.cn/',
      },
      json: true,
    });

    const name = containerResp.body.data.userInfo.screen_name;
    const profileImageUrl = containerResp.body.data.userInfo.profile_image_url;
    const containerid = containerResp.body.data.tabsInfo.tabs[1].containerid;
    got
      .get({
        url: `https://m.weibo.cn/api/container/getIndex`,
        query: {
          type: `uid`,
          value: `${uid}`,
          containerid: `${containerid}`,
        },
        headers: {
          Referer: `https://m.weibo.cn/u/${uid}`,
          'MWeibo-Pwa': 1,
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        },
        json: true,
      })
      .then(resp => {
        resolve({
          title: `${name}的微博`,
          link: `http://weibo.com/${uid}/`,
          image: profileImageUrl,
          items: resp.body.data.cards
            .filter(
              item =>
                item.mblog && !item.mblog.isTop && !item.mblog.retweeted_status
            )
            .map(item => {
              const content = util.format(item.mblog);
              const title = content
                .replace(/<img.*?>/g, '[图片]')
                .replace(/<.*?>/g, '');
              return {
                title,
                content: content,
                comments: item.mblog.comments_count,
                likes: item.mblog.attitudes_count,
                link: `https://weibo.com/${uid}/${item.mblog.bid}`,
              };
            }),
        });
      });
  });
};
