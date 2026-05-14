<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

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
- Mapa é página separada em `/mapa`.
- Prova social usa apenas materiais
  aprovados pelo cliente.
- Params UTM de `/oferta` são repassados
  para o link do WhatsApp.
- Webhook da Z-API criado em `/api/zapi/webhook`
  como camada oficial de entrada.
- Fluxo de dados: Z-API → Webhook → bella.ts
  → zapi.ts → db.ts.
- Lógica da Bella isolada em `src/lib/bella.ts`
  para facilitar futura troca por Azure.
- Envio de mensagens isolado em `src/lib/zapi.ts`
  com validação e timeout.
- Variáveis de ambiente registradas para Z-API
  e Azure OpenAI no `.env.example`.
- Integração com Probeltec adiada até mapearmos
  autenticação e payloads reais.

────────────────────────────────────────

## ⍟ Princípio

A landing não é vitrine.
É máquina de conversão para WhatsApp
e matrícula.
