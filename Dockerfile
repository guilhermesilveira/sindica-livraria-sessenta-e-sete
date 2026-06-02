FROM node:20-bookworm AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

FROM node:20-bookworm AS runner
WORKDIR /app

ENV NODE_ENV=development
ENV DATABASE_URL="file:./dev.db"
ENV NEXTAUTH_URL="http://localhost:3000"

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npm run setup && npm run dev -- --hostname 0.0.0.0"]
