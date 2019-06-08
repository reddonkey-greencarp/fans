const got = require('got');

module.exports = async (groupid = '640516') => {
  const resp = await got.get({
    url: `https://api.douban.com/v2/group/${groupid}/topics`,
    query: {
      start: 0,
      count: 20,
    },
  });
  let data = JSON.parse(resp.body);
  return data.topics.map(item => {
    return {
      author: item.author.name,
      title: item.title,
      content: item.content,
      href: item.alt,
    };
  });
};
