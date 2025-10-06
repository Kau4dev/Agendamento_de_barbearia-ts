# Agendamento de Barbearia

Sistema completo para gestão de agendamentos de barbearia, desenvolvido em TypeScript, Node.js, Express e Prisma ORM.

## Funcionalidades

- Cadastro de usuários, barbeiros e serviços
- Agendamento de horários com validação de conflitos
- Gestão de agenda semanal dos barbeiros
- Atualização de status dos agendamentos (PENDENTE, CONFIRMADO, CANCELADO, CONCLUIDO)
- Documentação Swagger automática
- API RESTful robusta e validada com Zod

## Tecnologias Utilizadas

- Node.js + Express
- TypeScript
- Prisma ORM + PostgreSQL
- Zod (validação)
- Swagger (documentação)
- Docker (banco de dados)

## Como rodar o projeto

### 1. Clone o repositório

```bash
https://github.com/Kau4dev/Agendamento_de_barbearia-ts.git
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

- Edite o arquivo `.env` com suas credenciais do PostgreSQL
- Use o Docker para subir o banco:

```bash
docker-compose up -d
```

### 4. Execute as migrations do Prisma

```bash
npx prisma migrate dev
```

### 5. Rode a aplicação

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### 6. Documentação Swagger

Acesse: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Estrutura das principais rotas

### Usuários

- `POST /usuarios` — Cria usuário
- `GET /usuarios` — Lista usuários

### Barbeiros

- `POST /barbeiros` — Cria barbeiro
- `GET /barbeiros` — Lista barbeiros

### Serviços

- `POST /servicos` — Cria serviço
- `GET /servicos` — Lista serviços

### Agenda dos Barbeiros

- `GET /agendas/:barbeiroId` — Busca agenda semanal
- `PUT /agendas/:barbeiroId` — Atualiza agenda semanal

### Agendamentos

- `POST /agendamentos` — Cria agendamento
- `GET /agendamentos` — Lista agendamentos
- `GET /agendamentos/:id` — Busca agendamento por ID
- `PUT /agendamentos/:id` — Atualiza agendamento
- `PATCH /agendamentos/:id/status` — Atualiza status
- `DELETE /agendamentos/:id` — Remove agendamento

## Licença

MIT

---
