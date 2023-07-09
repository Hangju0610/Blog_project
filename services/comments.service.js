const CommentsRepository = require("../repositories/comments.repository");

class CommentService {
  commentsRepository = new CommentsRepository();

  existPost = async (postId) => {
    const post = await this.commentsRepository.existPost(postId);
    return post;
  };

  existComment = async (commentId) => {
    const comment = await this.commentsRepository.existComment(commentId);
    return comment;
  };

  createComment = async (postId, userId, nickname, commentContent) => {
    const createComment = await this.commentsRepository.createComment(
      postId,
      userId,
      nickname,
      commentContent
    );
    return createComment;
  };

  findAllComments = async (postId) => {
    const comments = await this.commentsRepository.findAllComments(postId);

    const commentsData = comments.map((comment) => {
      return {
        commentId: comment["_id"],
        userId: comment["userId"],
        nickname: comment["nickname"],
        commentContent: comment["commentContent"],
        createdAt: comment["createdAt"],
        updatedAt: comment["updatedAt"],
      };
    });

    return commentsData;
  };

  updateComment = async (postId, commentId, commentContent) => {
    const updatedComment = await this.commentsRepository.updateComment(
      postId,
      commentId,
      commentContent
    );
    return updatedComment;
  };

  deleteComment = async (postId, commentId) => {
    const deletedComment = await this.commentsRepository.deleteComment(
      postId,
      commentId
    );
    return deletedComment;
  };
}

module.exports = CommentService;
