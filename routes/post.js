const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

// 게시판 생성하기
router.post("/", authMiddleware, postsController.createPost);

// 게시판 전체 가져오기 (수정 완료)
router.get("/", postsController.findAllPosts);

// 게시판 하나 가져오기
router.get("/:postId", postsController.findPost);

// 게시판 수정하기
router.put("/:postId", authMiddleware, postsController.updatePost);

// 게시판 지우기
router.delete("/:postId", authMiddleware, postsController.deletePost);

module.exports = router;
