# GUIA RÁPIDO - TRABALHO 2

## Objetivo

Transformar a solução anterior em um back-end Node.js com persistência, testes, Docker e automação.

---

## O que precisa existir na entrega

- API REST com CRUD de posts
- Busca por palavras-chave
- Banco de dados persistindo posts
- Dockerfile e docker-compose.yml
- Workflow de GitHub Actions
- Testes com cobertura mínima de 20%
- Documentação técnica clara

---

## Stack recomendada

- Node.js LTS
- Express
- PostgreSQL
- Prisma
- Jest
- Supertest
- Docker
- GitHub Actions

---

## Ordem prática de desenvolvimento

1. Inicializar o projeto Node.js
2. Configurar banco e modelagem
3. Implementar CRUD de posts
4. Implementar busca
5. Escrever testes
6. Containerizar a aplicação
7. Configurar CI
8. Finalizar documentação

---

## Decisões que não devem atrasar

- Escolher o banco no primeiro dia
- Definir estrutura de pastas antes de começar os endpoints
- Criar teste já no primeiro endpoint pronto
- Configurar Docker antes da fase final
- Criar pipeline antes da última semana

---

## Erros a evitar

- Deixar testes para o final
- Misturar regra de negócio diretamente nas rotas
- Crescer o escopo além dos requisitos do PDF
- Não padronizar respostas e erros da API
- Não validar o ambiente em outra máquina ou via Docker

---

## Meta da primeira semana

- Ambiente pronto
- Projeto inicial criado
- Banco configurado
- Entidade Post modelada
- Primeiros endpoints iniciados