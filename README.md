# Sindica Livraria Sessenta e Sete

Livraria 67 is a small teaching project for Sindica classes. It is intentionally
simple: a bookstore storefront and admin built with Node.js, Next.js, MUI,
NextAuth, Prisma, and SQLite.

This repository is the clean target project used to practice installing Sindica.
It does not include Sindica configuration yet.

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
git clone https://github.com/guilhermesilveira/sindica-livraria-sessenta-e-sete.git
cd sindica-livraria-sessenta-e-sete
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

## 2. Install Sindica With An Agent

After confirming the bookstore runs, use this repository as the target project
for a Sindica installation exercise. Open the agent in this repo and ask the
short version:

```text
configure Sindica here for me
```

Agents should interpret that request using the instructions below.

### For Agents: Install Sindica

If the user asks something like "configure Sindica here for me", install Sindica
in this project.

Use the standard condo workflow.
Use this project's existing Dockerfile and docker-compose.yml as the runtime and preview base.
Configure validation with:
npm test
npm run lint
npm run typecheck
npm run build

Configure the default Sindica flow with Alexo and Ralph.
Do not commit until I review.
```

The expected result is a branch or working tree where Sindica files are added to
this app, while the bookstore itself remains the application under test.

## 3. Validate Changes

Run these commands before opening a PR or asking Sindica to review a change:

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
