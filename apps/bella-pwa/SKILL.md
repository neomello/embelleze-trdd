<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
   EMBELLEZE TRINDADE · SKILL
========================================
Escopo : Workspace root
Função : Define como operar aqui
========================================
```

## ⟠ Rotina de Operação

1. Leia `AGENTS.md`
2. Leia `CONTEXT.md`, `MEMORY.md` e `ROADMAP.md`
3. Se a tarefa for de PERSONA, leia `persona/BELLA_MASTER.md`
4. Identifique o domínio da tarefa:
   landing · Bella · CRM · tracking · ads
5. Aplique a menor mudança funcional
6. Preserve a estrutura modular
7. Informe risco residual


────────────────────────────────────────

## ⍟ Regras

```text
▓▓▓ ONDE CADA COISA FICA
────────────────────────────────────────
└─ Landing           embelleze-landing/
└─ Home              src/pages/index.astro
                     (apenas orquestrador)
└─ Seções            src/sections/
└─ Componentes       src/components/
└─ Dados editáveis   src/content/
└─ Links WhatsApp    src/lib/whatsapp.ts
└─ Tracking          src/lib/tracking.ts
```

- Não hardcodar WhatsApp em vários arquivos.
- Não alterar escopo além do solicitado.
