# TECH CHALLENGE - TRABALHO 2

## Trabalho 2 - Back-end Node.js para Plataforma de Blogging

Projeto individual de Matheus para a Fase 02 do Tech Challenge.

Este diretorio contem os arquivos do projeto e os documentos necessarios para entrega.

---

## ARQUIVOS PRINCIPAIS DE ENTREGA

### 1. DOCUMENTACAO_ENTREGA.md

Documento tecnico final alinhado ao PDF com:
- arquitetura
- setup
- endpoints
- persistencia
- testes
- Docker
- GitHub Actions
- dificuldades e aprendizados

### 2. api/

Codigo-fonte da API com Node.js, Express, Prisma e testes.

### 3. .github/workflows/ci-api.yml

Workflow de CI/CD para testes e publicacao de imagem Docker.

### 4. api/Dockerfile e api/docker-compose.yml

Containerizacao do projeto para setup reproduzivel.

---

## ARQUIVOS DE APOIO (NAO OBRIGATORIOS NA ENTREGA)

- PLANEJAMENTO.md
- GUIA_RAPIDO.md
- CRONOGRAMA_EXECUTIVO.md
- RELATORIO_PROGRESSO.md
- TEMPLATE_DOCUMENTACAO_TECNICA.md
- setup_ambiente.ps1

---

## STATUS ATUAL

Ambiente validado:
- Git
- Node.js
- npm
- Docker
- Docker Compose
- WSL 2

Scaffold criado em api/:
- estrutura base do projeto
- modelagem Prisma da entidade Post
- rotas REST principais
- testes automatizados e cobertura acima de 20%

---

## COMANDOS RÁPIDOS PARA API

No diretório api/:

1. Copiar .env.example para .env
2. Subir banco local:
	docker compose up -d db
3. Rodar migration:
	npx prisma migrate dev --name init
4. Subir API:
	npm run dev
5. Executar testes:
	npm test
