<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
   EMBELLEZE LANDING · AGENTS
========================================
Escopo : embelleze-landing/
Leitura: obrigatória antes de qualquer ação
========================================
```

## ⟠ Projeto

Landing page oficial de captação do
Instituto Embelleze Trindade.

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ Framework   Astro
┃ Estilo      CSS modular/global simples
┃ Deploy      Railway
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

────────────────────────────────────────

## ⨷ Estrutura Obrigatória

```text
▓▓▓ ONDE CADA COISA FICA
────────────────────────────────────────
└─ src/pages/index.astro   apenas importa seções
└─ src/sections/           blocos da landing
└─ src/components/         UI reutilizável
└─ src/content/            dados editáveis
└─ src/lib/                WhatsApp, tracking,
                           geo, desconto
```

────────────────────────────────────────

## ⍟ Proibições

- Não colocar seções dentro de `index.astro`.
- Não duplicar links de WhatsApp.
- Não inventar dados comerciais.
- Não inserir preços sem validação do cliente.
- Não criar dependências pesadas sem necessidade.
