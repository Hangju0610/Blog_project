const CommentService = require("../services/comments.service");

const { commentsValidation } = require("../validations/comments-validation");

class CommentsController {
  commentService = new CommentService();

  createComment = async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId, nickname } = res.locals.user;
      const { commentContent } = await commentsValidation.validateAsync(
        req.body
      );

      const existPost = await this.commentService.existPost(postId);
      if (!existPost) {
        return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
      }

      const createComment = await this.commentService.createComment(
        postId,
        userId,
        nickname,
        commentContent
      );

      return res.status(201).json({ message: "댓글 생성 완료" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 에러" });
    }
  };

  findAllComments = async (req, res) => {
    try {
      const { postId } = req.params;
      const existPost = await this.commentService.existPost(postId);
      if (!existPost) {
        return res.status(404).json({ error: "게시글이 존재하지 않습니다." });
      }

      const postData = await this.commentService.findAllComments(postId);

      return res.status(200).json({ data: postData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 에러" });
    }
  };

  updateComment = async (req, res) => {
    try {
      const { postId, commentId } = req.params;
      const { commentContent } = await commentsValidation.validateAsync(
        req.body
      );
      const post = await this.commentService.existPost(postId);
      if (!post) {
        return res.status(404).json({ error: "게시글이 존재하지 않습니다." });
      }

      const comment = await this.commentService.existComment(commentId);
      if (!comment) {
        return res.status(404).json({ error: "댓글이 존재하지 않습니다." });
      }

      const updatedComment = await this.commentService.updateComment(
        postId,
        commentId,
        commentContent
      );

      return res.status(201).json({ message: "댓글 수정 완료" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 에러" });
    }
  };

  deleteComment = async (req, res) => {
    try {
      const { postId, commentId } = req.params;
      const post = await this.commentService.existPost(postId);
      if (!post) {
        return res.status(404).json({ error: "게시글이 존재하지 않습니다." });
      }

      const comment = await this.commentService.existComment(commentId);
      if (!comment) {
        return res.status(404).json({ error: "댓글이 존재하지 않습니다." });
      }

      const deletedComment = await this.commentService.deleteComment(
        postId,
        commentId
      );
      return res.status(201).json({ message: "댓글 삭제 완료" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 에러" });
    }
  };
}

module.exports = CommentsController;
