# Backend — 72º Encontro de Casais INVA

Servidor Node.js em **Fastify** com ORM **Prisma**, desenhado para captura e armazenamento de casais diretamente no **Supabase (PostgreSQL)**.

---

## 🗄️ Como Configurar no Supabase em 3 Passos

### Passo 1: Executar o Script SQL no Supabase
1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard).
2. Selecione seu projeto (ou crie um novo gratuitamente).
3. No menu lateral esquerdo, clique em **SQL Editor**.
4. Abra o arquivo `backend/supabase_schema.sql`, copie todo o conteúdo e cole no editor do Supabase.
5. Clique no botão verde **Run** (Executar).
   - As tabelas `inscriptions` (inscrições), `children` (filhos) e `events` (eventos) serão criadas com todos os índices, políticas de segurança (RLS) e gatilhos de data e hora.

### Passo 2: Configurar o arquivo `.env`
No arquivo `backend/.env` (ou na raiz do projeto), configure as credenciais do Supabase:
Obtenha as strings em: *Project Settings > Database > Connection String*

```env
PORT=3333

# 1. Modo Pooler (Porta 6543)
DATABASE_URL="postgresql://postgres.[SEU-PROJECT-REF]:[SUA-SENHA]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# 2. Modo Direct (Porta 5432)
DIRECT_URL="postgresql://postgres.[SEU-PROJECT-REF]:[SUA-SENHA]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
```

### Passo 3: Sincronizar o Prisma
Execute no terminal:
```bash
# Gerar o cliente Prisma
npx prisma generate --schema=backend/prisma/schema.prisma

# Sincronizar o schema com o banco
npx prisma db push --schema=backend/prisma/schema.prisma

# Abrir o visualizador visual de dados
npx prisma studio --schema=backend/prisma/schema.prisma
```

---

## 🚀 Como Iniciar o Servidor Fastify

```bash
# Iniciar o servidor de desenvolvimento
npm run dev:backend
# ou
tsx watch backend/src/server.ts
```

O servidor iniciará em `http://localhost:3333`.

### Rotas Disponíveis

- `GET  /api/health` — Status do servidor e teste de conexão com o Supabase.
- `POST /api/registrations` — Cadastrar novo casal e gerar voucher.
- `GET  /api/registrations` — Listar todos os casais inscritos (suporta filtro `?search=...`).
- `GET  /api/registrations/:voucher` — Consultar ficha do casal por código de voucher.
- `GET  /api/stats` — Resumo numérico de casais, vagas e lotes.
