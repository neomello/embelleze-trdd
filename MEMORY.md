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
┃ Framework PWA Bella   Vite (Vanilla JS)
┃ Estrutura             Repositórios Independentes (Isolados via .gitignore)
┃ Deploy                Railway (Serviços Separados)
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
- **Lead Status**:
  - `NOVO`: Clique direto no WA (se capturado).
  - `QUALIFICADO`: Completou o Simulador (Nome + Telefone + Perfil capturados).
  - `INTERESSADO`: Clicou no WA após o Simulador ou qualquer CTA de conversão.

## ⟠ Gotchas Técnicos

- **Railway Monorepo**: Usar `Dockerfile` na raiz para gerenciar o workspace pnpm. Builder `DOCKER`.
- **pnpm v10**: Requer flag `--legacy` no comando `pnpm deploy` dentro do Dockerfile para monorepos.
- **Node Version**: Requer Node `>=22.12.0` (Astro 6). Atualmente usando `node:22-slim`.
- **Database Connectivity**: Usar `process.env.DATABASE_URL || import.meta.env.DATABASE_URL` para garantir leitura no SSR do Astro no Railway.
- **Deduplicação**: Feita via código (UPSERT manual) baseada no `phone` (ID natural).

────────────────────────────────────────

## ⍟ Princípio

A landing não é institucional.
É uma máquina de conversão para
WhatsApp e matrícula.
"Landing capta intenção. Bella conduz decisão. Banco guarda a verdade."
