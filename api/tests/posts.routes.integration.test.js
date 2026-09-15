const request = require("supertest");

const mockPrisma = {
  post: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
  postLike: {
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    count: jest.fn()
  },
  comment: {
    create: jest.fn()
  }
};

jest.mock("../src/utils/prisma", () => ({
  prisma: mockPrisma
}));

const { app } = require("../src/app");

describe("Posts routes", () => {
  async function getAuthToken() {
    const login = await request(app).post("/api/v1/auth/login").send({
      username: "docente",
      password: "123456"
    });

    return login.body.token;
  }

  async function getStudentAuthToken() {
    const login = await request(app).post("/api/v1/auth/login").send({
      username: "aluno",
      password: "123456"
    });

    return login.body.token;
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/v1/posts deve criar post", async () => {
    mockPrisma.post.create.mockResolvedValue({
      id: "1",
      title: "Novo post",
      content: "Conteudo com tamanho suficiente",
      author: "docente"
    });

    const token = await getAuthToken();

    const response = await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Novo post",
        content: "Conteudo com tamanho suficiente",
        author: "Professor"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBe("1");
    expect(mockPrisma.post.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.post.create).toHaveBeenCalledWith({
      data: {
        title: "Novo post",
        content: "Conteudo com tamanho suficiente",
        author: "docente"
      }
    });
  });

  test("POST /api/v1/posts deve validar payload", async () => {
    const token = await getAuthToken();
    const response = await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "oi"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("validation_error");
  });

  test("POST /api/v1/posts deve bloquear criacao para aluno", async () => {
    const studentToken = await getStudentAuthToken();
    const response = await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        title: "Novo post",
        content: "Conteudo com tamanho suficiente"
      });

    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("Voce nao tem permissao para esta operacao");
  });

  test("GET /api/v1/posts/:id deve retornar 404 quando nao existir", async () => {
    mockPrisma.post.findUnique.mockResolvedValue(null);

    const response = await request(app).get("/api/v1/posts/nao-existe");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Post nao encontrado");
  });

  test("PUT /api/v1/posts/:id deve atualizar post", async () => {
    const token = await getAuthToken();

    mockPrisma.post.findUnique.mockResolvedValue({ id: "10", title: "Antigo" });
    mockPrisma.post.update.mockResolvedValue({
      id: "10",
      title: "Novo titulo",
      content: "Conteudo atualizado",
      author: "Professor"
    });

    const response = await request(app)
      .put("/api/v1/posts/10")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Novo titulo", content: "Conteudo atualizado" });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Novo titulo");
    expect(mockPrisma.post.update).toHaveBeenCalledWith({
      where: { id: "10" },
      data: { title: "Novo titulo", content: "Conteudo atualizado" }
    });
  });

  test("DELETE /api/v1/posts/:id deve excluir post", async () => {
    const token = await getAuthToken();

    mockPrisma.post.findUnique.mockResolvedValue({ id: "10" });
    mockPrisma.post.delete.mockResolvedValue({ id: "10" });

    const response = await request(app)
      .delete("/api/v1/posts/10")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
    expect(mockPrisma.post.delete).toHaveBeenCalledWith({ where: { id: "10" } });
  });

  test("GET /api/v1/posts/search exige query q", async () => {
    const response = await request(app).get("/api/v1/posts/search");

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Parametro de busca q e obrigatorio");
  });

  test("POST /api/v1/auth/login deve retornar token", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      username: "docente",
      password: "123456"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();
    expect(response.body.user.username).toBe("docente");
  });

  test("POST /api/v1/auth/login deve permitir aluno", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      username: "aluno",
      password: "123456"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();
    expect(response.body.user).toMatchObject({
      username: "aluno",
      role: "aluno"
    });
  });

  test("POST /api/v1/posts/:id/comments deve permitir comentario de aluno", async () => {
    const studentToken = await getStudentAuthToken();
    mockPrisma.post.findUnique.mockResolvedValue({
      id: "10",
      title: "Post 10",
      comments: []
    });
    mockPrisma.comment.create.mockResolvedValue({
      id: "c1",
      postId: "10",
      author: "aluno",
      content: "Muito bom post"
    });

    const response = await request(app)
      .post("/api/v1/posts/10/comments")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ content: "Muito bom post" });

    expect(response.statusCode).toBe(201);
    expect(response.body.author).toBe("aluno");
    expect(mockPrisma.comment.create).toHaveBeenCalledWith({
      data: {
        postId: "10",
        author: "aluno",
        content: "Muito bom post"
      }
    });
  });

  test("POST /api/v1/posts/:id/likes deve alternar like para usuario autenticado", async () => {
    const studentToken = await getStudentAuthToken();
    mockPrisma.post.findUnique.mockResolvedValueOnce({ id: "10", likes: [] });
    mockPrisma.postLike.findUnique.mockResolvedValueOnce(null);
    mockPrisma.postLike.create.mockResolvedValueOnce({ id: "l1", postId: "10", author: "aluno" });
    mockPrisma.postLike.count.mockResolvedValueOnce(1);

    const likeResponse = await request(app)
      .post("/api/v1/posts/10/likes")
      .set("Authorization", `Bearer ${studentToken}`)
      .send();

    expect(likeResponse.statusCode).toBe(200);
    expect(likeResponse.body).toEqual({ liked: true, likesCount: 1 });

    mockPrisma.post.findUnique.mockResolvedValueOnce({ id: "10", likes: [{ author: "aluno" }] });
    mockPrisma.postLike.findUnique.mockResolvedValueOnce({ id: "l1", postId: "10", author: "aluno" });
    mockPrisma.postLike.delete.mockResolvedValueOnce({ id: "l1" });
    mockPrisma.postLike.count.mockResolvedValueOnce(0);

    const unlikeResponse = await request(app)
      .post("/api/v1/posts/10/likes")
      .set("Authorization", `Bearer ${studentToken}`)
      .send();

    expect(unlikeResponse.statusCode).toBe(200);
    expect(unlikeResponse.body).toEqual({ liked: false, likesCount: 0 });
  });

  test("POST /api/v1/posts sem token deve retornar 401", async () => {
    const response = await request(app).post("/api/v1/posts").send({
      title: "Novo post",
      content: "Conteudo com tamanho suficiente",
      author: "Professor"
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Token invalido ou expirado");
  });
});
