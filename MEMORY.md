<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
   EMBELLEZE TRINDADE · MEMORY
========================================
Escopo : Workspace root
Função : Registrar decisões fixas
========================================
```

## ⟠ Decisões Fixas

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ DECISÃO               VALOR
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ Agente SDR            Bella
┃ Cor laranja           #de583d
┃ Cor roxo              #5f3080
┃ Cor branco            #ffffff
┃ WhatsApp              62 98483-6550
┃ Framework landing     Astro
┃ Deploy                Railway (Docker)
┃ Domínio final         bellaembelleze.chat
┃ Domínio provisório    embelleze-trindade.flowoff.xyz
┃ CRM                   PostgreSQL no Railway
┃ Memória latente       Redis no Railway (futuro)
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

────────────────────────────────────────

## ⟠ Arquitetura de Dados

- **Single Truth**: Um único banco PostgreSQL no Railway para toda a operação (Landing + Bella).
- **Resiliência**: O salvamento de leads no banco deve ser silencioso e em segundo plano. Se o banco falhar, o redirecionamento para o WhatsApp **nunca** deve ser interrompido.
- **Lead ID**: O telefone (limpo de caracteres) é o identificador natural.
- **Evolução de Status**:
  - `NOVO`: Clique direto no WA (se capturado).
  - `QUALIFICADO`: Completou o Simulador.
  - `INTERESSADO`: Clicou no WA após o Simulador.

## ⟠ Gotchas Técnicos

- **Railway Monorepo**: Usar `Dockerfile` na raiz para gerenciar o workspace pnpm. O builder no `railway.json` deve ser `DOCKER`. Isso evita erros de variáveis indefinidas no Nixpacks.
- **Node Version**: Usar Node `>=20.0.0` (definido no Dockerfile e package.json).
- **TypeScript & ESM**: Em arquivos `.ts` puros no Astro, o `tsconfig.json` deve incluir `"module": "ESNext"` e `"types": ["astro/client"]` para suportar `import.meta.env`.
- **Deduplicação**: Feita via código (UPSERT manual) para evitar travamentos de constraint no banco durante a fase inicial.

────────────────────────────────────────

## ⍟ Princípio

A landing não é institucional.
É uma máquina de conversão para
WhatsApp e matrícula.
"Landing capta intenção. Bella conduz decisão. Banco guarda a verdade."
