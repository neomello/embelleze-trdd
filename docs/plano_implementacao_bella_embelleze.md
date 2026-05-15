# Plano de Implementação — Bella + Landing + WhatsApp

Projeto: Instituto Embelleze Trindade  
Unidade: Trindade/GO  
Agente SDR/Atendimento: Bella  
Objetivo: colocar a operação comercial no ar com landing, WhatsApp, banco de dados, IA e tracking mínimo, mantendo tudo simples, modular e evolutivo.

---

## 0. Princípio da Implementação

A operação deve seguir esta lógica:

```txt
Landing capta intenção
Bella conduz decisão
WhatsApp fecha conversa
Postgres guarda a verdade
Vendedora fecha matrícula
```

Regra central:

```txt
Não construir complexidade antes de validar conversão.
```

---

## 1. Arquitetura Base

```txt
Usuário / Visitante
        ↓
Landing Page Astro
        ↓
CTA / Simulador / Ticket / Curso
        ↓
Registro no Postgres
        ↓
WhatsApp Bella via Z-API
        ↓
Bella na Azure
        ↓
Postgres / Redis
        ↓
Vendedora Humana
        ↓
Matrícula / Reserva PIX
        ↓
Relatórios e otimização
```

---

## 2. Stack Decidida

### Landing Page

```txt
Framework: Astro
Hospedagem: Railway
Domínio previsto: embelleze-bella.online
Workspace: /Users/nettomello/CODIGOS/projects/embelleze-trdd/
Projeto landing: /Users/nettomello/CODIGOS/projects/embelleze-trdd/embelleze-landing
```

### Banco

```txt
PostgreSQL: Railway
Uso: leads, status comercial, origem, curso, histórico mínimo
```

### Memória curta / contexto

```txt
Redis: Railway
Uso futuro: memória latente da Bella, contexto temporário de conversa
```

### IA

```txt
Bella: Azure
Função: inteligência, qualificação, personalidade, condução de conversa
```

### WhatsApp

```txt
Provider inicial: Z-API
Número: exclusivo da Bella
DDD: 62
Uso: canal principal de atendimento da Bella
```

### ManyChat

```txt
Uso previsto: camada visual/operacional para campanhas, Instagram, possível inbox e handoff humano.
Não será o cérebro da Bella.
Bella permanece na Azure.
```

Regra:

```txt
ManyChat é portaria/camada operacional.
Bella é inteligência e condução comercial.
Postgres é memória e fonte da verdade.
```

### Email / Notificações

```txt
Resend
Uso futuro: alertas, notificações internas, recuperação por email se necessário
```

---

## 3. Dados Fixos da Marca

> **Cores**

```txt
Laranja: #de583d
Roxo: #5f3080
Branco: #ffffff
```

> **WhatsApp**

```txt
Número oficial atual: 62 99481-3565
Número novo Bella: 62 99481-3565
```

> Empresa

```txt
Nome fantasia: Instituto Embelleze Trindade
Razão social: Instituto da Beleza Goiana de Ensino e Serviços LTDA - ME
CNPJ: 19.367.067/0001-97
Cidade: Trindade/GO
```

---

## 4. Estrutura do Projeto

```txt
embelleze-trdd/
├── AGENTS.md
├── CONTEXT.md
├── MEMORY.md
├── SKILL.md
├── .cursorrules
├── .codex
├── README.md
│
└── embelleze-landing/
    ├── AGENTS.md
    ├── CONTEXT.md
    ├── MEMORY.md
    ├── SKILL.md
    ├── .cursorrules
    ├── .codex
    ├── README.md
    ├── package.json
    ├── astro.config.mjs
    ├── .env.example
    │
    ├── public/
    │   ├── bella/
    │   │   ├── bella-front.png
    │   │   ├── bella-side-1.png
    │   │   ├── bella-side-2.png
    │   │   ├── bella-back.png
    │   │   └── bella-face.png
    │   └── brand/
    │
    └── src/
        ├── pages/
        │   ├── index.astro
        │   ├── mapa.astro
        │   ├── oferta.astro
        │   ├── obrigado.astro
        │   └── cursos/[slug].astro
        │
        ├── layouts/
        │   └── BaseLayout.astro
        │
        ├── sections/
        │   ├── Hero.astro
        │   ├── BellaIntro.astro
        │   ├── LocalImpact.astro
        │   ├── CourseOffer.astro
        │   ├── DiscountTicket.astro
        │   ├── CoursesGrid.astro
        │   ├── ObjectionBreak.astro
        │   ├── SocialProof.astro
        │   ├── FutureSimulator.astro
        │   ├── MapPreview.astro
        │   ├── FinalCTA.astro
        │   └── WhatsAppFloat.astro
        │
        ├── components/
        ├── content/
        │   ├── courses.json
        │   ├── offers.json
        │   ├── faqs.json
        │   └── bella.knowledge.md
        │
        ├── lib/
        │   ├── db.ts
        │   ├── whatsapp.ts
        │   ├── tracking.ts
        │   ├── discount-code.ts
        │   └── geo.ts
        │
        └── styles/
            ├── global.css
            ├── tokens.css
            └── animations.css
```

---

## 5. Seções da Home

`src/pages/index.astro` deve apenas orquestrar as seções.

Ordem aprovada:

```txt
1. Hero
2. BellaIntro
3. LocalImpact
4. CourseOffer
5. DiscountTicket
6. CoursesGrid
7. ObjectionBreak
8. SocialProof
9. FutureSimulator
10. MapPreview
11. FinalCTA
12. WhatsAppFloat
```

---

## 6. Função de Cada Seção

### 6.1 Hero

Objetivo:

```txt
Capturar atenção em 3 segundos e gerar clique.
```

Copy base:

```txt
Sua nova profissão começa em Trindade.
E pode começar ainda hoje.

Cursos profissionalizantes na área da beleza com prática real, acompanhamento e turmas presenciais.
```

CTA:

```txt
Falar com a Bella agora
```

---

### 6.2 BellaIntro

Objetivo:

```txt
Apresentar Bella como consultora virtual e reduzir fricção.
```

Copy base:

```txt
Oi, eu sou a Bella.
Vou te ajudar a escolher o curso ideal para seu momento e te mostrar como começar.
```

---

### 6.3 LocalImpact

Objetivo:

```txt
Reforçar presença física em Trindade e confiança local.
```

Copy base:

```txt
O Instituto Embelleze Trindade é uma unidade presencial para quem quer aprender beleza na prática, com acompanhamento real e estrutura local.
```

---

### 6.4 CourseOffer

Objetivo:

```txt
Mostrar curso/oferta da vez, sem depender de todos os cursos ao mesmo tempo.
```

Regras:

```txt
Não inventar preço.
Não inventar data.
Não afirmar últimas vagas sem confirmação.
```

---

### 6.5 DiscountTicket

Objetivo:

```txt
Criar ação imediata com código/ticket de reserva.
```

Copy base:

```txt
Gere seu código de atendimento e fale com a Bella para verificar as condições disponíveis para sua turma.
```

---

### 6.6 CoursesGrid

Objetivo:

```txt
Mostrar cursos disponíveis e enviar contexto correto para WhatsApp.
```

Cada botão deve enviar:

```txt
Oi Bella, vim pela página e quero saber sobre [NOME DO CURSO].
```

---

### 6.7 ObjectionBreak

Objetivo:

```txt
Remover medo antes do WhatsApp.
```

Objeções:

```txt
Não tenho experiência.
Tenho medo de não conseguir.
Não sei qual curso escolher.
Será que vale a pena?
```

---

### 6.8 SocialProof

Objetivo:

```txt
Mostrar prova real quando o cliente fornecer material aprovado.
```

Regra:

```txt
Não inventar número de alunos, avaliações ou resultados.
```

---

### 6.9 FutureSimulator

Objetivo:

```txt
Criar interação, capturar intenção e qualificar lead.
```

Perguntas:

```txt
Você quer renda extra ou nova profissão?
Você já tem experiência na área da beleza?
Qual área te chama mais atenção?
```

Resultado:

```txt
Curso sugerido + CTA para Bella.
```

---

### 6.10 MapPreview

Objetivo:

```txt
Levar para página /mapa e mostrar presença física.
```

CTA:

```txt
Ver distância até o Instituto
```

---

### 6.11 FinalCTA

Objetivo:

```txt
Fechamento direto.
```

Copy base:

```txt
Daqui a alguns meses, tudo pode continuar igual.
Ou você pode estar começando uma nova profissão.
```

---

### 6.12 WhatsAppFloat

Objetivo:

```txt
Manter conversão sempre disponível.
```

---

## 7. Cursos Confirmados

### Barbeiro Profissional

```txt
Duração: 4 meses e meio
Frequência: 1x por semana
Horário: Segunda-feira, 18h30 às 22h30
```

### Cabeleireiro Profissional

```txt
Duração: 14 meses
Frequência: 1x por semana
Horário: Sábado, 08h30 às 12h30
```

### Manicure e Pedicure Profissional

```txt
Duração: 7 meses
Frequência: 1x por semana
Horário: Quarta-feira, 13h30 às 17h
```

### Design de Cílios

```txt
Duração: 3 meses
Frequência: 1x por semana
Horário: Sábado, 08h30 às 12h30
```

### Alongamento de Unhas

```txt
Duração: 2 meses e meio
Frequência: 1x por semana
Horário: Terça-feira, 18h30 às 22h30
```

### Maquiagem Profissional

```txt
Duração: 5 meses e meio
Frequência: 1x por semana
Horário: Terça-feira, 13h30 às 17h30
```

---

## 8. Cursos Pendentes de Dados Locais

```txt
Design de Sobrancelhas
Depilação
Penteados
```

Regra:

```txt
Exibir nome, descrição e CTA.
Não exibir duração nem horário até confirmação.
```

---

## 9. Descrições Seguras dos Cursos

### Cabeleireiro Profissional

```txt
Aprenda técnicas completas de cabelo como corte, coloração, visagismo e transformação capilar para atuar profissionalmente em salões ou de forma independente.
```

### Barbeiro Profissional

```txt
Aprenda cortes masculinos, barba, visagismo e técnicas profissionais para começar a atender clientes com segurança.
```

### Manicure e Pedicure Profissional

```txt
Aprenda cutilagem, esmaltação, biossegurança e cuidados com unhas para atuar profissionalmente.
```

### Design de Cílios

```txt
Aprenda técnicas de extensão de cílios, fio a fio, lifting e manutenção profissional.
```

### Alongamento de Unhas

```txt
Aprenda técnicas modernas de alongamento como gel, acrigel e acrílico para atuação profissional.
```

### Maquiagem Profissional

```txt
Aprenda maquiagem profissional com técnicas modernas de pele, acabamento e valorização da beleza.
```

### Design de Sobrancelhas

```txt
Aprenda design, simetria, visagismo e técnicas para valorizar o olhar de cada cliente.
```

### Depilação

```txt
Aprenda técnicas profissionais de depilação, biossegurança e atendimento ao cliente.
```

### Penteados

```txt
Aprenda penteados profissionais para eventos, produções e atendimento na área da beleza.
```

---

## 10. Banco de Dados Mínimo

Tabela principal:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT,
  phone TEXT NOT NULL,
  origin TEXT,
  course_interest TEXT,
  objective TEXT,
  status TEXT DEFAULT 'NOVO',
  last_message TEXT,
  assigned_to TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
```

Regra:

```txt
Não aplicar unique_phone agora.
Deduplicação por telefone deve ser feita no código.
```

---

## 11. Status Comerciais

```txt
NOVO
QUALIFICADO
INTERESSADO
QUENTE
ENCAMINHADO
MATRICULADO
PERDIDO
```

Regras:

```txt
Clique simples → NOVO
Simulador completo → QUALIFICADO
Curso escolhido + WhatsApp → INTERESSADO
Pedido humano → ENCAMINHADO
```

---

## 12. Regras de Integração Landing → Banco

Implementar salvamento em:

```txt
Simulador de Futuro
Clique no botão WhatsApp com curso/contexto
Geração de ticket/código
```

Regras:

```txt
Se o banco falhar, a landing não pode quebrar.
WhatsApp precisa continuar funcionando.
Não salvar dados sensíveis desnecessários.
Não criar campos fora da tabela atual sem autorização.
```

---

## 13. Z-API — WhatsApp Bella

### Situação atual

```txt
Instância Z-API criada.
Número exclusivo Bella em processo de ativação.
QR Code disponível para conexão.
Webhooks ainda precisam ser configurados.
```

### Dados preenchidos no perfil da Z-API

Segmento:

```txt
Escola profissionalizante na área da beleza, captação de leads via anúncios e landing pages, atendimento comercial via WhatsApp com IA e equipe humana.
```

Necessidades:

```txt
Automatizar qualificação de leads, atendimento comercial via WhatsApp com IA personalizada, transferência para atendimento humano, registro em banco próprio e aumento de conversão comercial.
```

### Próximos passos Z-API

```txt
1. Conectar número novo via QR Code.
2. Validar envio de mensagem manual.
3. Configurar webhook de mensagens recebidas.
4. Apontar webhook para camada da Bella/Azure.
5. Testar resposta simples.
6. Registrar lead no Postgres.
7. Testar handoff humano.
```

---

## 14. ManyChat — Camada Visual / Operacional

### Papel do ManyChat

O ManyChat pode ser usado como plataforma visual para facilitar operação comercial, especialmente em Instagram e campanhas.

Uso permitido:

```txt
Instagram DM
comentário → DM
campanhas com palavra-chave
inbox visual
atendimento humano
tags operacionais
handoff humano
CRM leve
```

Uso NÃO permitido:

```txt
Não criar árvore gigante de bot no WhatsApp.
Não deixar ManyChat decidir curso.
Não deixar ManyChat tratar objeções principais.
Não duplicar personalidade da Bella.
Não transformar ManyChat no cérebro da operação.
```

### Arquitetura com ManyChat

```txt
Instagram / WhatsApp
        ↓
ManyChat como canal visual, inbox e roteamento
        ↓
Webhook / API
        ↓
Bella na Azure
        ↓
Postgres / Redis
        ↓
Resposta / Handoff humano
```

### Quando usar ManyChat

Usar ManyChat quando a prioridade for:

```txt
operação visual rápida
equipe humana acompanhando conversas
Instagram + WhatsApp no mesmo painel
campanhas por DM
comentários virando conversa
```

### Quando NÃO usar ManyChat

Evitar ManyChat como core quando a prioridade for:

```txt
soberania total da conversa
lógica avançada da Bella
controle técnico completo
produto replicável proprietário
```

### Decisão atual

```txt
Z-API será o caminho inicial para WhatsApp da Bella.
ManyChat fica como opção visual forte para Instagram, campanhas e possível camada de handoff humano.
Se for necessário tudo em uma plataforma visual, ManyChat entra como alternativa operacional.
```

Frase-mãe:

```txt
ManyChat é a portaria.
Bella é a vendedora.
Postgres é a memória.
```

---

## 15. Bella — Personalidade e Papel

### Identidade

```txt
Nome: Bella
Função: Consultora virtual e SDR do Instituto Embelleze Trindade
Canal principal: WhatsApp
Tom: humano, direto, acolhedor, local e confiante
```

### Mensagem inicial recomendada

```txt
Olá! Eu sou a Bella, consultora virtual do Instituto Embelleze Trindade.

Estou aqui para te ajudar a encontrar o curso ideal para começar ou crescer na área da beleza.

Me conta: você já é aluna(o) da Embelleze ou está buscando uma nova oportunidade profissional?
```

### Regras

```txt
Nunca inventar preço.
Nunca inventar prazo de inscrição.
Nunca prometer renda garantida.
Nunca afirmar vaga limitada sem confirmação.
Sempre perguntar objetivo antes de falar de preço.
Se a pessoa pedir humano, encaminhar.
```

---

## 16. Prompt Visual da Bella — Kit Base

Gerar arquivos:

```txt
bella-front.png
bella-side-1.png
bella-side-2.png
bella-back.png
bella-face.png
```

Regra:

```txt
Mesma roupa, mesmo cabelo, mesma iluminação, fundo neutro.
```

### Global prompt

```txt
same woman, same identity, consistent face, consistent body proportions, natural brazilian woman, average height, proportional body, not model, not exaggerated, realistic human anatomy, neutral studio background, soft lighting, no shadows on background, minimal environment, focus on subject only, fitted neutral white t-shirt, simple blue jeans, dark brown hair semi tied, natural makeup, warm expression
```

### Negative prompt

```txt
different person, different face, inconsistent identity, model face, perfect skin, plastic skin, unrealistic proportions, long legs exaggerated, tiny waist, glamour, fashion shoot, heavy makeup, stylized, cartoon, anime, distortion, extra limbs, asymmetry, face mutation
```

---

## 17. SEO Home

### Title

```txt
Cursos de Beleza em Trindade | Instituto Embelleze Trindade
```

### Description

```txt
Cursos profissionalizantes na área da beleza em Trindade. Aprenda na prática e fale com a Bella para encontrar o melhor curso para seu momento.
```

### Keywords estratégicas

```txt
curso de cabeleireiro,
curso de barbeiro,
curso de manicure e pedicure,
curso de maquiagem profissional,
curso de design de sobrancelhas,
curso de design de cilios,
curso de alongamento de unhas,
curso de beleza perto de mim,
escola de beleza,
cursos profissionalizantes,
curso de beleza em trindade,
instituto embelleze trindade,
curso de beleza em goianira,
curso de beleza em santa barbara de goias,
curso de beleza em guapo
```

---

## 18. SEO por Curso

Usar rota dinâmica:

```txt
src/pages/cursos/[slug].astro
```

Fonte única:

```txt
src/content/courses.json
```

Slugs:

```txt
/cursos/cabeleireiro-profissional
/cursos/barbeiro-profissional
/cursos/manicure-e-pedicure
/cursos/alongamento-de-unhas
/cursos/design-de-cilios
/cursos/design-de-sobrancelhas
/cursos/depilacao
/cursos/penteados
/cursos/maquiagem-profissional
```

Regra:

```txt
Não criar 9 páginas duplicadas.
Usar getStaticPaths.
Cada página deve ter title, description, H1 e CTA próprios.
```

---

## 19. `bella.knowledge.md`

Deve conter:

```txt
Identidade da Bella
Dados da unidade
Cursos confirmados
Cursos pendentes
Objeções comuns
Tom de voz
Regras de atendimento
Regras de handoff
WhatsApp oficial
Informações proibidas de inventar
```

---

## 20. Checklist de Acessos e Dados Pendentes

### Cliente precisa confirmar

```txt
Número novo da Bella conectado
Valores por curso
Taxa de inscrição/matrícula
Prazo de inscrição
Datas de início das próximas turmas
Grade curricular oficial de cada curso
Condições de pagamento
Regras de reserva PIX
Fotos reais da unidade
Depoimentos ou prints aprovados
Nome da vendedora responsável
```

---

## 21. Ordem de Execução Recomendada

### Etapa 1 — Base técnica

```txt
1. Confirmar projeto Astro rodando.
2. Confirmar estrutura de seções.
3. Confirmar tokens visuais.
4. Confirmar courses.json.
5. Confirmar BaseLayout com SEO mínimo.
```

### Etapa 2 — Conversão da landing

```txt
1. Implementar Hero.
2. Implementar BellaIntro.
3. Implementar CourseOffer.
4. Implementar CoursesGrid.
5. Implementar WhatsAppFloat.
6. Implementar DiscountTicket.
```

### Etapa 3 — Banco

```txt
1. Criar tabela leads.
2. Configurar DATABASE_URL.
3. Criar lib/db.ts.
4. Criar upsertLead.
5. Integrar com simulador e cliques WhatsApp.
```

### Etapa 4 — WhatsApp / Z-API

```txt
1. Conectar número novo.
2. Testar envio/recebimento.
3. Configurar webhook.
4. Conectar webhook na Bella Azure.
5. Registrar conversas no Postgres.
```

### Etapa 5 — SEO e páginas de curso

```txt
1. Criar rota dinâmica /cursos/[slug].astro.
2. Gerar páginas por curso via courses.json.
3. Validar titles e descriptions.
4. Garantir CTA com contexto para Bella.
```

### Etapa 6 — Tracking mínimo

```txt
1. PAGE_VIEW
2. CLICK_WHATSAPP
3. CLICK_COURSE
4. GENERATE_DISCOUNT_TICKET
5. COMPLETE_FUTURE_SIMULATOR
```

---

## 22. Critério de Pronto — MVP

```txt
Landing abre rápido no mobile.
CTA do WhatsApp funciona.
Cada curso envia contexto correto.
Bella aparece como elemento central.
Ticket/desconto gera ação.
Leads são salvos no Postgres quando possível.
Banco falhando não quebra conversão.
Z-API conectada ao número novo.
Bella responde no WhatsApp.
Vendedora consegue assumir conversa quando necessário.
Nenhum preço ou data foi inventado.
```

---

## 23. Riscos Atuais

### Risco 1 — Cliente não entrega dados comerciais

Controle:

```txt
Landing opera sem preço e empurra para Bella.
```

### Risco 2 — WhatsApp provider instável

Controle:

```txt
Manter arquitetura desacoplada.
Z-API e ManyChat são canais/camadas operacionais, não cérebro.
Bella fica na Azure.
```

### Risco 3 — Excesso de automação parecer robô

Controle:

```txt
Bella com tom humano.
Handoff humano rápido.
Evitar fluxos engessados.
```

### Risco 4 — Banco falhar e matar conversão

Controle:

```txt
Operação da landing não pode depender 100% do Postgres.
WhatsApp deve continuar funcionando.
```

---

## 24. Próximas Decisões

```txt
1. Confirmar número novo da Bella.
2. Definir endpoint do webhook da Z-API.
3. Confirmar se Bella Azure já tem endpoint HTTP pronto.
4. Confirmar se Postgres Railway já foi criado.
5. Confirmar domínio embelleze-bella.online.
6. Confirmar quais seções da landing já foram implementadas.
7. Confirmar se courses.json já está no projeto.
8. Decidir se ManyChat entra agora para Instagram/campanhas/handoff ou fica para fase seguinte.
```
