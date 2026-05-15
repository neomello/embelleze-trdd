# Etapa de Build
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.33.3 --activate

FROM base AS build
COPY . /app
WORKDIR /app

# Instala todas as dependências do workspace
RUN pnpm install

# Isola o projeto da landing page para produção (resolve symlinks do pnpm)
# No pnpm v10+, a flag --legacy é necessária para manter o comportamento anterior
RUN pnpm --filter embelleze-landing --prod deploy --legacy /app/out

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
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

# Comando de inicialização usando o entrypoint do Astro Node
CMD ["node", "dist/server/entry.mjs"]
