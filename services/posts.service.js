const PostsRepository = require("../repositories/posts.repository");

class PostService {
  postsRepository = new PostsRepository();

  createPost = async (userId, nickname, postTitle, postContent) => {
    const post = await this.postsRepository.createPost(
      userId,
      nickname,
      postTitle,
      postContent
    );
    return post;
  };

  findAllPosts = async () => {
    const posts = await this.postsRepository.findAllPosts();
    const postsData = posts.map((post) => {
      return {
        postId: post["_id"],
        userId: post["userId"],
        nickname: post["nickname"],
        title: post["postTitle"],
        createdAt: post["createdAt"],
        updatedAt: post["updatedAt"],
      };
    });
    return postsData;
  };

  findPost = async (postId) => {
    const post = await this.postsRepository.findPost(postId);
    const postData = {
      postId: post["_id"],
      userId: post["userId"],
      nickname: post["nickname"],
      postTitle: post["postTitle"],
      postContent: post["postContent"],
      createdAt: post["createdAt"],
      updatedAt: post["updatedAt"],
    };
    return postData;
  };

  existPost = async (postId) => {
    const post = await this.postsRepository.existPost(postId);
    return post;
  };

  updatePost = async (postId, postTitle, postContent) => {
    const updatedPost = await this.postsRepository.updatePost(
      postId,
      postTitle,
      postContent
    );

    return updatedPost;
  };

  deletePost = async (postId) => {
    const deletedPost = await this.postsRepository.deletePost(postId);
    return deletedPost;
  };
}

module.exports = PostService;
