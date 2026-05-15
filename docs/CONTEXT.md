<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
   EMBELLEZE TRINDADE · CONTEXT
========================================
Escopo : Workspace root
========================================
```

────────────────────────────────────────

## ⟠ Cliente

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ NOME       Instituto Embelleze Trindade
┃ RAZAO      Instituto da Beleza Goiana de
┃            Ensino e Servicos LTDA - ME
┃ CNPJ       19.367.067/0001-97
┃ ENDERECO   Av. Manoel Monteiro, 1691
┃            Trindade/GO
┃ WHATSAPP   62 99481-3565
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

────────────────────────────────────────

## ⨷ Objetivo

Construir operacao digital de captacao, qualificacao
e conversao de alunos para cursos profissionalizantes.
Transformar cliques em leads qualificados
prontos para fechar matricula via WhatsApp.

────────────────────────────────────────

## ⧉ Canais

```text
▓▓▓ CANAIS ATIVOS
────────────────────────────────────────
└─ Landing      https://embelleze-bella.online/
└─ WhatsApp     62 99481-3565 (oficial da unidade)
└─ Bella        Agente SDR via Azure OpenAI
                Numero novo exclusivo: 62 99481-3565
└─ Google Ads   AW-18004058795
└─ Meta Ads     Pixel a confirmar
```

────────────────────────────────────────

## ⍟ Posicionamento

Nao vender apenas curso.
Vender transformacao pratica, renda rapida
e nova oportunidade de vida.
Linguagem acolhedora, profissional, Mobile-First.

────────────────────────────────────────

## ◬ Status da Operacao

> Ultima atualizacao: 2026-05-15

```text
▓▓▓ FASE 0 — RECON TECNICO
STATUS: CONCLUIDO
────────────────────────────────────────
└─ Backoffice/CRM Probeltec identificado.
└─ Auth validada via POST /v1/login.
└─ Lead criado via POST /api/v1/lead/new (HTTP 201).
└─ Arquitetura documentada. Canvas atualizado.
```

```text
▓▓▓ FASE 1 — LANDING E INFRA
STATUS: CONCLUIDO
────────────────────────────────────────
└─ Landing Astro com alta performance.
└─ Google Ads GTAG AW-18004058795 operacional.
└─ Conversao Google Ads ativa: AW-18004058795/SmrtCJXE7q0cEKvFgIlD
   Acao: Bella - Lead - Formulario (pagina /obrigado).
└─ Mobile-first UX, filtros de cursos dinamicos.
└─ Railway pnpm v10 + Docker corrigido e travado.
└─ PORT=8080 corrigido. NODE_ENV=production.
└─ Cloudflare Full Strict SSL + DNSSEC ativo.
└─ UTM first-touch capturando: URL → sessionStorage → Postgres.
└─ AcademyTeaser mobile corrigido.
└─ ObjectionBreak: avatar Bella + sons iOS reais.
└─ Meta Pixel: PENDENTE (problema de conta Meta do cliente).
```

```text
▓▓▓ FASE 2 — BELLA SDR / WHATSAPP
STATUS: INTEGRADO
────────────────────────────────────────
└─ Webhook Z-API validado em producao.
└─ Leads salvos/atualizados no Postgres.
└─ UTM first-touch gravado por lead (4 colunas).
└─ Bella integrada ao Azure OpenAI.
   System prompt: src/content/bella.knowledge.md.
   Fallback automatico se env Azure ausente (MOCK ATIVO).
└─ ProbeltecService implementado — sync atomico.
   Lead so vai ao CRM se upsertLead salvar (leadSaved).
└─ appendLeadEvent persiste em tabela lead_events.
└─ Telefone normalizado (E.164) antes de enviar pela Z-API.
└─ Logs mascaram telefone (apenas ultimos 4 digitos).
└─ Redis erro handler corrigido (crash loop eliminado).
└─ pool.on('error') corrigido no Postgres (crash loop eliminado).
└─ ZAPI_CLIENT_TOKEN renovado e atualizado no Railway.
└─ Webhook URL configurada no painel Z-API:
   https://embelleze-bella.online/api/zapi/webhook
```

```text
▓▓▓ FASE 3 — BELLA AZURE + CRM REAL
STATUS: EM ANDAMENTO
────────────────────────────────────────
[OK] Webhook URL configurada no Z-API.
[OK] Tokens Z-API renovados.
[ ] Conectar numero Bella ao Z-API via QR Code.  ← GARGALO ATUAL
[ ] Teste real: WhatsApp → Bella → resposta.
[ ] Validar lead real chegando no Probeltec via conversa real.
[ ] Plugar Bella Azure no lugar do mock.
[ ] bella.knowledge.md completo.
[ ] Handoff humano definido com a vendedora.
[ ] FASE 0.5: mapear rotina comercial da unidade.
```

```text
▓▓▓ FASE SEGURANCA — CONTINUA
STATUS: EM ANDAMENTO
────────────────────────────────────────
[OK] Webhook rejeita quando ZAPI_CLIENT_TOKEN nao esta definido.
[OK] Health endpoint /api/health operacional.
[OK] Telefone normalizado (E.164) e mascara ****XXXX nos logs.
[OK] JWT Probeltec somente via env.
[OK] recon/ no .gitignore.
[OK] Falhas nao expõem internals na resposta.
[OK] Senha Probeltec trocada.
[ ] Rate limiting no /api/zapi/webhook.
[ ] Least privilege no usuario Postgres.
[ ] Headers HTTP: CSP, HSTS, X-Frame-Options.
```

```text
▓▓▓ PROXIMAS FASES — BACKLOG
────────────────────────────────────────
[ ] Dashboard de leads (Metabase → DATABASE_URL Railway).
[ ] SEO /cursos/[slug].astro com getStaticPaths.
[ ] Bella Azure substituindo mock.
[ ] ManyChat para Instagram / handoff visual (decisao pendente).
[ ] Meta Pixel (aguardando resolucao conta Meta).
[ ] Resend para notificacoes internas.
```

────────────────────────────────────────
