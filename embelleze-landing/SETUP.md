<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
   EMBELLEZE TRINDADE · SETUP
========================================
Framework : Astro
Runtime   : Node.js >=22.0.0
Deploy    : Railway
========================================
```

## ⟠ Pré-requisitos

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ REQUISITO     VERSÃO
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ Node.js       >=22.0.0
┃ npm           >=10.0.0
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Se usar `mise`:

```bash
mise install node@22
mise use node@22
```

────────────────────────────────────────

## ⨷ Instalação

```bash
cd embelleze-landing
npm install
```

────────────────────────────────────────

## ⧉ Variáveis de Ambiente

Copie o arquivo de exemplo e preencha as chaves
após receber os acessos do cliente:

```bash
cp .env.example .env
```

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ VARIÁVEL                  FONTE
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ PUBLIC_GTM_ID             Google Tag Manager
┃ PUBLIC_META_PIXEL_ID      Meta Business Suite
┃ PUBLIC_GOOGLE_MAPS_KEY    Google Cloud Console
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

> Enquanto os IDs não estiverem preenchidos,
> GTM e Meta Pixel simplesmente não são injetados.
> O build não quebra.

────────────────────────────────────────

## ⧇ Comandos

```bash
# servidor local com hot reload
npm run dev

# build de produção (saída em /dist)
npm run build

# preview do build gerado
npm run preview
```

────────────────────────────────────────

## ⍟ Estrutura do Projeto

```text
embelleze-landing/
├── public/
│   ├── bella/          fotos da Bella (a inserir)
│   ├── brand/          logos e brandbook
│   └── social/         provas sociais aprovadas
│
├── src/
│   ├── pages/          index, mapa, oferta, obrigado
│   ├── sections/       blocos da home (um por seção)
│   ├── components/     UI reutilizável
│   ├── layouts/        BaseLayout.astro
│   ├── content/        dados editáveis (JSON + MD)
│   ├── lib/            whatsapp, tracking, geo, discount
│   ├── styles/         tokens, global, animations
│   └── scripts/        scripts client-side
│
├── docs/               documentação estratégica
├── .env.example        modelo de variáveis
├── astro.config.mjs    configuração do Astro
└── SETUP.md            este arquivo
```

────────────────────────────────────────

## ◬ Conteúdo Editável

Estes arquivos não exigem toque no código:

```text
▓▓▓ CONTEÚDO
────────────────────────────────────────
└─ src/content/courses.json
   Cursos, horários e dados confirmados.
   confirmed: false = exibe fallback WA.

└─ src/content/offers.json
   Oferta ativa na home.
   Alterar courseId para trocar o curso em destaque.

└─ src/content/testimonials.json
   Depoimentos. approved: true para exibir.

└─ src/content/bella.knowledge.md
   Base de conhecimento da Bella.
```

────────────────────────────────────────

## ◭ Deploy — Railway

```bash
# build detectado automaticamente pelo Railway
npm run build
# saída em: /dist
```

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ AMBIENTE      DOMÍNIO
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ Provisório    embelleze-trindade.flowoff.xyz
┃ Produção      bellaembelleze.chat (pendente DNS)
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

> Para SSR ou rotas dinâmicas futuras,
> instalar o adapter Node antes do deploy:

```bash
npx astro add node
```

────────────────────────────────────────

```text
▓▓▓ EMBELLEZE TRINDADE
────────────────────────────────────────
Operação digital · captação e conversão
Trindade/GO
────────────────────────────────────────
```
