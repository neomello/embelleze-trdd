<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

# MEMORY

```text
========================================
   EMBELLEZE TRINDADE · MEMORY
========================================
Escopo : Workspace root
Função : Registrar decisões e progresso
========================================
```

────────────────────────────────────────

## ⟠ Design & UX

- **Identidade**: Laranja `#de583d`, Roxo `#5f3080`.
- **Navegação Home**: Filtros horizontais no mobile.
- **CTAs**: Tom consultivo.
  "Adicionar na minha lista", "Falar com Bella".
- **Acessibilidade**: Logos com proporção travada.
  Usar `width: auto` onde `height` for fixa.

────────────────────────────────────────

## ⟠ Arquitetura Técnica

```text
▓▓▓ INFRA
────────────────────────────────────────
└─ Deploy       Railway via Dockerfile
└─ PNPM         Travado em v10.33.3
└─ Assets       astro:assets (migração concluída)
└─ Tracking     GTAG AW-18004058795
                hardcoded em TrackingPixel.astro
```

```text
▓▓▓ WEBHOOK Z-API — validado em PRODUCAO
────────────────────────────────────────
└─ webhook.ts   Entrada oficial WhatsApp
└─ zapi.ts      Envio isolado com timeout
└─ bella.ts     Resposta isolada (Azure-ready)
└─ health/zapi  Saude da integracao
Fluxo: Z-API → Webhook → bella.ts → zapi.ts → db.ts

└─ Numero       (novo numero Bella — a confirmar)
                Conectado via Z-API com Bella Azure como
                inteligencia de atendimento.
```

```text
▓▓▓ ENDPOINTS DE PRODUCAO
────────────────────────────────────────
└─ Health   GET  /api/health/zapi
└─ Webhook  POST /api/zapi/webhook
            Header: Client-Token: <ZAPI_CLIENT_TOKEN>
Base: https://embelleze-bella.online
```

```text
▓▓▓ PROBELTEC CRM — confirmado tecnicamente
────────────────────────────────────────
└─ Auth         POST /v1/login
└─ Lead         POST /api/v1/lead/new → HTTP 201
└─ idOrigin     7 (Instagram WhatsApp)
└─ idFunnel     1 (SDR)
└─ Idempotência claim atômico no Postgres
└─ JWT          nunca hardcoded — somente via env
└─ Falha        não quebra webhook
```

```text
▓▓▓ PAPEL DE CADA CAMADA
────────────────────────────────────────
└─ Probeltec    CRM primário / fonte comercial
└─ Postgres     Memória operacional, fallback,
                shadow analytics, idempotência
└─ Redis        Contexto temporário (futuro)
└─ ManyChat     Portaria operacional
                Instagram / campanhas / handoff
└─ Bella Azure  Inteligência principal
```

> **Pendência critica**: Trocar senha exposta
> da conta Probeltec apos conclusao dos testes.

────────────────────────────────────────

## ⍟ Segurança

```text
Licao aprendida: o acesso ao ecossistema Probeltec
foi possivel apenas abrindo o Network tab do browser.
Tokens de sessao, endpoints internos, payloads e
dados de leads expostos sem protecao.
Esse e o vetor mais comum e mais negligenciado.
Nao repetir. Nossa responsabilidade comeca em casa.
```

```text
▓▓▓ LAYER 1 — SECRETS
────────────────────────────────────────
└─ Secrets      Nunca hardcodar. Sempre via env.
└─ JWT/Tokens   Nunca expor em API, logs ou JS.
└─ .env         Nunca commitar. .gitignore e defesa.
└─ Senhas       Rotacionar apos uso temporario.
└─ Recon        Sessoes e tokens fora do git.
```

```text
▓▓▓ LAYER 2 — NETWORK / API (vetor principal)
────────────────────────────────────────
O Network tab e a ferramenta mais poderosa
de um atacante passivo.
Toda chamada visivel no frontend e superficie.
────────────────────────────────────────
└─ Data Minimization
   Retornar apenas o minimo necessario.
   Nunca retornar objeto completo do banco.
└─ Sem dados sensiveis no cliente
   Leads, telefones, tokens e configs internas
   nunca aparecem em respostas do browser.
└─ Server-Side first
   Astro SSR: src/pages/api/*.ts roda no servidor.
└─ Sem credenciais em query params
   ?token= expoe em logs, CDN e historico.
└─ CORS restritivo
   Endpoints internos nao aceitam origens livres.
└─ Headers HTTP
   Implementar CSP, HSTS, X-Frame-Options.
```

```text
▓▓▓ LAYER 3 — BANCO
────────────────────────────────────────
└─ Least Privilege
   Usuario Postgres sem DROP, ALTER ou acesso total.
└─ Logs
   Nunca logar senha, token ou telefone completo.
└─ Erros
   Nunca expor stack trace, query SQL ou internals.
```

```text
▓▓▓ LAYER 4 — ENDPOINTS
────────────────────────────────────────
└─ Autenticacao  Client-Token antes de processar.
└─ Rate limit    Protecao contra abuso e enumeracao.
└─ Input         Validar todo payload de entrada.
                 Nunca confiar no POST recebido.
└─ Idempotencia  Duplicatas sem efeito colateral.
```

```text
▓▓▓ LAYER 5 — OPERACIONAL
────────────────────────────────────────
└─ Auditoria     Registrar acesso a credenciais.
└─ Ambientes     Dev e producao nunca compartilham
                 credenciais.
└─ Revisao       A cada fase nova, checar vazamentos
                 em codigo, logs e repositorio.
```

────────────────────────────────────────

## ◬ Gotchas Resolvidos

```text
▓▓▓ HISTORICO
────────────────────────────────────────
└─ Build Railway    only-built-dependencies no .npmrc
                    autoriza sharp.
└─ Logo esticado    width: auto onde height e fixa.
└─ Header duplicado Removido em paginas internas.
└─ Race condition   Claim atomico no Postgres
   Probeltec        antes do createLead.
└─ ALTER TABLE      Removido do hot path do webhook.
└─ fromMe bug       fromMe || true substituido por
                    fromMe !== undefined ? fromMe : true
└─ Erro 400 API     LocationIntentSchema aceita null
   Localização      em neighborhood e salva geo.
└─ Selos de Vidro   Estilo 'Trust Badge' com vidro
                    e cores oficiais (LocalImpact).
└─ Vídeo Reel       Embed do Facebook flutuando
                    sobre imagem do curso (LocalImpact).
```

────────────────────────────────────────

## ⨷ Principio Guia

```text
Landing capta intencao.
Bella conduz decisao.
WhatsApp fecha conversa.
Postgres guarda a verdade.
Vendedora fecha matricula.

ManyChat e a portaria.
Bella e a vendedora.
Postgres e a memoria.

Security by design.
Exploits find no refuge here.
```

────────────────────────────────────────
