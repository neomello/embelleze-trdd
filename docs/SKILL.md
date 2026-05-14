<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
   EMBELLEZE TRINDADE · SKILL
========================================
Escopo : Workspace root
Função : Guia técnico de desenvolvimento
========================================
```

## ⟠ Padrões de Código

### 1. Astro Framework
- **Imagens**: Nunca use `<img>` puro para assets locais. Use sempre o componente `<Image />` do `astro:assets`.
- **Assets**: Imagens devem residir em `src/assets/` para otimização automática.
- **Links**: Atributos `href` não podem ser vazios. Use caminhos relativos, âncoras válidas ou URLs externas.
- **Header/Footer**: Devem ser globais via `BaseLayout.astro`. Não duplique em páginas específicas.

### 2. Infraestrutura & Build
- **Package Manager**: Use obrigatoriamente `pnpm v10`.
- **Workspace**: Comandos devem ser rodados da raiz usando `--filter` ou via `Makefile`.
- **Dockerfile**: Mantido na raiz para deploy no Railway. Requer `corepack prepare pnpm@10.33.3 --activate`.
- **.npmrc**: Permissões de build para `sharp` e `esbuild` devem ser mantidas via `only-built-dependencies`.

### 3. Local SEO & Tracking
- **Tracking**: Adicionar tags de rastreamento via `src/components/TrackingPixel.astro`.
- **SEO**: Metadados locais via `src/components/LocalSEO.astro`.

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

────────────────────────────────────────

## ⍟ Estrutura do Projeto

```text
▓▓▓ ESTRUTURA
────────────────────────────────────────
└─ docs/             Documentação (LEIA PRIMEIRO)
└─ embelleze-landing/
   └─ src/assets/    Imagens otimizadas
   └─ src/sections/  Seções da Home
   └─ src/pages/     Páginas e rotas
   └─ src/lib/       Lógica e integrações
```

## ⨷ Regras de Ouro
- Não crie arquitetura complexa sem necessidade.
- Se uma imagem esticar horizontalmente, adicione `width: auto` ao CSS onde a `height` for fixa.
- SEMPRE valide o build local (`make build`) antes de subir para o Railway.
