const express = require('express');
const postrouter = require('./post');
const commentrouter = require('./comments');
const router = express.Router();

// 홈페이지일 경우
router.get('/', (req, res) => {
    res.send("HJ's Blog!");
});
//posts router 연결
router.use('/posts', postrouter);

//comments router 연결
router.use('/posts/:postid/comments', commentrouter);

module.exports = router;
