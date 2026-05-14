<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

# ⧉ DOSSÊ TÉCNICO PROBELTEC EMBELLEZE

────────────────────────────────────────

```text
========================================
    EMBELLEZE · DOSSIÊ TÉCNICO
========================================
Status: ACTIVE
Version: v1.0.0
========================================
```

## ⟠ Contexto

- Plataforma institucional utilizada pela rede/franquias Embelleze.
- Frontend identificado como aplicação Vue.js.
- Autenticação baseada em JWT via cookie de sessão.
- Arquitetura modular com múltiplos serviços.

────────────────────────────────────────

## ⨷ Serviços Identificados

### Core API
- https://api.probeltec.com/api/v1

### Auth API
- https://api-auth.probeltec.com/v1

### Student API
- https://api-student.probeltec.com

### Notifications API
- https://api-notifications.probeltec.com

────────────────────────────────────────

## ⧉ Infraestrutura

- Landing institucional: https://lp-franquia.institutoembelleze.com/
- Financeiro Iugu: https://alia.iugu.com/
- Boleto Santander: https://www.santander.com.br/2-via-boleto
- Asset público identificado:
  https://assets.institutoembelleze.com/docs/probeltec/leads/planilha-probeltec-20251216.xlsx

────────────────────────────────────────

## ⍟ CRM / Leads

```text
▓▓▓ ENDPOINTS CRM / LEADS
────────────────────────────────────────
└─ /bi/kpis/leads
└─ /bi/kpis/leads-conversion
└─ /lead/
└─ /lead/:id_lead
└─ /lead/new
└─ /lead/update/
└─ /lead/delete
└─ /lead/notes/new
└─ /lead/tags/new
└─ /lead/tags/remove
└─ /lead/status/change
└─ /lead/status/mass-change
└─ /lead/sellers/change
└─ /lead/scheduler/change
└─ /lead/update-funnel
└─ /lead/funnels
└─ /lead/cancellation-reasons
└─ /leads
└─ /leads/new
└─ /leads-hot
└─ /leads/import
└─ /leads/status
└─ /leads/origins
└─ /leads/orphan/distribute
└─ /callix-public/contact
└─ /callix-public/contact?lead_token=
└─ /callix-public/lead/notes/new
└─ /callix-public/status/lead/
└─ /integracao-crm
```

────────────────────────────────────────

## ⧇ Cursos / Turmas / Matrículas

```text
▓▓▓ ENDPOINTS CURSOS / TURMAS / MATRÍCULAS
────────────────────────────────────────
└─ /course/
└─ /course/:id_course
└─ /course/new
└─ /course/update/
└─ /courses
└─ /calendar/classes
└─ /class/
└─ /class/:id_class
└─ /class/new
└─ /class/students/
└─ /class/attendance
└─ /classes
└─ /classes/list
└─ /classes/simple/list
└─ /enrollment/new
└─ /enrollment/step1
└─ /enrollment/step2
└─ /enrollment/simulator
└─ /enrollment/end
└─ /student/:id_student
└─ /students
└─ /students/export/
```

────────────────────────────────────────

## ⧖ Financeiro

```text
▓▓▓ ENDPOINTS FINANCEIRO
────────────────────────────────────────
└─ /bi/kpis/payment-in-advance
└─ /bi/kpis/enrollments
└─ /payment-api/checkout
└─ /payment-api/pix
└─ /payment-api/get/pix
└─ /payment-api/order/cancel
└─ /payment-api/settings
└─ /invoice/create
└─ /invoice/cancel
└─ /financial/payment-methods
└─ /financial/boletos
└─ /boletos/conciliation
└─ /charges-boletos
└─ /carne-pix
└─ /iugu-installment/
```

────────────────────────────────────────

## ⧗ Site / Presença Digital

```text
▓▓▓ ENDPOINTS SITE / PRESENÇA DIGITAL
────────────────────────────────────────
└─ /site
└─ /site/generate-landing
└─ /site/update-informations
└─ /site/update-whatsapp
└─ /site/whatsapp
└─ /site/verify-domain
└─ /site/facebook/domain
```

────────────────────────────────────────

## ◬ Notificações

```text
▓▓▓ ENDPOINTS NOTIFICAÇÕES
────────────────────────────────────────
└─ /notifications
└─ /notifications/global
└─ /notifications/integration
└─ /notifications/setup-sms
```

────────────────────────────────────────

## ◭ Franquia

```text
▓▓▓ ENDPOINTS FRANQUIA
────────────────────────────────────────
└─ /franchise/checklists?page=
└─ /franchiser/checklists?page=
└─ /financial/franchiser-charges
```

────────────────────────────────────────

## ◮ Observações Factuais

- CRM institucional existente
- Pipeline comercial existente
- BI comercial existente
- Gestão de cursos/turmas existente
- Matrícula digital existente
- Financeiro integrado existente
- Notificações institucionais existentes
- Gestão de site/landing existente

────────────────────────────────────────

```text
▓▓▓ NΞØ MELLØ
────────────────────────────────────────
Core Architect · NΞØ Protocol
neo@neoprotocol.space

"Code is law. Expand until
chaos becomes protocol."

Security by design.
Exploits find no refuge here.
────────────────────────────────────────
```
