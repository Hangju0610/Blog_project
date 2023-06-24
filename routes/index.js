const express = require('express');
const postrouter = require('./post');
const commentrouter = require('./comments');
const router = express.Router();

// 홈페이지일 경우
router.get('/', (req, res) => {
    res.send("HJ's Blog!");
});
//posts router 연결 후 commentrouter 연결
router.use('/posts', postrouter, commentrouter);

// comments router 연결
// 왜 이렇게 하면 안되는 지는 모르겠지만, 이렇게 하면 :postid를 req.params로 받아오지 못한다.
// router.use('/posts/:postid/comments', commentrouter);

module.exports = router;
