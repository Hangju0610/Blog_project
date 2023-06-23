const express = require('express');
const router = express.Router();
// const Posts = require('../schemas/post');

// 전체 post 목록 가져오기
router.post('/', async (req, res) => {
    try {
        const post = {
            user_id,
            user_password: req.body.user_password,
            post_title: req.body.post_title,
            post_content: req.body.post_content,
        };
        console.log('message: 데이터가 완료되었습니다.');
        res.json(post);
    } catch (err) {
        res.status(400).send('message: ' + err.message);
    }
});

// router.get('/', (req, res) => {
//     res.json(posts);
// });

// // 하나만 post 목록 가져오기
// router.get('/:postid', (req, res) => {
//     const postid = Number(req.params.postid);
//     const post = posts[postid];
//     if (post) {
//         res.json(post);
//     } else {
//         res.sendStatus(404);
//     }
// });

module.exports = router;
