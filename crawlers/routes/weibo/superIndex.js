const got = require('got');

// 杨超越ID
const id = '1008082a98366b6a3546bd16e9da0571e34b84';
module.exports = (indexID = id) => {
  return new Promise((resolve, reject) => {
    got
      .get('https://m.weibo.cn/api/container/getIndex', {
        query: {
          containerid: `${indexID}_-_feed`,
          luicode: '10000011',
          lfid: `${indexID}_-_main`,
        },
        headers: {
          Referer: `https://m.weibo.cn/p/index?containerid=${indexID}_-_soul&luicode=10000011&lfid=${indexID}_-_main`,
          'MWeibo-Pwa': '1',
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
      })
      .then(resp => {
        try {
          resolve({
            title: `微博超话 - ${resp.body.data.pageInfo.page_title}`,
            link: `https://weibo.com/p/${indexID}/super_index`,
            description: `#${resp.body.data.pageInfo.page_title}# 的超话`,
            detile: `${resp.body.data.pageInfo.desc_more}`,
            rank: `${resp.body.data.pageInfo.portrait_sub_text}`,
          });
        } catch {
          reject();
        }
      });
  });
};
