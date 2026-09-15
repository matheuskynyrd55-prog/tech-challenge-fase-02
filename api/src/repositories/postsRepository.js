class PostsRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  findAll() {
    return this.prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id) {
    try {
      return await this.prisma.post.findUnique({
        where: { id },
        include: {
          comments: {
            orderBy: { createdAt: "asc" }
          },
          likes: {
            select: { author: true }
          }
        }
      });
    } catch {
      // Fallback para ambientes onde migrations/client de comments/likes ainda nao foram aplicadas.
      return this.prisma.post.findUnique({ where: { id } });
    }
  }

  create(payload) {
    return this.prisma.post.create({ data: payload });
  }

  update(id, payload) {
    return this.prisma.post.update({
      where: { id },
      data: payload
    });
  }

  remove(id) {
    return this.prisma.post.delete({ where: { id } });
  }

  createComment(postId, payload) {
    return this.prisma.comment.create({
      data: {
        postId,
        ...payload
      }
    });
  }

  findLike(postId, author) {
    return this.prisma.postLike.findUnique({
      where: {
        postId_author: {
          postId,
          author
        }
      }
    });
  }

  createLike(postId, author) {
    return this.prisma.postLike.create({
      data: {
        postId,
        author
      }
    });
  }

  removeLike(postId, author) {
    return this.prisma.postLike.delete({
      where: {
        postId_author: {
          postId,
          author
        }
      }
    });
  }

  countLikes(postId) {
    return this.prisma.postLike.count({ where: { postId } });
  }

  search(term) {
    return this.prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: term, mode: "insensitive" } },
          { content: { contains: term, mode: "insensitive" } }
        ]
      },
      orderBy: { createdAt: "desc" }
    });
  }
}

module.exports = { PostsRepository };
