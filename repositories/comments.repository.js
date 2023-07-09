const Comments = require("../schemas/comment");
const Posts = require("../schemas/post");

class CommentsRepository {
  existPost = async (postId) => {
    const post = await Posts.findOne({ _id: postId });
    return post;
  };

  existComment = async (commentId) => {
    const comment = await Comments.findOne({ _id: commentId });
    return comment;
  };

  createComment = async (postId, userId, nickname, commentContent) => {
    const createdComment = await Comments.create({
      postId,
      userId,
      nickname,
      commentContent,
    });
    return createdComment;
  };

  findAllComments = async (postId) => {
    const comments = await Comments.find({ postId: postId });
    return comments;
  };

  updateComment = async (postId, commentId, commentContent) => {
    const updatedComment = await Comments.updateOne(
      { _id: commentId, postId },
      { $set: { commentContent, updatedAt: Date.now() } }
    );

    return updatedComment;
  };

  deleteComment = async (postId, commentId) => {
    const deletedComment = await Comments.deleteOne({
      _id: commentId,
      postId,
    });
    return deletedComment;
  };
}

module.exports = CommentsRepository;
