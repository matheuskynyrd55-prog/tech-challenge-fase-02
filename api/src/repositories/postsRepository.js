class PostsRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  findAll() {
    return this.prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  }

  findById(id) {
    return this.prisma.post.findUnique({ where: { id } });
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
