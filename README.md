# Livraria Sessenta e Sete

Livraria 67 is a small teaching project. It is intentionally simple: a bookstore
storefront and admin built with Node.js, Next.js, MUI, NextAuth, Prisma, and
SQLite.

The app includes:

- public storefront with 20 seeded Casa do Codigo books;
- product detail pages;
- fixed cart preview;
- admin login with NextAuth credentials;
- product registration and editing;
- user registration;
- seeded admin user;
- Docker and Compose for a clean demo runtime.

## Default Admin

```text
Email: admin@livraria67.local
Password: admin123
```

Change these values with `ADMIN_EMAIL` and `ADMIN_PASSWORD` before using the app
outside a classroom demo.

## 1. Run The Bookstore

On a clean machine, the shortest path is Docker:

```bash
git clone <repository-url>
cd <repository-directory>
docker compose up --build
```

Open:

```text
http://localhost:3000
```

For local Node usage, use Node 20:

```bash
nvm use
npm install
cp .env.example .env
npm run setup
npm run dev
```

## 2. Validate Changes

Run these commands before opening a PR or shipping a change:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

The unit tests cover pure bookstore logic such as cart parsing, quantity
normalization, cart totals, and price formatting. They do not require the
database or the Next.js server.

The Docker container runs the Prisma setup and seed before starting Next.js.

If you already have an old local `prisma/dev.db` from a previous version of this
example, reset the demo database:

```bash
npm run db:reset
```

## Useful Commands

```bash
npm run setup
npm run db:reset
npm run dev
npm test
npm run lint
npm run typecheck
npm run build
```
