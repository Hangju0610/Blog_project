const express = require('express');
const router = express.Router();
const Posts = require('../schemas/post');

// 전체 post 목록 가져오기
router.post('/', async (req, res) => {
    try {
        const createPost = await Posts.create({
            user_id: req.body.user_id,
            user_password: req.body.user_password,
            post_title: req.body.post_title,
            post_content: req.body.post_content,
        });
        console.log('"message": "데이터가 완료되었습니다."');
        res.status(201).json(createPost);
    } catch (err) {
        res.status(400).send('message:' + err.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const postlist = await Posts.find({});
        const data = { data: postlist };
        res.status(200).json(data);
    } catch (err) {
        res.status(404).send('message:' + err.message);
    }
});

router.get('/:postid', async (req, res) => {
    try {
        const postid = req.params.postid;
        const post = await Posts.find({ _id: postid });
        const data = { data: post };

        res.status(200).json(data);
    } catch (err) {
        res.status(404).send('message:' + err.message);
    }
});

router.put('/:postid', async (req, res) => {
    try {
        const postid = req.params.postid;
        const body_password = req.body.user_password;
        const body_title = req.body.post_title;
        const body_content = req.body.post_content;

        const post = await Posts.find({ _id: postid });

        if (body_password !== post[0]['user_password']) {
            res.status(400).send('message: 비밀번호가 일치하지 않습니다.');
        } else if (!body_title || !body_content) {
            res.status(400).send('message: 데이터 형식이 올바르지 않습니다.');
        } else {
            const updatePost = await Posts.updateOne(
                { _id: postid },
                { $set: { post_title: body_title, post_content: body_content } }
            );
            res.status(200).json(updatePost);
        }
    } catch (err) {
        res.status(404).send('message:' + err.message);
    }
});

module.exports = router;
