const { exist } = require("joi");
const PostService = require("../services/posts.service");
const { postValidation } = require("../validations/posts-validation");

class PostsController {
  postService = new PostService();

  createPost = async (req, res) => {
    try {
      const { postTitle, postContent } = await postValidation.validateAsync(
        req.body
      );
      const { userId, nickname } = res.locals.user;

      const post = await this.postService.createPost(
        userId,
        nickname,
        postTitle,
        postContent
      );

      return res.status(201).json({ message: "게시글 생성 완료" });
    } catch (err) {
      console.error(err);
      if (err.isJoi) {
        return res.status(412).json({ error: err.message });
      }
      return res.status(500).json({ error: "서버 에러" });
    }
  };

  findAllPosts = async (_, res) => {
    try {
      const postsData = await this.postService.findAllPosts();
      return res.status(200).json({ posts: postsData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 에러" });
    }
  };

  findPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const postData = await this.postService.findPost(postId);

      return res.status(200).json({ post: postData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 에러" });
    }
  };

  updatePost = async (req, res) => {
    try {
      const { postId } = req.params;

      const { postTitle, postContent } = await postValidation.validateAsync(
        req.body
      );

      const existPost = await this.postService.existPost(postId);
      if (!existPost) {
        return res.status(404).json({ error: "게시글이 존재하지 않습니다." });
      }

      const updatePost = await this.postService.updatePost(
        postId,
        postTitle,
        postContent
      );
      if (!updatePost) {
        return res.status(401).json({ error: "업데이트 실패" });
      }
      return res.status(200).json({ message: "게시글 수정 성공" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 에러" });
    }
  };

  deletePost = async (req, res) => {
    try {
      const { postId } = req.params;

      const existPost = await this.postService.existPost(postId);
      if (!existPost) {
        return res.status(404).json({ error: "게시글이 존재하지 않습니다." });
      }

      const deletedPost = await this.postService.deletePost(postId);

      return res.status(201).json({ message: "게시글 삭제 완료" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 에러" });
    }
  };
}

module.exports = PostsController;
