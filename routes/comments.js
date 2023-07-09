const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");

const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();

// 댓글 생성하기
router.post(
  "/:postId/comments",
  authMiddleware,
  commentsController.createComment
);

// 댓글 전체 가져오기
router.get("/:postId/comments", commentsController.findAllComments);

// 댓글 수정하기
router.put(
  "/:postId/comments/:commentId",
  authMiddleware,
  commentsController.updateComment
);

// 댓글 지우기
router.delete("/:postId/comments/:commentId", authMiddleware);

module.exports = router;
