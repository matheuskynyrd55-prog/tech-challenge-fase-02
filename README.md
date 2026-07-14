# Tech Challenge Fase 02 â€” DocumentaÃ§Ã£o de Entrega

**Aluno:** Matheus  
**Projeto:** RefatoraÃ§Ã£o do back-end da plataforma de blogging para Node.js

---

## Sobre o projeto

Essa fase foi uma evoluÃ§Ã£o do que foi feito no Trabalho 1, onde a plataforma de blogging rodava em OutSystems. Aqui o objetivo foi substituir o back-end por uma API em Node.js, com banco de dados real, testes e um pipeline automatizado.

A ideia foi manter tudo simples e funcional.

---

## Tecnologias utilizadas

- **Node.js + Express** â€” servidor e rotas
- **PostgreSQL + Prisma** â€” banco de dados e acesso a dados
- **Jest + Supertest** â€” testes automatizados
- **Docker + Docker Compose** â€” ambiente padronizado
- **GitHub Actions** â€” CI/CD

A API foi organizada em camadas (routes, controllers, services, repositories) para deixar o cÃ³digo mais legÃ­vel e fÃ¡cil de manter.

---

## Endpoints

Base URL: `/api/v1`

| MÃ©todo | Rota | DescriÃ§Ã£o |
|--------|------|-----------|
| GET | `/posts` | Lista todos os posts |
| GET | `/posts/:id` | Retorna um post especÃ­fico |
| POST | `/posts` | Cria um novo post |
| PUT | `/posts/:id` | Edita um post existente |
| DELETE | `/posts/:id` | Remove um post |
| GET | `/posts/search?q=` | Busca posts por palavra-chave |

Campos obrigatÃ³rios para criar um post: `title`, `content` e `author`.

---

## Como rodar localmente

PrÃ©-requisitos: Node.js e Docker Desktop instalados.

```bash
# dentro da pasta api/
cp .env.example .env
docker compose up -d db
npm install
npx prisma migrate dev --name init
npm run dev
```

Ou com um Ãºnico comando:

```bash
npm run bootstrap
```

---

## Testes

Escrevi testes para as regras principais: criaÃ§Ã£o, ediÃ§Ã£o, exclusÃ£o, busca e tratamento de erros. Para rodar:

```bash
npm test
```

---

## Docker e CI/CD

O projeto sobe com `docker compose up --build` e tem um workflow no GitHub Actions (`.github/workflows/ci-api.yml`) que roda os testes automaticamente em cada push. Quando o push vai para a branch main, ele tambÃ©m gera e publica a imagem Docker no GHCR.

---

## Dificuldades e aprendizados

A maior dificuldade foi a preparaÃ§Ã£o do ambiente logo no inÃ­cio â€” instalar Node, Git, WSL e Docker no Windows e fazer tudo funcionar junto levou mais tempo do que esperado. Precisei ajustar o PATH manualmente, validar cada ferramenta por caminho absoluto e criar um script de bootstrap para automatizar o processo.

O aprendizado principal foi que um ambiente bem configurado desde o inÃ­cio economiza muito tempo no desenvolvimento. Acabei documentando cada passo justamente para nÃ£o ter que repetir esse processo do zero.

---

## Uma decisÃ£o diferente do Trabalho 1

No projeto anterior (OutSystems), a exclusÃ£o de posts era um *soft delete*: o registro ficava no banco com um campo `Ativo = false`. Aqui optei por *hard delete* mesmo, porque simplifica o cÃ³digo. Se fosse um projeto em produÃ§Ã£o, provavelmente valeria reintroduzir esse campo para manter histÃ³rico.
