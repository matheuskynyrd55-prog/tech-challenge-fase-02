const { PostsService } = require("../src/services/postsService");

describe("PostsService", () => {
  function buildRepositoryMock() {
    return {
      search: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      createComment: jest.fn(),
      findLike: jest.fn(),
      createLike: jest.fn(),
      removeLike: jest.fn(),
      countLikes: jest.fn(),
      update: jest.fn(),
      remove: jest.fn()
    };
  }

  test("deve exigir query na busca", async () => {
    const repository = buildRepositoryMock();

    const service = new PostsService(repository);

    await expect(service.searchPosts("   ")).rejects.toMatchObject({
      statusCode: 400
    });
  });

  test("deve listar posts", async () => {
    const repository = buildRepositoryMock();
    const expected = [{ id: "1", title: "Post" }];
    repository.findAll.mockResolvedValue(expected);

    const service = new PostsService(repository);
    const result = await service.listPosts();

    expect(repository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  test("deve buscar post por id existente", async () => {
    const repository = buildRepositoryMock();
    const expected = { id: "abc", title: "A" };
    repository.findById.mockResolvedValue(expected);

    const service = new PostsService(repository);
    const result = await service.getPostById("abc");

    expect(repository.findById).toHaveBeenCalledWith("abc");
    expect(result).toEqual({ ...expected, likesCount: 0 });
  });

  test("deve retornar erro quando post nao existir", async () => {
    const repository = buildRepositoryMock();
    repository.findById.mockResolvedValue(null);

    const service = new PostsService(repository);

    await expect(service.getPostById("nao-existe")).rejects.toMatchObject({
      statusCode: 404,
      message: "Post nao encontrado"
    });
  });

  test("deve criar post", async () => {
    const repository = buildRepositoryMock();
    const payload = {
      title: "Novo post",
      content: "Conteudo com tamanho suficiente",
      author: "Professor"
    };
    repository.create.mockResolvedValue({ id: "novo-id", ...payload });

    const service = new PostsService(repository);
    const result = await service.createPost(payload);

    expect(repository.create).toHaveBeenCalledWith(payload);
    expect(result).toMatchObject({ id: "novo-id", ...payload });
  });

  test("deve atualizar post existente", async () => {
    const repository = buildRepositoryMock();
    repository.findById.mockResolvedValue({ id: "1", title: "Antigo" });
    repository.update.mockResolvedValue({ id: "1", title: "Novo" });

    const service = new PostsService(repository);
    const result = await service.updatePost("1", { title: "Novo" });

    expect(repository.findById).toHaveBeenCalledWith("1");
    expect(repository.update).toHaveBeenCalledWith("1", { title: "Novo" });
    expect(result).toEqual({ id: "1", title: "Novo" });
  });

  test("deve excluir post existente", async () => {
    const repository = buildRepositoryMock();
    repository.findById.mockResolvedValue({ id: "1", title: "Post" });
    repository.remove.mockResolvedValue(undefined);

    const service = new PostsService(repository);
    await service.deletePost("1");

    expect(repository.findById).toHaveBeenCalledWith("1");
    expect(repository.remove).toHaveBeenCalledWith("1");
  });

  test("deve buscar posts com termo sanitizado", async () => {
    const repository = buildRepositoryMock();
    repository.search.mockResolvedValue([{ id: "1" }]);

    const service = new PostsService(repository);
    const result = await service.searchPosts("  teste  ");

    expect(repository.search).toHaveBeenCalledWith("teste");
    expect(result).toEqual([{ id: "1" }]);
  });

  test("deve adicionar comentario em post existente", async () => {
    const repository = buildRepositoryMock();
    repository.findById.mockResolvedValue({ id: "1", title: "Post" });
    repository.createComment.mockResolvedValue({
      id: "c1",
      postId: "1",
      author: "aluno",
      content: "Comentario valido"
    });

    const service = new PostsService(repository);
    const payload = { author: "aluno", content: "Comentario valido" };
    const result = await service.addComment("1", payload);

    expect(repository.findById).toHaveBeenCalledWith("1");
    expect(repository.createComment).toHaveBeenCalledWith("1", payload);
    expect(result).toMatchObject({ id: "c1", postId: "1" });
  });

  test("deve registrar like quando ainda nao curtido", async () => {
    const repository = buildRepositoryMock();
    repository.findById.mockResolvedValue({ id: "1", likes: [] });
    repository.findLike.mockResolvedValue(null);
    repository.countLikes.mockResolvedValue(1);

    const service = new PostsService(repository);
    const result = await service.toggleLike("1", "aluno");

    expect(repository.findLike).toHaveBeenCalledWith("1", "aluno");
    expect(repository.createLike).toHaveBeenCalledWith("1", "aluno");
    expect(result).toEqual({ liked: true, likesCount: 1 });
  });

  test("deve remover like quando ja curtido", async () => {
    const repository = buildRepositoryMock();
    repository.findById.mockResolvedValue({ id: "1", likes: [{ author: "aluno" }] });
    repository.findLike.mockResolvedValue({ id: "l1", postId: "1", author: "aluno" });
    repository.countLikes.mockResolvedValue(0);

    const service = new PostsService(repository);
    const result = await service.toggleLike("1", "aluno");

    expect(repository.removeLike).toHaveBeenCalledWith("1", "aluno");
    expect(result).toEqual({ liked: false, likesCount: 0 });
  });
});
