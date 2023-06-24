const express = require('express');
const router = express.Router();
const Posts = require('../schemas/post');

// 게시판 생성하기
router.post('/', async (req, res) => {
    try {
        await Posts.create({
            user_id: req.body.user_id,
            user_password: req.body.user_password,
            post_title: req.body.post_title,
            post_content: req.body.post_content,
        });
        res.status(201).json({ message: '게시글을 생성하였습니다.' });
    } catch (err) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
});

// 게시판 전체 가져오기
router.get('/', async (req, res) => {
    try {
        const findPosts = await Posts.find({});
        // 빈 배열 생성 (비밀번호 및 내용 제거를 위한)
        const postlist = [];
        //
        for (let key in findPosts) {
            postlist[key] = {}; // 요소를 빈 객체로 초기화

            postlist[key]['postid'] = findPosts[key]['_id'];
            postlist[key]['user_id'] = findPosts[key]['user_id'];
            postlist[key]['post_title'] = findPosts[key]['post_title'];
            postlist[key]['created_at'] = findPosts[key]['created_at'];
        }
        console.log(postlist);
        const data = { data: postlist };
        res.status(200).json(data);
    } catch (err) {
        res.status(404).send('message:' + err.message);
    }
});

// 게시판 하나 가져오기
router.get('/:postid', async (req, res) => {
    try {
        const postid = req.params.postid;
        const findpost = await Posts.find({ _id: postid });
        // 비밀번호 없게 새로운 객체 생성하기
        const post = {
            postid: findpost[0]['_id'],
            user_id: findpost[0]['user_id'],
            post_title: findpost[0]['post_title'],
            post_content: findpost[0]['post_content'],
            created_at: findpost[0]['created_at'],
        };
        const data = { data: post };

        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
});

// 게시판 수정하기
router.put('/:postid', async (req, res) => {
    try {
        const postid = req.params.postid;
        const body_password = req.body.user_password;
        const body_title = req.body.post_title;
        const body_content = req.body.post_content;

        const post = await Posts.find({ _id: postid });

        if (body_password !== post[0]['user_password']) {
            res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
        } else if (!body_title || !body_content) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        } else {
            await Posts.updateOne({ _id: postid }, { $set: { post_title: body_title, post_content: body_content } });
            res.status(201).json({ message: '게시글을 수정하였습니다.' });
        }
    } catch (err) {
        res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
    }
});

// 게시판 지우기
router.delete('/:postid', async (req, res) => {
    try {
        const postid = req.params.postid;
        const body_password = req.body.user_password;
        const post = await Posts.find({ _id: postid });

        if (body_password !== post[0]['user_password']) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        } else {
            await Posts.deleteOne({ _id: postid });
            res.status(201).json({ message: '게시글을 삭제되었습니다.' });
        }
    } catch (err) {
        res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
    }
});

module.exports = router;
