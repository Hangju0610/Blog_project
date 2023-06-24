const express = require('express');
const router = express.Router();
const Comments = require('../schemas/comment');

// 댓글 생성하기
router.post('/:postid/comments', async (req, res) => {
    try {
        await Comments.create({
            post_id: req.params.postid,
            user_id: req.body.user_id,
            user_password: req.body.user_password,
            comment_content: req.body.comment_content,
        });
        res.status(201).json({ message: '댓글을 생성하였습니다.' });
    } catch (err) {
        if (!req.body.comment_content) {
            res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
        } else {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        }
    }
});

// 댓글 전체 가져오기
router.get('/:postid/comments', async (req, res) => {
    try {
        // 게시판 하나의 댓글 전체를 가져오기 때문에, postid를 넣어줘야한다.
        const postid = req.params.postid;
        // console.log(req.params);
        // console.log(postid);
        const commentlist = await Comments.find({ post_id: postid });
        const data = { data: commentlist };
        res.status(200).json(data);
    } catch (err) {
        res.status(404).send('message:' + err.message);
    }
});

// 댓글 하나 가져오기
router.get('/:postid/comments/:commentid', async (req, res) => {
    try {
        const postid = req.params.postid;
        const commentid = req.params.commentid;
        const comment = await Comments.find({ _id: commentid, post_id: postid });
        const data = { data: comment };

        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
});

// 댓글 수정하기
router.put('/:postid/comments/:commentid', async (req, res) => {
    try {
        const postid = req.params.postid;
        const commentid = req.params.commentid;
        const body_password = req.body.user_password;
        const body_content = req.body.comment_content;

        const post = await Comments.find({ _id: commentid, post_id: postid });

        if (body_password !== post[0]['user_password']) {
            res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
        } else if (!body_content) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        } else {
            await Comments.updateOne({ _id: commentid, post_id: postid }, { $set: { comment_content: body_content } });
            res.status(201).json({ message: '댓글을 수정하였습니다.' });
        }
    } catch (err) {
        res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
    }
});

// 댓글 지우기
router.delete('/:postid/comments/:commentid', async (req, res) => {
    try {
        const postid = req.params.postid;
        const commentid = req.params.commentid;
        const body_password = req.body.user_password;
        const post = await Comments.find({ _id: commentid, post_id: postid });

        if (body_password !== post[0]['user_password']) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        } else {
            await Comments.deleteOne({ _id: commentid, post_id: postid });
            res.status(201).json({ message: '댓글을 삭제하었습니다.' });
        }
    } catch (err) {
        res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
    }
});

module.exports = router;
