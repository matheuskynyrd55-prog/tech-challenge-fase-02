const request = require("supertest");

const mockPrisma = {
  post: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
};

jest.mock("../src/utils/prisma", () => ({
  prisma: mockPrisma
}));

const { app } = require("../src/app");

describe("Posts routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/v1/posts deve criar post", async () => {
    mockPrisma.post.create.mockResolvedValue({
      id: "1",
      title: "Novo post",
      content: "Conteudo com tamanho suficiente",
      author: "Professor"
    });

    const response = await request(app).post("/api/v1/posts").send({
      title: "Novo post",
      content: "Conteudo com tamanho suficiente",
      author: "Professor"
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBe("1");
    expect(mockPrisma.post.create).toHaveBeenCalledTimes(1);
  });

  test("POST /api/v1/posts deve validar payload", async () => {
    const response = await request(app).post("/api/v1/posts").send({
      title: "oi"
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("validation_error");
  });

  test("GET /api/v1/posts/:id deve retornar 404 quando nao existir", async () => {
    mockPrisma.post.findUnique.mockResolvedValue(null);

    const response = await request(app).get("/api/v1/posts/nao-existe");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Post nao encontrado");
  });

  test("PUT /api/v1/posts/:id deve atualizar post", async () => {
    mockPrisma.post.findUnique.mockResolvedValue({ id: "10", title: "Antigo" });
    mockPrisma.post.update.mockResolvedValue({
      id: "10",
      title: "Novo titulo",
      content: "Conteudo atualizado",
      author: "Professor"
    });

    const response = await request(app)
      .put("/api/v1/posts/10")
      .send({ title: "Novo titulo", content: "Conteudo atualizado" });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Novo titulo");
    expect(mockPrisma.post.update).toHaveBeenCalledWith({
      where: { id: "10" },
      data: { title: "Novo titulo", content: "Conteudo atualizado" }
    });
  });

  test("DELETE /api/v1/posts/:id deve excluir post", async () => {
    mockPrisma.post.findUnique.mockResolvedValue({ id: "10" });
    mockPrisma.post.delete.mockResolvedValue({ id: "10" });

    const response = await request(app).delete("/api/v1/posts/10");

    expect(response.statusCode).toBe(204);
    expect(mockPrisma.post.delete).toHaveBeenCalledWith({ where: { id: "10" } });
  });

  test("GET /api/v1/posts/search exige query q", async () => {
    const response = await request(app).get("/api/v1/posts/search");

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Parametro de busca q e obrigatorio");
  });
});
