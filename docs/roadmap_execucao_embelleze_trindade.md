# Roadmap de Execução — Instituto Embelleze Trindade

## ⚡ RESUMO EXECUTIVO (CHECKLIST)

- [x] **FASE 1: CONTEÚDO & BELLA** (Playbook, Voz regional, Árvore de decisão)
- [x] **FASE 2: LANDING PAGE** (Astro 6, Mobile-First, SEO Avançado, Tracking)
- [x] **FASE 3: CRM & BASE DE DADOS** (PostgreSQL Ativo, API de Captura, Registro de Leads)
- [/] **FASE 4: WHATSAPP + IA** (Sandbox PWA Criado, Conexão em progresso)
- [ ] **FASE 5: TRÁFEGO PAGO** (Configuração de Campanhas Google/Meta Ads)
- [ ] **FASE 6: OTIMIZAÇÃO** (Dashboard de Conversão, Follow-up automático)

---

## 1. Objetivo & Visão

Transformar o WhatsApp em uma operação previsível de matrícula através de uma Landing Page de alta conversão e um agente inteligente (Bella).

---

## 2. Stack Consolidada (Produção)

- **Framework:** Astro (SSR Mode)
- **Infra:** Railway (Docker / Node 22 / pnpm v10)
- **Banco de Dados:** PostgreSQL (Tabela `leads` ativa)
- **Cache/Memória:** Redis
- **Domínio:** `https://embelleze-trindade.up.railway.app/`
- **SEO:** JSON-LD, Geo-Targeting (Trindade e região), Meta Tags Otimizadas.

---

## 3. Fases de Execução

### ✅ FASE 1 & 2: Identidade e Presença Digital

- Layout Premium Glassmorphism implementado.
- Foco Mobile-First (Prioridade Android).
- Simulador de Futuro capturando Nome e WhatsApp.
- Tracking configurado (GTM, Meta Pixel, GA4).

### ✅ FASE 3: CRM e Dados

- Banco de dados PostgreSQL centralizando leads.
- API `/api/leads` realizando UPSERT (evita duplicidade).
- Status inicial: `QUALIFICADO` (Simulador) ou `INTERESSADO` (Clique WA).

### ⏳ FASE 4: Inteligência & WhatsApp (PRÓXIMO PASSO)

- Integrar a Bella ao fluxo de mensagens.
- Regra de Handoff: Lead quente → Consultora Humana.
- Automação de follow-up para leads que não converteram de imediato.

### ⏳ FASE 5 & 6: Atração e Escala

- Campanhas de Google Ads (Fundo de Funil: "Curso de Cabeleireiro").
- Campanhas de Meta Ads (Topo de Funil: "Mude de Vida").
- Dashboards de CPL (Custo por Lead) e CAC (Custo de Aquisição).

---

## 4. Ativos & Regras de Negócio

- **WhatsApp Oficial:** 62 99481-3565
- **Cores Oficiais:** Laranja (#de583d), Roxo (#5f3080), Rosa (#c03070).
- **PIX CNPJ:** 19.367.067/0001-97 (Instituto da Beleza Goiana).
- **Regra de Ouro:** Nunca prometer vaga ou preço sem validação da Bella/Consultora.

---

## 5. Próximas Ações Imediatas

1. [ ] Validar conexão do agente Bella com o banco de leads.
2. [ ] Testar fluxo de transição Bella → Humano.
3. [ ] Iniciar criativos para tráfego pago.
