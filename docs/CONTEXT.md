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
STATUS: INTEGRADO
────────────────────────────────────────
└─ Webhook Z-API validado em producao.
└─ Leads salvos/atualizados no Postgres.
└─ Bella integrada ao Azure OpenAI.
   System prompt: src/content/bella.knowledge.md.
   Fallback automatico se env Azure ausente.
└─ ProbeltecService implementado — sync atomico.
   Lead so vai ao CRM se upsertLead salvar (leadSaved).
└─ appendLeadEvent persiste em tabela lead_events.
└─ Telefone normalizado (E.164) antes de enviar pela Z-API.
└─ Logs mascaram telefone (apenas ultimos 4 digitos).
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
[OK] Webhook rejeita quando ZAPI_CLIENT_TOKEN nao esta definido.
[OK] Health endpoint exige HEALTH_TOKEN via X-Health-Token.
[OK] content-length validado como numero (nao string).
[OK] Telefone normalizado (E.164) e mascara ****XXXX nos logs.
[OK] JWT Probeltec somente via env.
[OK] recon/ no .gitignore.
[OK] Falhas nao expõem internals na resposta.
[OK] isValidTicket valida formato real do ticket.
[OK] Senha Probeltec trocada.
[ ] Rate limiting no /api/zapi/webhook.
[ ] Least privilege no usuario Postgres.
[ ] Headers HTTP: CSP, HSTS, X-Frame-Options.
```

────────────────────────────────────────
