const { HttpError } = require("../utils/httpError");

class PostsService {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }

  listPosts() {
    return this.postsRepository.findAll();
  }

  async getPostById(id) {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new HttpError(404, "Post nao encontrado");
    }

    return post;
  }

  createPost(payload) {
    return this.postsRepository.create(payload);
  }

  async updatePost(id, payload) {
    await this.getPostById(id);
    return this.postsRepository.update(id, payload);
  }

  async deletePost(id) {
    await this.getPostById(id);
    await this.postsRepository.remove(id);
  }

  async searchPosts(queryTerm) {
    const cleaned = (queryTerm || "").trim();

    if (!cleaned) {
      throw new HttpError(400, "Parametro de busca q e obrigatorio");
    }

    return this.postsRepository.search(cleaned);
  }
}

module.exports = { PostsService };
