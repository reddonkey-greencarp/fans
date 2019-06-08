const weiboUtils = {
  format: status => {
    // 长文章的处理
    let temp =
      (status.longText &&
        status.longText.longTextContent.replace(/\n/g, '<br>')) ||
      status.text ||
      '';
    // 去掉外部链接的图标
    temp = temp.replace(
      /<span class=["|']url-icon["|']>.*?网页链接<\/span>/g,
      '网页链接'
    );
    // 表情图标转换为文字
    temp = temp.replace(
      /<span class="url-icon"><img.*?alt="(.*?)".*?><\/span>/g,
      '$1'
    );
    // 去掉乱七八糟的图标
    temp = temp.replace(/<span class=["|']url-icon["|']>(.*?)<\/span>/g, '');
    // 去掉全文
    temp = temp.replace(/全文<br>/g, '<br>');
    temp = temp.replace(/<a href="(.*?)">全文<\/a>/g, '');

    // 处理外部链接
    temp = temp.replace(
      /https:\/\/weibo\.cn\/sinaurl\/.*?&u=(http.*?")/g,
      function(match, p1) {
        return decodeURIComponent(p1);
      }
    );

    // 处理转发的微博
    if (status.retweeted_status) {
      return null;
    }

    return temp;
  },
};

module.exports = weiboUtils;
