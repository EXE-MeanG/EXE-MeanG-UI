# Stage 1: Build app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --production=false

COPY . .

RUN npx next telemetry disable
RUN npx next build

RUN npm prune --production

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
