const { createPostSchema, updatePostSchema } = require("../schemas/postSchemas");
const { createCommentSchema } = require("../schemas/commentSchemas");

class PostsController {
  constructor(postsService) {
    this.postsService = postsService;
  }

  list = async (req, res, next) => {
    try {
      const posts = await this.postsService.listPosts();
      return res.status(200).json(posts);
    } catch (error) {
      return next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const post = await this.postsService.getPostById(req.params.id);
      return res.status(200).json(post);
    } catch (error) {
      return next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const payload = createPostSchema.parse(req.body);
      const created = await this.postsService.createPost({
        ...payload,
        author: req.auth.username
      });
      return res.status(201).json(created);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const payload = updatePostSchema.parse(req.body);
      const updated = await this.postsService.updatePost(req.params.id, payload);
      return res.status(200).json(updated);
    } catch (error) {
      return next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      await this.postsService.deletePost(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  };

  search = async (req, res, next) => {
    try {
      const posts = await this.postsService.searchPosts(req.query.q);
      return res.status(200).json(posts);
    } catch (error) {
      return next(error);
    }
  };

  addComment = async (req, res, next) => {
    try {
      const payload = createCommentSchema.parse(req.body);
      const comment = await this.postsService.addComment(req.params.id, {
        ...payload,
        author: req.auth.username
      });

      return res.status(201).json(comment);
    } catch (error) {
      return next(error);
    }
  };

  toggleLike = async (req, res, next) => {
    try {
      const result = await this.postsService.toggleLike(req.params.id, req.auth.username);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = { PostsController };
