<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->
# MEMORY

```text
========================================
   EMBELLEZE LANDING · MEMORY
========================================
Escopo : embelleze-landing/
Função : Decisões tomadas — não regredir
========================================
```

## ⟠ Decisões

- A landing deve parecer local e real,
  não institucional genérica.
- Bella aparece como consultora virtual
  e ponte para o WhatsApp.
- Oferta é dinâmica por curso ativo
  via `src/content/offers.json`.
- Ticket/código de desconto é mecânica
  de conversão, não desconto real.
- O componente `DiscountTicket` foi comentado por decisão do arquiteto, pois não há ação de marketing ativa no momento. A seção foi mantida modular para ser ativada/desativada conforme a necessidade de campanhas.
- Mapa é página separada em `/mapa`.
- Prova social usa apenas materiais
  aprovados pelo cliente.
- Params UTM de `/oferta` são repassados
  para o link do WhatsApp.
- Webhook MVP validado em PRODUÇÃO e criado em:
  - `src/pages/api/zapi/webhook.ts`
  - `src/lib/zapi.ts` (envio isolado)
  - `src/lib/bella.ts` (resposta isolada)
  - `src/pages/api/health/zapi.ts` (saúde)
- Fluxo de dados: Z-API → Webhook → bella.ts
  → zapi.ts → db.ts.
- Integração Probeltec adiada até auth oficial
  e payload real estarem mapeados.

────────────────────────────────────────

## ⍟ Princípio

A landing não é vitrine.
É máquina de conversão para WhatsApp
e matrícula.
