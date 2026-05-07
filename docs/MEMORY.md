<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
   EMBELLEZE TRINDADE · MEMORY
========================================
Escopo : Workspace root
Função : Registrar decisões e progresso
========================================
```

## ⟠ Decisões Fixas de Design & UX

- **Identidade**: Cores institucionais (Laranja `#de583d`, Roxo `#5f3080`).
- **Navegação Home**: Filtros horizontais no mobile para categorias de cursos.
- **CTAs**: Tom consultivo ("Adicionar na minha lista", "Falar com Bella").
- **Acessibilidade**: Logos com proporção travada para evitar distorção horizontal.

## ⟠ Arquitetura Técnica (Atualizada)

- **Deploy**: Railway via Dockerfile (Build customizado).
- **PNPM**: Travado na v10.33.3 para compatibilidade com comandos de deploy do workspace.
- **Performance**: Migração total para `astro:assets` concluída.
- **Tracking**: Google Ads Tag (AW-18004058795) hardcoded no `TrackingPixel.astro` para evitar falhas de variáveis de ambiente no build do Railway.

## ⟠ Histórico de Problemas Resolvidos (Gotchas)

- **Erro Build Railway**: Resolvido configurando `only-built-dependencies` no `.npmrc` para autorizar o `sharp`.
- **Logo Esticado**: Corrigido usando `width: auto` nas classes globais de logo.
- **Header Duplicado**: Removido redundâncias em páginas internas que chamavam o Header manualmente em vez de usar o Layout.

## ⍟ Princípio Guia
"Landing capta intenção. Bella conduz decisão. Banco guarda a verdade."
A landing page deve ser rápida, visualmente premium e focada em levar o usuário para o WhatsApp o mais rápido possível.
