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
STATUS: ESTAVEL
────────────────────────────────────────
└─ Landing Astro com alta performance.
└─ Google Ads GTAG AW-18004058795 operacional.
└─ Mobile-first UX, filtros de cursos dinamicos.
└─ Railway pnpm v10 + Docker corrigido e travado.
```

```text
▓▓▓ FASE 2 — BELLA SDR / WHATSAPP
STATUS: MVP CONCLUIDO / EM ANDAMENTO
────────────────────────────────────────
└─ Webhook Z-API validado em producao.
└─ Leads salvos/atualizados no Postgres.
└─ Respostas isoladas em src/lib/bella.ts.
└─ ProbeltecService implementado e aprovado.
└─ Idempotencia via claim atomico no Postgres.
```

```text
▓▓▓ FASE 3 — BELLA AZURE + CRM REAL
STATUS: PENDENTE
────────────────────────────────────────
└─ Conectar numero novo Bella ao Z-API via QR Code.
└─ Configurar webhook no painel Z-API apontando para
   https://embelleze-bella.online/api/zapi/webhook
└─ Plugar Bella Azure no lugar do mock.
└─ Validar lead real no Probeltec via conversa real.
└─ Criar bella.knowledge.md completo.
└─ Definir handoff humano operacional.
└─ Fase 0.5: mapear rotina comercial da unidade.
```

```text
▓▓▓ FASE SEGURANCA — CONTINUA
STATUS: EM ANDAMENTO
────────────────────────────────────────
[OK] Webhook protegido por Client-Token.
[OK] JWT Probeltec somente via env.
[OK] Logs sem senha, token ou telefone completo.
[OK] recon/ no .gitignore.
[OK] Falhas nao expõem internals na resposta.
[!!] Trocar senha exposta Probeltec — URGENTE.
[ ] Rate limiting no /api/zapi/webhook.
[ ] Auditar envs sensiveis no codigo-fonte.
[ ] Least privilege no usuario Postgres.
[ ] Headers HTTP: CSP, HSTS, X-Frame-Options.
```

────────────────────────────────────────
