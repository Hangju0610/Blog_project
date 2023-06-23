const express = require('express');
const router = express.Router();
const posts = require('../schemas/post');

// 전체 post 목록 가져오기
router.get('/', (req, res) => {
    res.json(posts);
});

// 하나만 post 목록 가져오기
router.get('/:postid', (req, res) => {
    const postid = Number(req.params.postid);
    const post = posts[postid];
    if (post) {
        res.json(post);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
