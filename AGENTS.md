<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
   EMBELLEZE TRINDADE · AGENTS
========================================
Escopo : Workspace root
Leitura: obrigatória antes de qualquer ação
========================================
```

## ⟠ Antes de Agir

Leia nesta ordem:

1. `CONTEXT.md`
2. `SKILL.md`
3. `MEMORY.md`
4. Detecte o projeto correto
5. Trabalhe no menor escopo funcional

────────────────────────────────────────

## ⨷ Projetos

```text
▓▓▓ PROJETOS DO WORKSPACE
────────────────────────────────────────
└─ embelleze-landing
   Landing page Astro — captação e conversão
```

────────────────────────────────────────

## ⍟ Regras

- Não alterar arquivos fora do escopo solicitado.
- Não modificar secrets.
- Não criar arquitetura desnecessária.
- Não misturar backend, CRM e landing
  sem necessidade explícita.
- Toda seção da home é componente separado
  em `src/sections`.
- `src/pages/index.astro` apenas orquestra seções.
