# PLANEJAMENTO - TECH CHALLENGE FASE 02
## Evolução da Plataforma de Blogging para Node.js

**Data**: Julho 2026  
**Peso na Nota**: 90% da nota final das disciplinas da fase  
**Tipo**: Projeto em grupo  
**Objetivo desta fase**: Evoluir a solução criada anteriormente para uma arquitetura de back-end em Node.js com persistência de dados, containerização, automação e testes.

---

## 1. RESUMO EXECUTIVO

O próximo passo do projeto consiste em refatorar o back-end da aplicação de blogging para uma solução escalável em Node.js, com banco de dados, Docker, GitHub Actions e documentação técnica completa.

A entrega precisa contemplar:
- API REST funcional para gerenciamento de posts
- Persistência de dados em banco SQL ou NoSQL
- Ambiente padronizado com Docker
- Pipeline básica de CI/CD com GitHub Actions
- Cobertura mínima de 20% de testes unitários
- Documentação técnica e material de apresentação

---

## 2. OBJETIVOS DO PROJETO

- [ ] Migrar a lógica principal da aplicação para um back-end em Node.js
- [ ] Garantir persistência confiável das postagens em banco de dados
- [ ] Disponibilizar endpoints REST para alunos e docentes
- [ ] Preparar o projeto para execução padronizada em diferentes ambientes
- [ ] Implementar automação de validação com GitHub Actions
- [ ] Garantir cobertura mínima de 20% em testes unitários
- [ ] Produzir documentação técnica clara para setup, arquitetura e uso da API

---

## 3. ESCOPO FUNCIONAL

### Endpoints obrigatórios

- [ ] `GET /posts` - listar posts para exibição geral
- [ ] `GET /posts/:id` - consultar post específico
- [ ] `POST /posts` - criar nova postagem
- [ ] `PUT /posts/:id` - editar postagem existente
- [ ] `DELETE /posts/:id` - excluir postagem
- [ ] `GET /posts/search?q=termo` - buscar postagens por palavra-chave

### Regras mínimas de negócio

- [ ] Título e conteúdo obrigatórios na criação e edição
- [ ] Autor obrigatório no cadastro da postagem
- [ ] ID de postagem deve ser validado
- [ ] Busca deve considerar título e conteúdo
- [ ] Respostas da API devem usar status HTTP coerentes
- [ ] Erros devem retornar mensagem padronizada

---

## 4. ESCOPO TÉCNICO

### Stack recomendada

| Camada | Recomendação | Motivo |
|--------|--------------|--------|
| Runtime | Node.js LTS | Estabilidade e aderência ao requisito |
| Framework | Express | Simples, amplamente adotado e suficiente para o escopo |
| Banco de dados | PostgreSQL | Estrutura relacional clara para posts e boa integração com Docker |
| ORM | Prisma | Acelera modelagem, migrations e acesso a dados |
| Testes | Jest + Supertest | Bom suporte para testes unitários e de API |
| Containers | Docker + Docker Compose | Facilita setup local e consistência de ambiente |
| CI | GitHub Actions | Atende ao requisito de automação |

### Decisões arquiteturais sugeridas

- [ ] API organizada em camadas: `routes`, `controllers`, `services`, `repositories`, `middlewares`
- [ ] Variáveis sensíveis em `.env`
- [ ] Versionamento da API opcional, mas recomendado como `/api/v1`
- [ ] Padronização de respostas JSON
- [ ] Banco inicialmente modelado apenas para `posts`, sem ampliar escopo sem necessidade

---

## 5. MODELAGEM INICIAL DE DADOS

### Entidade `Post`

| Campo | Tipo | Obrigatório | Observação |
|------|------|-------------|------------|
| `id` | UUID ou inteiro | Sim | Chave primária |
| `title` | String | Sim | Título da postagem |
| `content` | Text | Sim | Conteúdo completo |
| `author` | String | Sim | Nome do docente |
| `createdAt` | DateTime | Sim | Gerado automaticamente |
| `updatedAt` | DateTime | Sim | Atualizado automaticamente |

### Regras adicionais

- [ ] Índice para busca por título
- [ ] Considerar busca textual em `title` e `content`
- [ ] Não incluir autenticação nesta fase, a menos que o grupo decida ampliar o escopo por conta própria

---

## 6. ESTRUTURA SUGERIDA DO PROJETO

```text
trabalho-2/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middlewares/
│   ├── schemas/
│   └── utils/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
├── .github/
│   └── workflows/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── .env.example
└── README.md
```

---

## 7. FASES DE EXECUÇÃO

### Fase 1: Definição técnica e setup

- [ ] Confirmar stack do grupo
- [ ] Criar repositório e convenções de branch
- [ ] Inicializar projeto Node.js
- [ ] Instalar dependências principais
- [ ] Configurar ESLint ou outro padrão mínimo de qualidade
- [ ] Configurar ambiente local com `.env.example`

**Entregáveis:**
- Estrutura inicial do projeto
- Dependências instaladas
- Setup documentado

---

### Fase 2: Persistência e modelagem

- [ ] Subir banco com Docker
- [ ] Modelar entidade `Post`
- [ ] Criar migration inicial
- [ ] Validar conexão da aplicação com o banco
- [ ] Criar camada de acesso a dados

**Entregáveis:**
- Banco funcional
- Modelagem pronta
- CRUD básico persistindo dados

---

### Fase 3: Implementação da API REST

- [ ] Implementar `GET /posts`
- [ ] Implementar `GET /posts/:id`
- [ ] Implementar `POST /posts`
- [ ] Implementar `PUT /posts/:id`
- [ ] Implementar `DELETE /posts/:id`
- [ ] Implementar `GET /posts/search?q=`
- [ ] Padronizar tratamento de erros
- [ ] Validar payloads de entrada

**Entregáveis:**
- Endpoints funcionais
- Coleção de testes manuais ou documentação de chamadas

---

### Fase 4: Testes e qualidade

- [ ] Criar testes unitários para regras críticas
- [ ] Criar testes para criação, edição e exclusão de posts
- [ ] Medir cobertura de testes
- [ ] Garantir mínimo de 20% de cobertura
- [ ] Corrigir falhas encontradas

**Entregáveis:**
- Suite de testes executando
- Relatório de cobertura

---

### Fase 5: Containerização

- [ ] Criar `Dockerfile` da aplicação
- [ ] Criar `docker-compose.yml` com API + banco
- [ ] Validar subida completa do ambiente com um único comando
- [ ] Documentar processo de execução via Docker

**Entregáveis:**
- Ambiente conteinerizado funcionando
- Setup reproduzível

---

### Fase 6: Automação com GitHub Actions

- [ ] Criar workflow para instalar dependências
- [ ] Executar lint ou validação equivalente
- [ ] Executar testes automaticamente
- [ ] Publicar badge ou evidência do pipeline no repositório, se desejado

**Entregáveis:**
- Pipeline de CI funcional

---

### Fase 7: Documentação e apresentação

- [ ] Documentar arquitetura da aplicação
- [ ] Documentar setup local
- [ ] Documentar uso da API com exemplos
- [ ] Documentar decisões técnicas do grupo
- [ ] Registrar dificuldades e soluções
- [ ] Preparar roteiro da apresentação gravada

**Entregáveis:**
- README completo
- Documento técnico final
- Material para demonstração

---

## 8. PLANO DE ENTREGA POR SPRINT

### Sprint 1 - Fundação técnica

- [ ] Definição da stack
- [ ] Criação do projeto Node.js
- [ ] Configuração do banco
- [ ] Estrutura base de pastas

### Sprint 2 - CRUD principal

- [ ] Endpoints de listagem e detalhe
- [ ] Endpoints de criação e edição
- [ ] Endpoint de exclusão
- [ ] Tratamento de erros

### Sprint 3 - Busca, testes e qualidade

- [ ] Busca por palavra-chave
- [ ] Testes unitários
- [ ] Cobertura mínima de 20%
- [ ] Ajustes de qualidade

### Sprint 4 - DevOps e documentação

- [ ] Docker
- [ ] GitHub Actions
- [ ] README
- [ ] Documento final e vídeo

---

## 9. CRONOGRAMA EXECUTIVO SUGERIDO

### Semana 1

- [ ] Revisar requisitos do PDF e fechar decisões técnicas
- [ ] Criar repositório e estrutura inicial
- [ ] Configurar Node.js, Express e banco
- [ ] Definir modelo da entidade `Post`

### Semana 2

- [ ] Implementar persistência
- [ ] Entregar CRUD completo
- [ ] Validar respostas HTTP e tratamento de erros

### Semana 3

- [ ] Implementar busca por palavra-chave
- [ ] Criar testes unitários
- [ ] Medir e ajustar cobertura

### Semana 4

- [ ] Finalizar Docker
- [ ] Finalizar GitHub Actions
- [ ] Revisar documentação
- [ ] Gravar apresentação e organizar entrega

---

## 10. DIVISÃO DE TRABALHO SUGERIDA PARA O GRUPO

### Pessoa 1 - Back-end / API
- [ ] Estrutura do projeto
- [ ] Rotas, controllers e services
- [ ] Tratamento de erros

### Pessoa 2 - Banco de dados
- [ ] Modelagem
- [ ] Migrations
- [ ] Queries e suporte à busca

### Pessoa 3 - Qualidade e testes
- [ ] Testes unitários
- [ ] Cobertura
- [ ] Apoio em validação dos endpoints

### Pessoa 4 - DevOps e documentação
- [ ] Docker
- [ ] GitHub Actions
- [ ] README e documentação técnica

Se o grupo tiver menos integrantes, consolidar papéis sem alterar o escopo mínimo.

---

## 11. CRITÉRIOS DE PRONTO

Uma entrega só deve ser considerada pronta quando:

- [ ] Todos os endpoints obrigatórios estiverem funcionando
- [ ] Os dados estiverem persistindo em banco
- [ ] O projeto subir localmente com Docker
- [ ] O workflow do GitHub Actions executar com sucesso
- [ ] A cobertura de testes estiver em pelo menos 20%
- [ ] A documentação explicar setup, arquitetura e uso da API

---

## 12. RISCOS E MITIGAÇÕES

| Risco | Impacto | Mitigação |
|------|---------|-----------|
| Escolha tardia de stack | Alto | Fechar decisão no primeiro dia |
| Atraso na integração com banco | Alto | Entregar primeiro CRUD simples e depois refinar |
| Docker não funcionar para todos | Médio | Padronizar versões e validar cedo |
| Testes ficarem para o fim | Alto | Escrever testes a partir do primeiro endpoint pronto |
| GitHub Actions falhar perto da entrega | Médio | Criar pipeline básica já na metade do projeto |
| Escopo crescer além do necessário | Alto | Focar apenas nos requisitos obrigatórios |

---

## 13. CHECKLIST DE ENTREGA FINAL

- [ ] Repositório com código-fonte completo
- [ ] API rodando localmente
- [ ] Dockerfile funcional
- [ ] Docker Compose funcional
- [ ] Workflow de GitHub Actions configurado
- [ ] Testes com cobertura mínima exigida
- [ ] README com instruções claras
- [ ] Documento técnico finalizado
- [ ] Evidências para apresentação gravada

---

## 14. PRÓXIMOS PASSOS IMEDIATOS

### Hoje
- [ ] Validar este planejamento com o grupo
- [ ] Fechar a decisão entre PostgreSQL e MongoDB
- [ ] Criar o repositório do Trabalho 2
- [ ] Distribuir responsáveis

### Próxima reunião
- [ ] Confirmar estrutura de pastas
- [ ] Definir padrão de branches e pull requests
- [ ] Estabelecer meta da Sprint 1
- [ ] Registrar decisões técnicas

---

## 15. RECOMENDAÇÃO PRÁTICA

Para reduzir risco e acelerar a entrega, a recomendação é seguir com:
- Node.js + Express
- PostgreSQL
- Prisma
- Jest + Supertest
- Docker Compose
- GitHub Actions com workflow de teste

Essa combinação atende todos os requisitos do PDF com baixa complexidade operacional e boa previsibilidade de entrega.
