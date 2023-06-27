const express = require('express');
const router = express.Router();
const Posts = require('../schemas/post');

// 게시판 생성하기
router.post('/', async (req, res) => {
    try {
        const { userId, userPassword, postTitle, postContent } = req.body;

        await Posts.create({
            userId,
            userPassword,
            postTitle,
            postContent,
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
        const postList = findPosts.map((post) => {
            return {
                postId: post['_id'],
                userId: post['userId'],
                postTitle: post['postTitle'],
                createdAt: post['createdAt'],
            };
        });
        const data = { data: postList };
        res.status(200).json(data);
    } catch (err) {
        res.status(404).send('message:' + err.message);
    }
});

// 게시판 하나 가져오기
router.get('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const findPost = await Posts.find({ _id: postId });
        // 비밀번호 없게 새로운 객체 생성하기
        const post = {
            postId: findPost[0]['_id'],
            userId: findPost[0]['userId'],
            postTitle: findPost[0]['postTitle'],
            postContent: findPost[0]['postContent'],
            createdAt: findPost[0]['createdAt'],
        };
        const data = { data: post };

        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
});

// 게시판 수정하기
router.put('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const { userPassword, postTitle, postContent } = req.body;

        const post = await Posts.find({ _id: postId });

        if (userPassword !== post[0]['userPassword']) {
            res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
        } else if (!postTitle || !postContent) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        } else {
            await Posts.updateOne({ _id: postId }, { $set: { postTitle, postContent } });
            res.status(201).json({ message: '게시글을 수정하였습니다.' });
        }
    } catch (err) {
        res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
    }
});

// 게시판 지우기
router.delete('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const { userPassword } = req.body;

        const post = await Posts.find({ _id: postId });

        if (userPassword !== post[0]['userPassword']) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        } else {
            await Posts.deleteOne({ _id: postId });
            res.status(201).json({ message: '게시글을 삭제되었습니다.' });
        }
    } catch (err) {
        res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
    }
});

module.exports = router;
