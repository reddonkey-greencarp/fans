const got = require('got');

module.exports = async (questionId = '281732460') => {
  const sort = 'created';
  const limit = 20;
  const include = `data[*].content.excerpt&limit=${limit}&offset=0`;
  const url = `https://www.zhihu.com/api/v4/questions/${questionId}/answers`;
  let resp = await got.get(url, {
    query: {
      include: `${include}`,
      sort_by: `${sort}`,
    },
    json: true,
  });
  return resp.body.data.map(item => {
    return {
      question: item.question.title,
      questionURL: item.question.url,
      author: item.author.name,
      url: item.url,
      content: item.content,
    };
  });
};
