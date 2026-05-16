# Roadmap de Execução — Instituto Embelleze Trindade

> Última atualização: 2026-05-15

## ⚡ RESUMO EXECUTIVO (CHECKLIST)

- [x] **FASE 1: CONTEÚDO & BELLA** (Playbook, Voz regional, Árvore de decisão)
- [x] **FASE 2: LANDING PAGE** (Astro SSR, Mobile-First, SEO, Tracking Google Ads)
- [x] **FASE 3: CRM & BASE DE DADOS** (PostgreSQL + lead_events + UTM first-touch + Probeltec sync atômico)
- [/] **FASE 4: WHATSAPP + IA** (Bella Azure ativa, webhook configurado, aguardando QR Code)
- [/] **FASE 5: TRÁFEGO PAGO** (Google Ads conversão ativa, Meta Pixel pendente conta)
- [ ] **FASE 6: OTIMIZAÇÃO** (Dashboard de Conversão, Follow-up automático)

---

## 1. Objetivo & Visão

Transformar o WhatsApp em uma operação previsível de matrícula através de uma Landing Page de alta conversão e um agente inteligente (Bella).

---

## 2. Stack Consolidada (Produção)

- **Framework:** Astro (SSR Mode + @astrojs/node standalone)
- **Infra:** Railway (Docker / Node 22 / pnpm v10.33.3)
- **Banco de Dados:** PostgreSQL — tabelas `leads` + `lead_events` ativas
- **Cache/Memória:** Redis (location tracking)
- **IA:** Azure OpenAI — `bella-openai` (East US) — ativa
- **WhatsApp:** Z-API — webhook configurado, aguardando QR Code
- **CRM:** Probeltec — sync atômico ativo via `claimProbeltecSync`
- **Domínio:** `https://embelleze-bella.online/`
- **DNS/SSL:** Cloudflare Full Strict + DNSSEC ativo
- **SEO:** JSON-LD Schema.org, Geo-Targeting (Trindade e região), Meta Tags Otimizadas
- **Tracking:** Google Ads AW-18004058795 + conversão SmrtCJXE7q0cEKvFgIlD + UTM first-touch

---

## 3. Fases de Execução

### ✅ FASE 1 & 2: Identidade e Presença Digital

- Layout Premium Glassmorphism implementado. Mobile-First (Android).
- Simulador de Futuro capturando Nome e WhatsApp → Postgres.
- Google Ads GTAG AW-18004058795 operacional em todas as páginas.
- Conversão Google Ads ativa na `/obrigado` (Bella - Lead - Formulário).
- UTM first-touch capturando: URL → sessionStorage → Postgres (4 colunas).
- Cloudflare Full Strict SSL + DNSSEC. NODE_ENV=production.
- ⚠️ Meta Pixel: pendente (problema de conta Meta do cliente).
- ⚠️ GTM: não configurado (opcional, Google Ads direto é suficiente).

### ✅ FASE 3: CRM e Dados

- PostgreSQL com tabelas `leads` + `lead_events` ativas.
- `upsertLead` com UPSERT atômico — deduplicação por telefone.
- UTM first-touch gravado por lead (nunca sobrescrito).
- Probeltec CRM: sync atômico via `claimProbeltecSync` — race condition eliminada.
- Status: `QUALIFICADO` (Simulador) → `INTERESSADO` (Clique WA/GlobalInterceptor).
- Redis ativo para location tracking (`lead_events`).

### ⏳ FASE 4: Inteligência & WhatsApp — EM ANDAMENTO

- ✅ Bella Azure OpenAI ativa (`bella-openai`, East US).
- ✅ Webhook Z-API implementado e validado em produção.
- ✅ Webhook URL configurada no painel Z-API.
- ✅ Tokens Z-API renovados e atualizados no Railway.
- 🔴 **PENDENTE: Conectar número via QR Code na Z-API** ← GARGALO
- [ ] Teste real: WhatsApp → Bella → resposta.
- [ ] Validar lead chegando no Probeltec via conversa real.
- [ ] `bella.knowledge.md` completo.
- [ ] Handoff humano definido com a vendedora.

### ⏳ FASE 5 & 6: Atração e Escala

- ✅ Google Ads: campanha ativa, conversão configurada.
- [ ] Meta Ads: aguardando resolução da conta Meta.
- [ ] Dashboards de CPL e CAC (Metabase → DATABASE_URL Railway).
- [ ] SEO por curso: `/cursos/[slug].astro` com `getStaticPaths`.

---

## 4. Ativos & Regras de Negócio

- **WhatsApp Oficial:** 62 99481-3565
- **Cores Oficiais:** Laranja (#de583d), Roxo (#5f3080), Rosa (#c03070).
- **PIX CNPJ:** 19.367.067/0001-97 (Instituto da Beleza Goiana).
- **Regra de Ouro:** Nunca prometer vaga ou preço sem validação da Bella/Consultora.

---

## 5. Próximas Ações Imediatas (Consolidado)

### 🤖 Inteligência & WhatsApp (Fase 4)

- [ ] Conectar número novo via QR Code na Z-API.
- [ ] Validar envio de mensagem manual.
- [ ] Configurar webhook de mensagens recebidas apontando para a camada da Bella/Azure.
- [ ] Testar resposta simples da IA Bella.
- [ ] Validar conexão do agente Bella com o banco de leads (PostgreSQL).
- [ ] Testar fluxo de transição Bella → Humano (Handoff).

### 📊 Banco de Dados & Infra

- [x] Tabela `lead_events` implementada e ativa.
- [x] Crash loop Railway corrigido (Redis + Postgres error handlers).
- [x] Health endpoint `/api/health` operacional.

### 📢 Atração & Escala (Fase 5)

- [ ] Iniciar produção de criativos para tráfego pago (Google/Meta Ads).
