# Roteiro do Vídeo — Tech Challenge Fase 02

**Tempo estimado:** 6 a 8 minutos  
**Gravador:** OBS Studio ou Xbox Game Bar (Win + G)  
**Antes de começar:** VS Code aberto na pasta `api/`, terminal pronto, Docker rodando

---

## Checklist pré-gravação

- [ ] Docker Desktop aberto e rodando
- [ ] `@postId` no `requests.http` limpo (sem id antigo)
- [ ] Banco limpo (pode rodar `npx prisma migrate reset` se precisar)
- [ ] Extensão REST Client instalada
- [ ] Microfone testado

---

## Introdução — 30 segundos

*Mostrar na tela: `DOCUMENTACAO_ENTREGA.md` aberto no VS Code*

> "Olá, meu nome é Matheus. Esse é o meu Tech Challenge da Fase 02, onde eu refatorei o back-end da plataforma de blogging que foi desenvolvida no Trabalho 1. Saímos do OutSystems e agora temos uma API em Node.js com banco de dados, Docker, testes e CI/CD. Vou mostrar tudo funcionando."

---

## Estrutura do código — 1 minuto

*Mostrar na tela: explorador de arquivos do VS Code com `api/` expandida, depois abrir `prisma/schema.prisma`*

> "A API foi organizada em camadas — rotas, controllers, services e repositories. O banco é PostgreSQL gerenciado pelo Prisma, e aqui dá pra ver o modelo do Post com os campos que a aplicação usa."

---

## Subindo o ambiente — 1 minuto

*Mostrar na tela: terminal dentro de `api/`*

> "Para rodar, subo o banco com Docker Compose e inicio a API."

```bash
docker compose up -d db
npm run dev
```

*Mostrar o terminal com `API running on port 3000`*

---

## Demonstração dos endpoints — 3 minutos

*Abrir `requests.http` no VS Code. Executar cada request e mostrar o retorno.*

**Criar post** — `POST /posts`
> "Criando um post como professor — precisa informar título, conteúdo e autor."
*Mostrar retorno 201 com o id gerado. Copiar o id para `@postId`.*

**Listar posts** — `GET /posts`
> "Aqui os alunos veem todos os posts publicados."

**Buscar por id** — `GET /posts/:id`
> "Acessar o conteúdo completo de um post específico."

**Editar post** — `PUT /posts/:id`
> "O professor edita o post passando os novos dados."
*Mostrar retorno com os dados atualizados.*

**Busca por palavra-chave** — `GET /posts/search?q=`
> "Tem também uma busca por palavra-chave que procura no título e no conteúdo."

**Deletar post** — `DELETE /posts/:id`
> "E por fim, a exclusão. Retorna 204 sem conteúdo."
*Rodar GET /posts em seguida e mostrar a lista vazia.*

---

## Testes — 1 minuto

*Mostrar na tela: terminal*

> "Os testes cobrem as operações principais — criação, edição, exclusão, busca e tratamento de erros."

```bash
npm test
```

*Mostrar todos os testes passando e a linha de cobertura acima de 20%.*

---

## GitHub Actions — 30 segundos

*Mostrar na tela: `.github/workflows/ci-api.yml` aberto no VS Code*

> "O pipeline roda automaticamente a cada push. Tem dois jobs: o CI que executa os testes, e o CD que gera e publica a imagem Docker quando o código vai para a branch main."

---

## Encerramento — 30 segundos

*Mostrar na tela: seção final da `DOCUMENTACAO_ENTREGA.md`*

> "É isso. O projeto cobre todos os requisitos da fase — API REST, banco de dados, Docker, CI/CD e testes. Uma diferença em relação ao Trabalho 1: lá a exclusão era soft delete, com um campo Ativo no banco. Aqui simplifiquei para hard delete, já que o enunciado não especifica. Obrigado."

---

## Checklist antes de enviar

- [ ] Vídeo entre 5 e 10 minutos
- [ ] Os 6 endpoints foram demonstrados
- [ ] Testes rodaram com cobertura visível
- [ ] GitHub Actions foi mostrado
- [ ] Áudio limpo e compreensível
