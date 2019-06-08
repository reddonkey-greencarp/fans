const superIndex = require('./routes/weibo/superIndex');
const weiboKeyword = require('./routes/weibo/keyword');
const express = require('express');
const app = express();

const port = 3000;

app.get('/weibo/super_index/:id', (req, res) => {
  let { id } = req.params;
  superIndex(id).then(data => {
    res.send(data);
  });
});

app.get('/weibo/super_index', (req, res) => {
  superIndex().then(data => {
    res.send(data);
  });
});

app.get('/weibo/keyword/:key', (req, res) => {
  let { key } = req.params;
  weiboKeyword(key).then(data => {
    res.send(data);
  });
});

app.get('/weibo/keyword', (req, res) => {
  weiboKeyword().then(data => {
    res.send(data);
  });
});

app.listen(port, () => console.log(`running at ${port}`));
