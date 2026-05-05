# Etapa de Build
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /app
WORKDIR /app

# Instala todas as dependências do workspace
RUN pnpm install

# Isola o projeto da landing page para produção (resolve symlinks do pnpm)
# Isso cria uma pasta independente com tudo o que o projeto precisa para rodar
RUN pnpm --filter embelleze-landing --prod deploy /app/out

# Build da landing page dentro da pasta isolada
WORKDIR /app/out
RUN pnpm run build

# Etapa de Runtime (Final)
FROM base AS runtime
WORKDIR /app

# Copia apenas o necessário da pasta isolada e otimizada
COPY --from=build /app/out/dist ./dist
COPY --from=build /app/out/package.json ./package.json
COPY --from=build /app/out/node_modules ./node_modules

# Variáveis de ambiente
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

EXPOSE 4321

# Comando de inicialização usando o entrypoint do Astro Node
CMD ["node", "dist/server/entry.mjs"]
