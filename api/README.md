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
- npm install
- npx prisma generate
- npx prisma migrate dev --name init
- npm run dev

Ou rode tudo de uma vez:

- npm run bootstrap

## Endpoints

Base URL: /api/v1

- GET /posts
- GET /posts/:id
- POST /posts
- PUT /posts/:id
- DELETE /posts/:id
- GET /posts/search?q=termo

## CI/CD

Workflow em .github/workflows/ci-api.yml:

1. CI: instala dependencias, gera Prisma Client e roda testes.
2. CD: em push para main/master, gera imagem Docker e publica no GHCR.

## Testes

- npm test

## Teste manual de endpoints

Arquivo pronto para REST Client:

- requests.http

Fluxo sugerido:

1. Inicie a API com npm run dev.
2. Execute o POST de criacao no requests.http.
3. Copie o id retornado para a variavel postId no proprio arquivo.
4. Execute GET by id, PUT, SEARCH e DELETE.

## Docker completo

- docker compose up --build
