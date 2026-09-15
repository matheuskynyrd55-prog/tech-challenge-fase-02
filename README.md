# Tech Challenge Fase 02 — Documentação de Entrega

**Aluno:** Matheus Nogueira Silva  
**Projeto:** Refatoração do back-end da plataforma de blogging para Node.js  
**Repositório:** https://github.com/matheuskynyrd55-prog/tech-challenge-fase-02

---

## Sobre o projeto

Essa fase foi uma evolução do que foi feito no Trabalho 1, onde a plataforma de blogging rodava em OutSystems. Aqui o objetivo foi substituir o back-end por uma API em Node.js, com banco de dados real, testes e um pipeline automatizado.

A ideia foi manter tudo simples e funcional.

---

## Tecnologias utilizadas

- **Node.js + Express** — servidor e rotas
- **PostgreSQL + Prisma** — banco de dados e acesso a dados
- **Jest + Supertest** — testes automatizados
- **Docker + Docker Compose** — ambiente padronizado
- **GitHub Actions** — CI/CD

A API foi organizada em camadas (routes, controllers, services, repositories) para deixar o código mais legível e fácil de manter.

---

## Endpoints

Base URL: `/api/v1`

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/login` | Autentica usuário e retorna token JWT |
| GET | `/posts` | Lista todos os posts |
| GET | `/posts/:id` | Retorna um post específico |
| POST | `/posts` | Cria um novo post |
| PUT | `/posts/:id` | Edita um post existente |
| DELETE | `/posts/:id` | Remove um post |
| GET | `/posts/search?q=` | Busca posts por palavra-chave |
| POST | `/posts/:id/comments` | Cria comentário (autenticado) |
| POST | `/posts/:id/likes` | Curte/descurte post (autenticado) |

Campos obrigatórios para criar um post: `title`, `content` e `author`.

Nesta versão, o `author` de post e comentário é definido automaticamente com base no usuário autenticado.

## Regras de acesso

- Docente: cria, edita, exclui postagens, comenta e curte.
- Aluno: comenta e curte postagens.

Credenciais padrão de desenvolvimento:

- docente / 123456
- aluno / 123456

---

## Como rodar localmente

Pré-requisitos: Node.js e Docker Desktop instalados.

```bash
# dentro da pasta api/
cp .env.example .env
docker compose up -d db
npm install
npx prisma migrate dev --name init
npm run dev
```

No PowerShell do Windows, se houver bloqueio de script, use `npm.cmd` e `npx.cmd`.

Ou com um único comando:

```bash
npm run bootstrap
```

---

## Testes

Escrevi testes para as regras principais: criação, edição, exclusão, busca, autenticação, comentários e curtidas. Para rodar:

```bash
npm test
```

---

## Docker e CI/CD

O projeto sobe com `docker compose up --build` e tem um workflow no GitHub Actions (`.github/workflows/ci-api.yml`) que roda os testes automaticamente em cada push. Quando o push vai para a branch main, ele também gera e publica a imagem Docker no GHCR.

---

## Dificuldades e aprendizados

A maior dificuldade foi a preparação do ambiente logo no início — instalar Node, Git, WSL e Docker no Windows e fazer tudo funcionar junto levou mais tempo do que esperado. Precisei ajustar o PATH manualmente, validar cada ferramenta por caminho absoluto e criar um script de bootstrap para automatizar o processo.

O aprendizado principal foi que um ambiente bem configurado desde o início economiza muito tempo no desenvolvimento. Acabei documentando cada passo justamente para não ter que repetir esse processo do zero.

---

## Uma decisão diferente do Trabalho 1

No projeto anterior (OutSystems), a exclusão de posts era um *soft delete*: o registro ficava no banco com um campo `Ativo = false`. Aqui optei por *hard delete* mesmo, porque simplifica o código. Se fosse um projeto em produção, provavelmente valeria reintroduzir esse campo para manter histórico.
