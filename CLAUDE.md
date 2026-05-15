# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

**Cliente**: Instituto Embelleze Trindade — cursos profissionalizantes de beleza em Trindade/GO.
**Objetivo**: Captação e conversão de alunos via landing page + WhatsApp com agente SDR (Bella).

## Commands

All commands run from the **workspace root** via Makefile or `pnpm --filter`:

```bash
make install         # instala dependências
make dev             # dev server (embelleze-landing por padrão)
make build           # build de produção
make check           # type check (astro check)
make preview         # preview do último build
make clean           # remove todos os dist/
make reset           # limpa node_modules e reinstala
make audit           # auditoria de segurança (pnpm audit)
```

Para rodar em outro pacote: `make dev FILTER=outro-pacote`

**Antes de qualquer deploy**: `make check && make build` — Railway puxa do git e faz o build no contêiner.

## Architecture

### Workspace

PNPM monorepo com um único pacote ativo: `embelleze-landing` (Astro SSR + Node adapter).
O `Dockerfile` na raiz faz o build e serve o app standalone — **não mover o Dockerfile**.

### embelleze-landing — Camadas

```
src/
  assets/          Imagens otimizadas (astro:assets)
  components/      Componentes reutilizáveis (Header, Footer, Tracking, SEO)
  content/         Dados estáticos (courses.json, faqs.json, offers.json)
  layouts/         BaseLayout.astro — inclui Header + Footer globais
  lib/             Lógica de servidor (integrações, DB, schemas)
  pages/           Rotas Astro; pages/api/*.ts roda server-side
  scripts/         Client-side TS (*.client.ts — não têm acesso a env server)
  sections/        Seções da Home importadas em index.astro
  styles/          global.css, tokens.css, animations.css
```

### Fluxo do Lead

```
Landing page → POST /api/leads ou WhatsApp
                        ↓
              Z-API → POST /api/zapi/webhook
                        ↓
              bella.ts (Bella SDR — Azure OpenAI, atualmente mock)
                        ↓
              db.ts (upsertLead + claimProbeltecSync — Postgres)
                        ↓
              probeltec.ts (createLead → CRM Probeltec)
                        ↓
              zapi.ts (sendTextMessage → WhatsApp)
```

### Integrações Críticas

| Módulo | Arquivo | Função |
|---|---|---|
| WhatsApp links | `src/lib/whatsapp.ts` | **Único ponto** para gerar links wa.me |
| Constantes globais | `src/lib/constants.ts` | Número WA, endereço, cores, features |
| Bella SDR | `src/lib/bella.ts` | Isolada para troca futura por Azure OpenAI |
| Probeltec CRM | `src/lib/probeltec.ts` | Auth + createLead (idOrigin=7, idFunnel=1) |
| Banco Postgres | `src/lib/db.ts` | upsertLead, claimProbeltecSync (atômico) |
| Z-API envio | `src/lib/zapi.ts` | sendTextMessage com timeout |
| Tracking | `src/components/TrackingPixel.astro` | GTAG AW-18004058795 + Meta Pixel |
| SEO local | `src/components/LocalSEO.astro` | Schema.org para SEO local |
| Schemas Zod | `src/lib/schemas.ts` | LeadSchema, LocationIntentSchema |

### Endpoints de Produção

```
GET  /api/health/zapi     saúde da integração Z-API
POST /api/zapi/webhook    entrada do WhatsApp (header: Client-Token)
POST /api/leads           captura de lead via formulário
POST /api/location-intent geolocalização do visitante
```

## Regras de Desenvolvimento

### Astro
- **Imagens**: sempre `<Image />` de `astro:assets` — nunca `<img>` puro para assets locais.
- **Assets**: residem em `src/assets/` para otimização automática pelo Sharp.
- **Header/Footer**: globais via `BaseLayout.astro` — não replicar em páginas específicas.
- **Home**: `index.astro` importa seções independentes de `src/sections/`.

### Segurança
- Secrets **sempre via env** — nunca hardcoded. Consulte `.env.example` para a lista completa.
- Webhook protegido por `Client-Token` antes de processar qualquer payload.
- Logs nunca expõem telefone completo (mascarar: `phone.slice(0, -4) + "****"`).
- Erros internos não chegam ao cliente — retornar mensagem genérica.
- `recon/` está no `.gitignore` — tokens e sessões de reconhecimento ficam fora do git.

### Padrões Técnicos
- `pnpm v10` obrigatoriamente (travado em `10.33.3` no Dockerfile).
- `only-built-dependencies` no `.npmrc` autoriza o build do `sharp` no Railway.
- Probeltec: `claimProbeltecSync` (atômico no Postgres) deve sempre preceder `createLead` — previne race condition entre instâncias.
- `ensureProbeltecColumn` roda uma vez por processo (`probeltecColumnReady` flag) — `ALTER TABLE` fora do hot path.
- Falhas de DB e CRM são **silenciadas** no webhook — a conversa WhatsApp não pode ser interrompida por erro de integração.

## Env Vars Necessárias

Ver `.env.example` em `embelleze-landing/`. Variáveis críticas:
- `DATABASE_URL` — Postgres (Railway)
- `ZAPI_INSTANCE_ID`, `ZAPI_TOKEN`, `ZAPI_CLIENT_TOKEN` — Z-API WhatsApp
- `PROBELTEC_EMAIL`, `PROBELTEC_PASSWORD` — CRM (trocar senha após testes)
- `AZURE_OPENAI_*` — Bella Azure (pendente Fase 3)

## Identidade Visual

- **Laranja** `#de583d` · **Roxo** `#5f3080` · Preto `#171018`
- Logo com `width: auto` onde `height` for fixa (evita esticamento)
- Linguagem: acolhedora, direta, Mobile-First, conversão-focused
