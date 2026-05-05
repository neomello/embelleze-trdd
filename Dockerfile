# Etapa de Build
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /app
WORKDIR /app

# Instala dependências do workspace de forma otimizada
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Build apenas da landing page
RUN pnpm --filter embelleze-landing build

# Etapa de Runtime (Final)
FROM base AS runtime
WORKDIR /app

# Copia apenas o necessário do build
COPY --from=build /app/embelleze-landing/dist /app/dist
COPY --from=build /app/embelleze-landing/package.json /app/package.json
COPY --from=build /app/embelleze-landing/node_modules /app/node_modules

# Variáveis de ambiente para o Astro
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

EXPOSE 4321

# Comando de inicialização
CMD ["node", "dist/server/entry.mjs"]
