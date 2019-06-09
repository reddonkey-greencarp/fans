const superIndex = require('./routes/weibo/superIndex');
const weiboKeyword = require('./routes/weibo/keyword');
const weiboStar = require('./routes/weibo/starPost');
const weiboFollowers = require('./routes/weibo/star');
const doubanGroup = require('./routes/douban/group');
const zhihuQuestion = require('./routes/zhihu/question');
const express = require('express');
const cors = require('cors');
const app = express();

const port = 3001;

app.use(cors());

app.get('/weibo/super_index/:id', (req, res) => {
  let { id } = req.params;
  superIndex(id)
    .then(data => {
      res.send(data);
    })
    .catch(error => console.log(error));
});

app.get('/weibo/super_index', (req, res) => {
  superIndex()
    .then(data => {
      res.send(data);
    })
    .catch(error => console.log(error));
});

app.get('/weibo/keyword/:key', (req, res) => {
  let { key } = req.params;
  weiboKeyword(key)
    .then(data => {
      res.send(data);
    })
    .catch(error => console.log(error));
});

app.get('/weibo/keyword', (req, res) => {
  weiboKeyword()
    .then(data => {
      res.send(data);
    })
    .catch(error => console.log(error));
});

app.get('/weibo/star', (req, res) => {
  weiboStar()
    .then(data => {
      res.send(data);
    })
    .catch(error => console.log(error));
});

app.get('/weibo/star/follower', (req, res) => {
  weiboFollowers()
    .then(data => {
      res.send(data);
    })
    .catch(error => console.log(error));
});

app.get('/douban/group', (req, res) => {
  doubanGroup()
    .then(data => {
      res.send(data);
    })
    .catch(error => console.log(error));
});

app.get('/zhihu/question', (req, res) => {
  zhihuQuestion()
    .then(data => {
      res.send(data);
    })
    .catch(error => console.log(error));
});

app.listen(port, () => console.log(`running at ${port}`));
