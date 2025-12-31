FROM node:24-bookworm-slim AS builder
WORKDIR /usr/src/app
COPY . .
RUN corepack enable
RUN corepack prepare --activate
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM node:24-alpine
WORKDIR /usr/src/app
USER node
COPY --from=builder --chown=node /usr/src/app/dist .
CMD ["node", "index.js"]
