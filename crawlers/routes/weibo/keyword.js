const got = require('got');
const util = require('./utils');

module.exports = (keyword = '杨超越') => {
  return new Promise((resolve, reject) => {
    got
      .get(`https://m.weibo.cn/api/container/getIndex`, {
        query: {
          containerid: `100103type%3D61%26q%3D${encodeURIComponent(
            keyword
          )}%26t%3D0`,
        },
        headers: {
          Referer: `https://m.weibo.cn/p/searchall?containerid=100103type%3D1%26q%3D${encodeURIComponent(
            keyword
          )}`,
          'MWeibo-Pwa': 1,
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        },
        json: true,
      })
      .then(resp => {
        let data = resp.body.data.cards[0].card_group;
        resolve({
          title: `又有人在微博提到${keyword}了`,
          link: `http://s.weibo.com/weibo/${encodeURIComponent(
            keyword
          )}&b=1&nodup=1`,
          item: data.map(item => {
            return {
              createdAt: item.mblog.created_at,
              content: util.format(item.mblog),
              pic:
                item.mblog.pics instanceof Array && item.mblog.pics.length > 0
                  ? item.mblog.pics[0].large.url
                  : null,
              comments: item.mblog.comments_count,
              likes: item.mblog.attitudes_count,
              link: `https://weibo.com/${item.mblog.user.id}/${item.mblog.bid}`,
            };
          }),
        });
      });
  });
};
