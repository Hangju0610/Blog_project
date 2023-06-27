const express = require('express');
const router = express.Router();
const Comments = require('../schemas/comment');

// 댓글 생성하기
router.post('/:postId/comments', async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, userPassword, commentContent } = req.body;

        await Comments.create({ postId, userId, userPassword, commentContent });
        res.status(201).json({ message: '댓글을 생성하였습니다.' });
    } catch (err) {
        if (!req.body.commentContent) {
            res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
        } else {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        }
    }
});

// 댓글 전체 가져오기
router.get('/:postId/comments', async (req, res) => {
    try {
        // 게시판 하나의 댓글 전체를 가져오기 때문에, postid를 넣어줘야한다.
        const { postId } = req.params;
        const findCommentsList = await Comments.find({ postId: postId });
        // 빈 배열 생성
        const commentsList = findCommentsList.map((list) => {
            return {
                commentId: list['_id'],
                userId: list['userId'],
                commentContent: list['commentContent'],
                createdAt: list['createdAt'],
            };
        });
        const data = { data: commentsList };
        res.status(200).json(data);
    } catch (err) {
        res.status(404).send('message:' + err.message);
    }
});

// 댓글 수정하기
router.put('/:postId/comments/:commentId', async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { userPassword, commentContent } = req.body;

        const post = await Comments.find({ _id: commentId, postId });

        if (userPassword !== post[0]['userPassword']) {
            res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
        } else if (!commentContent) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        } else {
            await Comments.updateOne({ _id: commentId, postId }, { $set: { commentContent } });
            res.status(201).json({ message: '댓글을 수정하였습니다.' });
        }
    } catch (err) {
        res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
    }
});

// 댓글 지우기
router.delete('/:postId/comments/:commentId', async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { userPassword } = req.body.userPassword;
        const post = await Comments.find({ _id: commentId, postId });

        if (userPassword !== post[0]['userPassword']) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        } else {
            await Comments.deleteOne({ _id: commentId, postId });
            res.status(201).json({ message: '댓글을 삭제하었습니다.' });
        }
    } catch (err) {
        res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
    }
});

module.exports = router;
