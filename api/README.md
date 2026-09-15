# Trabalho 2 API

API REST para gerenciamento de posts do Tech Challenge Fase 02.

## Requisitos

- Node.js 24+
- Docker Desktop

## Setup local

1. Copie .env.example para .env.
2. Suba o banco com Docker.
3. Instale dependencias.
4. Rode migration e inicie a API.

Comandos:

- docker compose up -d db
- npm.cmd install
- npx.cmd prisma generate
- npx.cmd prisma migrate dev --name init
- npm.cmd run dev

Ou rode tudo de uma vez:

- npm.cmd run bootstrap

Observacao: a pasta do projeto e `api/`.

## Endpoints

Base URL: /api/v1

- POST /auth/login
- GET /posts
- GET /posts/:id
- POST /posts
- PUT /posts/:id
- DELETE /posts/:id
- GET /posts/search?q=termo
- POST /posts/:id/comments
- POST /posts/:id/likes

Credenciais padrao de desenvolvimento:

- username: docente
- password: 123456
- username: aluno
- password: 123456

As rotas de escrita de posts exigem token Bearer:

- POST /posts
- PUT /posts/:id
- DELETE /posts/:id

A criacao de post sempre usa o usuario autenticado como autor. O campo author enviado no payload e ignorado.

Comentarios:

- POST /posts/:id/comments exige autenticacao (docente ou aluno)
- author do comentario e preenchido automaticamente pelo usuario logado

Likes:

- POST /posts/:id/likes exige autenticacao (docente ou aluno)
- A rota alterna entre curtir e descurtir para o usuario logado

## CI/CD

Workflow em .github/workflows/ci-api.yml:

1. CI: instala dependencias, gera Prisma Client e roda testes.
2. CD: em push para main/master, gera imagem Docker e publica no GHCR.

## Testes

- npm.cmd test

## Teste manual de endpoints

Arquivo pronto para REST Client:

- requests.http

Fluxo sugerido:

1. Inicie a API com npm.cmd run dev.
2. Execute o POST de criacao no requests.http.
3. Copie o id retornado para a variavel postId no proprio arquivo.
4. Execute POST de comentario e valide autor automatico.
5. Execute POST de like e valide incremento/decremento de curtidas.
6. Execute GET by id, PUT, SEARCH e DELETE.

## Docker completo

- docker compose up --build

