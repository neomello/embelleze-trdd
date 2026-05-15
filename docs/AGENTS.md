<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

# AGENTS.md

```text
========================================
   EMBELLEZE TRINDADE · AGENTS (DOCS)
========================================
Escopo : Workspace root
Leitura: obrigatória antes de qualquer ação
========================================
```

+++++++++--------

This workspace uses NEØ DEV AGENT workflow rules.

Before executing any development task, read and follow:

- `.skills/dev-agent.md`

Default behavior:
- Prefer action over excessive questioning.
- Ask only when one missing variable materially changes the result.
- Challenge unsafe, incoherent, or technically flawed premises.
- Make best-effort attempts when context is incomplete, stating assumptions upfront.
- Never perform destructive or infrastructure-changing actions without explicit authorization.

+++++++++--------

## ⟠ Antes de Agir

Leia nesta ordem para obter contexto total:

1. `docs/CONTEXT.md`
2. `docs/SKILL.md`
3. `docs/MEMORY.md`
4. Detecte o projeto correto (atualmente `embelleze-landing`)
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

## ⧉ Estrutura de Documentação

Para evitar confusão, note que existem duas pastas de documentação:
- `docs/` (esta pasta): Guarda o contexto de **negócio**, regras de IAs e planejamento estratégico global.
- `embelleze-landing/docs/`: Guarda a documentação **técnica** e operacional específica da Landing Page (como deploy e tráfego pago).

────────────────────────────────────────

## ⍟ Regras Inegociáveis

- **Não alterar arquivos fora do escopo solicitado.**
- **Não modificar secrets ou chaves de API.**
- **Astro Patterns**:
  - `href` nunca deve ser vazio ou `#`.
  - Use o componente `<Image />` para todas as imagens.
  - Imagens de branding/persona devem ficar em `src/assets/`.
- **Modularidade**: Toda seção da home deve ser um componente separado em `src/sections`.
- **Orquestração**: `src/pages/index.astro` deve apenas orquestrar as seções.
- **Ambiente**: PNPM v10 é o padrão. Nunca degrade para v11 sem autorização expressa.
