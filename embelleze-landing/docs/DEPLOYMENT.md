<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
   EMBELLEZE LANDING · DEPLOYMENT
========================================
```

## ⟠ Ambientes

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ AMBIENTE     DOMÍNIO               STATUS
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ Provisório   embelleze-trindade    ativo
┃              .flowoff.xyz
┃ Produção     bellaembelleze.chat   pendente DNS
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

────────────────────────────────────────

## ⨷ Variáveis de Ambiente

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ VARIÁVEL                STATUS
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ PUBLIC_GTM_ID           aguardando cliente
┃ PUBLIC_META_PIXEL_ID    aguardando cliente
┃ PUBLIC_GOOGLE_MAPS_KEY  aguardando cliente
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

────────────────────────────────────────

## ⧉ Build

```bash
npm run build
# saída em: /dist
# Railway detecta automaticamente
```

────────────────────────────────────────

## ⍟ Node Adapter (SSR)

Necessário apenas se houver rotas dinâmicas
ou lógica server-side no futuro.

```bash
npx astro add node
```

> Hoje o projeto é estático (`output: "static"`).
> Não instalar o adapter antes de necessário.
