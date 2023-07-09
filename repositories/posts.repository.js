const Posts = require("../schemas/post");

class PostsRepository {
  createPost = async (userId, nickname, postTitle, postContent) => {
    const post = await Posts.create({
      userId,
      nickname,
      postTitle,
      postContent,
    });
    return post;
  };

  findAllPosts = async () => {
    const findPosts = await Posts.find({});
    return findPosts;
  };

  findPost = async (postId) => {
    const findPost = await Posts.findOne({ _id: postId });
    return findPost;
  };

  existPost = async (postId) => {
    const post = await Posts.findOne({ _id: postId });
    return post;
  };

  updatePost = async (postId, postTitle, postContent) => {
    const updatedPost = await Posts.updateOne(
      { _id: postId },
      { $set: { postTitle, postContent, updatedAt: Date.now() } }
    );
    return updatedPost;
  };

  deletePost = async (postId) => {
    const deletedPost = await Posts.deleteOne({ _id: postId });
    return deletedPost;
  };
}

module.exports = PostsRepository;
