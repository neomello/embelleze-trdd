# Estrutura do Projeto — Embelleze Trindade Landing

Base local:

```txt
Embelleze/Users/nettomello/CODIGOS/projects/embelleze-trdd/
└── embelleze-landing/
```

---

# 1. Estrutura Recomendada

```txt
embelleze-trdd/
├── AGENTS.md
├── CONTEXT.md
├── MEMORY.md
├── SKILL.md
├── .cursorrules
├── .codex
├── README.md
├── workspace.json
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
    ├── tsconfig.json
    ├── .env.example
    │
    ├── public/
    │   ├── bella/
    │   │   ├── bella-front.png
    │   │   ├── bella-side-1.png
    │   │   ├── bella-side-2.png
    │   │   └── bella-back.png
    │   ├── brand/
    │   │   ├── logo-embelleze.svg
    │   │   └── favicon.svg
    │   └── social/
    │       ├── depoimento-01.jpg
    │       ├── aula-pratica-01.jpg
    │       └── fachada.jpg
    │
    ├── src/
    │   ├── pages/
    │   │   ├── index.astro
    │   │   ├── mapa.astro
    │   │   ├── oferta.astro
    │   │   └── obrigado.astro
    │   │
    │   ├── layouts/
    │   │   └── BaseLayout.astro
    │   │
    │   ├── sections/
    │   │   ├── Hero.astro
    │   │   ├── BellaIntro.astro
    │   │   ├── LocalImpact.astro
    │   │   ├── CourseOffer.astro
    │   │   ├── DiscountTicket.astro
    │   │   ├── CoursesGrid.astro
    │   │   ├── ObjectionBreak.astro
    │   │   ├── SocialProof.astro
    │   │   ├── FutureSimulator.astro
    │   │   ├── MapPreview.astro
    │   │   ├── FinalCTA.astro
    │   │   └── WhatsAppFloat.astro
    │   │
    │   ├── components/
    │   │   ├── ButtonCTA.astro
    │   │   ├── SectionTitle.astro
    │   │   ├── CourseCard.astro
    │   │   ├── TicketCard.astro
    │   │   ├── BellaBubble.astro
    │   │   ├── CountdownTimer.astro
    │   │   └── TrackingPixel.astro
    │   │
    │   ├── content/
    │   │   ├── courses.json
    │   │   ├── offers.json
    │   │   ├── faqs.json
    │   │   ├── testimonials.json
    │   │   └── bella.knowledge.md
    │   │
    │   ├── lib/
    │   │   ├── whatsapp.ts
    │   │   ├── tracking.ts
    │   │   ├── discount-code.ts
    │   │   ├── geo.ts
    │   │   └── constants.ts
    │   │
    │   ├── styles/
    │   │   ├── global.css
    │   │   ├── tokens.css
    │   │   └── animations.css
    │   │
    │   └── scripts/
    │       ├── events.client.ts
    │       ├── bella-bubble.client.ts
    │       └── distance.client.ts
    │
    └── docs/
        ├── LANDING_STRATEGY.md
        ├── BELLA_PROMPT.md
        ├── TRACKING_EVENTS.md
        ├── OFFER_LOGIC.md
        ├── VISUAL_IDENTITY.md
        └── DEPLOYMENT.md
```

---

# 2. Regra Central da Home

`src/pages/index.astro` deve ser apenas o orquestrador das seções.

Não colocar lógica pesada direto na página.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../sections/Hero.astro';
import BellaIntro from '../sections/BellaIntro.astro';
import LocalImpact from '../sections/LocalImpact.astro';
import CourseOffer from '../sections/CourseOffer.astro';
import DiscountTicket from '../sections/DiscountTicket.astro';
import CoursesGrid from '../sections/CoursesGrid.astro';
import ObjectionBreak from '../sections/ObjectionBreak.astro';
import SocialProof from '../sections/SocialProof.astro';
import FutureSimulator from '../sections/FutureSimulator.astro';
import MapPreview from '../sections/MapPreview.astro';
import FinalCTA from '../sections/FinalCTA.astro';
import WhatsAppFloat from '../sections/WhatsAppFloat.astro';
---

<BaseLayout title="Instituto Embelleze Trindade">
  <Hero />
  <BellaIntro />
  <LocalImpact />
  <CourseOffer />
  <DiscountTicket />
  <CoursesGrid />
  <ObjectionBreak />
  <SocialProof />
  <FutureSimulator />
  <MapPreview />
  <FinalCTA />
  <WhatsAppFloat />
</BaseLayout>
```

---

# 3. Responsabilidade de Cada Seção

## `Hero.astro`

Função:

```txt
Capturar atenção em 3 segundos.
Promessa clara.
CTA principal para WhatsApp/Bella.
```

Conteúdo:

```txt
Headline
Subheadline
CTA principal
CTA secundário
Indicador de vagas/turma ativa
```

---

## `BellaIntro.astro`

Função:

```txt
Humanizar a conversão.
Apresentar Bella como consultora virtual.
Reduzir fricção antes do WhatsApp.
```

Conteúdo:

```txt
Imagem oficial da Bella
Texto curto
Botão “Falar com a Bella”
```

---

## `LocalImpact.astro`

Função:

```txt
Conectar o visitante com Trindade.
Mostrar que o instituto é local, acessível e real.
```

Conteúdo:

```txt
Endereço
Referência local
Microcopy sobre aprendizado presencial
```

---

## `CourseOffer.astro`

Função:

```txt
Mostrar a oferta da vez.
Não listar tudo primeiro.
Guiar decisão.
```

Conteúdo:

```txt
Curso em destaque
Duração
Próxima turma
Benefício principal
CTA de reserva
```

---

## `DiscountTicket.astro`

Função:

```txt
Gerar ação imediata.
Criar ticket/código de reserva.
Ativar urgência sem parecer golpe.
```

Conteúdo:

```txt
Código de desconto
Timer
Botão para usar no WhatsApp
```

---

## `CoursesGrid.astro`

Função:

```txt
Permitir escolha por interesse.
Cada curso envia contexto diferente para Bella.
```

Cursos base:

```txt
Cabeleireiro
Barbeiro
Maquiagem
Sobrancelhas
Manicure e Pedicure
Design de Cílios
Depilação
Curso VIP
```

---

## `ObjectionBreak.astro`

Função:

```txt
Eliminar objeções antes do atendimento.
Preço não deve ser o centro.
Decisão deve ser valor, profissão e oportunidade.
```

Objeções:

```txt
Não tenho experiência
Tenho medo de não conseguir
Não sei qual curso escolher
Será que vale a pena?
```

---

## `SocialProof.astro`

Função:

```txt
Provar que existe movimento real.
Usar unidade, alunos, sala prática, formatura e antes/depois.
```

Conteúdo:

```txt
Depoimentos
Fotos reais
Print de avaliação Google quando validado
```

---

## `FutureSimulator.astro`

Função:

```txt
Criar interação e capturar intenção.
Simular caminho profissional.
```

Perguntas:

```txt
Você quer renda extra ou nova profissão?
Você já tem experiência?
Qual área da beleza te chama mais atenção?
```

Resultado:

```txt
Curso sugerido
CTA para Bella
Evento de tracking
```

---

## `MapPreview.astro`

Função:

```txt
Levar para página /mapa.
Mostrar distância e reforçar presença local.
```

CTA:

```txt
Ver distância até o Instituto
```

---

## `FinalCTA.astro`

Função:

```txt
Fechamento agressivo.
Última chamada para ação.
```

Copy base:

```txt
Daqui a alguns meses, tudo pode continuar igual.
Ou você pode estar começando uma nova profissão.
```

---

## `WhatsAppFloat.astro`

Função:

```txt
Manter botão de conversão sempre disponível.
Abrir WhatsApp com contexto.
```

---

# 4. Páginas Auxiliares

## `/mapa`

Arquivo:

```txt
src/pages/mapa.astro
```

Função:

```txt
Mostrar localização do Instituto.
Calcular ou estimar distância do visitante.
Reforçar presença física e confiança.
```

Conteúdo:

```txt
Mapa incorporado
Endereço
Botão “Traçar rota”
Botão “Falar com a Bella”
```

---

## `/oferta`

Arquivo:

```txt
src/pages/oferta.astro
```

Função:

```txt
Página focada em campanha específica.
Pode ser usada para Google Ads ou Meta Ads.
```

Exemplo:

```txt
/oferta?curso=barbeiro
/oferta?curso=sobrancelhas
```

---

## `/obrigado`

Arquivo:

```txt
src/pages/obrigado.astro
```

Função:

```txt
Confirmar ação.
Orientar próximo passo.
Disparar evento de conversão.
```

---

# 5. Arquivos de Dados

## `src/content/courses.json`

```json
[
  {
    "id": "cabeleireiro",
    "name": "Cabeleireiro",
    "benefit": "Aprenda técnicas profissionais para começar a atender clientes.",
    "ctaText": "Quero saber sobre Cabeleireiro"
  },
  {
    "id": "barbeiro",
    "name": "Barbeiro",
    "benefit": "Comece na barbearia com prática e técnica desde o início.",
    "ctaText": "Quero saber sobre Barbeiro"
  }
]
```

---

## `src/content/offers.json`

```json
{
  "activeOffer": {
    "courseId": "barbeiro",
    "title": "Turma de Barbeiro com vagas abertas",
    "ticketPrefix": "BELLA",
    "urgency": "Vagas limitadas para a próxima turma"
  }
}
```

---

## `src/content/bella.knowledge.md`

Deve conter:

```txt
Identidade da Bella
Dados do Instituto
Cursos
Objeções
Tom de voz
Regras de atendimento
Regras de handoff
WhatsApp oficial
Endereço
```

---

# 6. Tokens Visuais

Arquivo:

```txt
src/styles/tokens.css
```

```css
:root {
  --color-orange: #de583d;
  --color-purple: #5f3080;
  --color-white: #ffffff;
  --color-black: #171018;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;

  --shadow-soft: 0 16px 40px rgba(95, 48, 128, 0.16);
}
```

---

# 7. WhatsApp

Arquivo:

```txt
src/lib/whatsapp.ts
```

Responsabilidade:

```txt
Centralizar links do WhatsApp.
Evitar URL espalhada nos componentes.
Adicionar contexto por curso, ticket e origem.
```

Número oficial:

```txt
5562984836550
```

Formato de mensagem:

```txt
Oi Bella, vim pela página e quero saber sobre [curso]. Meu código é [ticket].
```

---

# 8. Tracking

Arquivo:

```txt
src/lib/tracking.ts
```

Eventos mínimos:

```txt
PAGE_VIEW
CLICK_WHATSAPP
CLICK_COURSE
GENERATE_DISCOUNT_TICKET
OPEN_MAP
START_FUTURE_SIMULATOR
COMPLETE_FUTURE_SIMULATOR
```

---

# 9. Arquivos de Agente

A estrutura deve considerar que agentes leem primeiro arquivos de instrução no root e no projeto.

## Prioridade de leitura

```txt
1. embelleze-trdd/AGENTS.md
2. embelleze-trdd/CONTEXT.md
3. embelleze-trdd/SKILL.md
4. embelleze-trdd/MEMORY.md
5. embelleze-trdd/.cursorrules
6. embelleze-trdd/.codex
7. embelleze-landing/AGENTS.md
8. embelleze-landing/CONTEXT.md
9. embelleze-landing/SKILL.md
10. embelleze-landing/MEMORY.md
11. embelleze-landing/.cursorrules
12. embelleze-landing/.codex
```

---

# 10. `AGENTS.md` — Root

Função:

```txt
Orientar qualquer agente sobre o ecossistema Embelleze Trindade.
Explicar que o root não é monorepo genérico.
Definir limites e ordem de leitura.
```

Conteúdo mínimo:

```md
# AGENTS.md — Embelleze Trindade Workspace

Este workspace contém a operação digital do Instituto Embelleze Trindade.

Antes de qualquer alteração:

1. Leia CONTEXT.md
2. Leia SKILL.md
3. Leia MEMORY.md
4. Detecte o projeto correto
5. Trabalhe apenas no menor escopo funcional

## Projetos

- embelleze-landing: landing page Astro para captação e conversão

## Regras

- Não alterar arquivos fora do escopo solicitado
- Não modificar secrets
- Não criar arquitetura desnecessária
- Não misturar backend, CRM e landing sem necessidade
- Toda seção da home deve ser componente separado em src/sections
- src/pages/index.astro deve apenas orquestrar seções
```

---

# 11. `CONTEXT.md` — Root

Função:

```txt
Dar contexto estratégico para agentes.
```

Conteúdo mínimo:

```md
# CONTEXT.md — Instituto Embelleze Trindade

## Cliente

Instituto Embelleze Trindade  
Instituto da Beleza Goiana de Ensino e Serviços LTDA - ME  
CNPJ: 19.367.067/0001-97

## Localização

Av. Manoel Monteiro, 1691 — Trindade/GO

## Objetivo

Construir uma operação digital de captação, qualificação e conversão de alunos para cursos profissionalizantes na área da beleza.

## Canais

- Landing page
- WhatsApp oficial: 62 98483-6550
- Bella — agente SDR/Atendimento
- Meta Ads
- Google Ads

## Posicionamento

Não vender apenas curso. Vender transformação prática, renda e nova oportunidade profissional.
```

---

# 12. `SKILL.md` — Root

Função:

```txt
Definir como operar dentro do workspace.
```

Conteúdo mínimo:

```md
# SKILL.md — Operação Embelleze Trindade

Use este arquivo quando precisar decidir como agir neste workspace.

## Rotina

1. Leia AGENTS.md
2. Leia CONTEXT.md
3. Leia MEMORY.md
4. Identifique se a tarefa é landing, Bella, CRM, tracking ou ads
5. Aplique a menor mudança funcional
6. Preserve a estrutura modular
7. Informe risco residual

## Regras

- Landing fica em embelleze-landing
- Home usa src/pages/index.astro apenas como orquestrador
- Seções ficam em src/sections
- Componentes reutilizáveis ficam em src/components
- Dados editáveis ficam em src/content
- Não hardcodar WhatsApp em vários arquivos
- Usar src/lib/whatsapp.ts para links de conversa
```

---

# 13. `MEMORY.md` — Root

Função:

```txt
Registrar decisões tomadas para evitar regressão.
```

Conteúdo mínimo:

```md
# MEMORY.md — Embelleze Trindade

## Decisões fixas

- Bella é a agente SDR/Atendimento.
- Cores oficiais: laranja #de583d, roxo #5f3080, branco #ffffff.
- WhatsApp oficial: 62 98483-6550.
- Landing usa Astro.
- Deploy previsto em Railway.
- Domínio previsto: bellaembelleze.chat.
- CRM será baseado em PostgreSQL no Railway.
- Redis no Railway será usado futuramente para memória latente.
- A home deve ser composta por seções separadas.

## Princípio

A landing não é institucional. Ela é uma máquina de conversão para WhatsApp e matrícula.
```

---

# 14. `.cursorrules` — Root

```txt
You are operating inside the Embelleze Trindade workspace.

Read these files before making changes:
- AGENTS.md
- CONTEXT.md
- SKILL.md
- MEMORY.md

Rules:
- Do not treat the root as a generic monorepo.
- Do not modify secrets.
- Do not create unnecessary abstractions.
- Make the smallest functional change.
- Preserve modular architecture.
- Landing page work must happen inside embelleze-landing.
- Astro home page must import independent sections from src/sections.
- Keep WhatsApp logic centralized.
- Keep business copy clear, direct, local and conversion-focused.
```

---

# 15. `.codex` — Root

```txt
Project: Embelleze Trindade Digital Conversion System

Mission:
Build a high-conversion landing page and digital acquisition system for Instituto Embelleze Trindade.

Primary app:
embelleze-landing

Before editing:
1. Read AGENTS.md
2. Read CONTEXT.md
3. Read SKILL.md
4. Read MEMORY.md

Architecture rules:
- Astro project
- Railway deploy
- Section-based landing
- index.astro only composes sections
- src/sections for page blocks
- src/components for reusable UI
- src/content for editable business data
- src/lib for WhatsApp, tracking, discount and geo helpers

Business rules:
- Bella is central to conversion
- WhatsApp is the main CTA
- Copy must be direct and aggressive, but not misleading
- Never invent course prices or dates
- Any claim about reviews or number of students must be backed by approved client data
```

---

# 16. Arquivos de Agente Dentro da Landing

Dentro de:

```txt
embelleze-landing/
```

Os arquivos devem ser mais técnicos e específicos do Astro.

## `embelleze-landing/AGENTS.md`

```md
# AGENTS.md — Embelleze Landing

Este projeto é a landing page oficial de captação do Instituto Embelleze Trindade.

## Stack

- Astro
- CSS modular/global simples
- Deploy Railway

## Estrutura obrigatória

- src/pages/index.astro apenas importa seções
- src/sections contém blocos da landing
- src/components contém UI reutilizável
- src/content contém dados editáveis
- src/lib centraliza regras de WhatsApp, tracking, geo e desconto

## Não fazer

- Não colocar todas as seções dentro de index.astro
- Não duplicar links de WhatsApp
- Não inventar dados comerciais
- Não inserir preços sem validação
- Não criar dependências pesadas sem necessidade
```

---

## `embelleze-landing/CONTEXT.md`

```md
# CONTEXT.md — Landing Embelleze Trindade

## Objetivo

Converter visitantes em conversas qualificadas no WhatsApp com a Bella.

## Público

Pessoas de Trindade/GO e região que buscam:

- nova profissão
- renda extra
- formação prática
- entrada no mercado da beleza

## Tom

Direto, humano, local, confiante e orientado à ação.

## Cores

- Laranja: #de583d
- Roxo: #5f3080
- Branco: #ffffff
```

---

## `embelleze-landing/SKILL.md`

```md
# SKILL.md — Landing Astro

## Como operar

1. Identifique a seção afetada
2. Edite apenas o arquivo necessário
3. Se o conteúdo for dado de negócio, prefira src/content
4. Se for CTA de WhatsApp, use src/lib/whatsapp.ts
5. Se for tracking, use src/lib/tracking.ts
6. Preserve index.astro limpo

## Regra de seção

Cada seção deve:

- Ter uma função clara de conversão
- Ter CTA quando fizer sentido
- Ser legível no mobile
- Não depender de outra seção para funcionar
```

---

## `embelleze-landing/MEMORY.md`

```md
# MEMORY.md — Landing Embelleze

## Decisões

- A landing deve parecer local e real, não institucional genérica.
- Bella deve aparecer como consultora virtual e ponte para WhatsApp.
- Oferta deve ser dinâmica por curso ativo.
- Ticket/código de desconto deve ser tratado como mecânica de conversão.
- Mapa pode ser página separada em /mapa.
- Prova social deve usar apenas materiais aprovados pelo cliente.
```

---

## `embelleze-landing/.cursorrules`

```txt
This is an Astro landing page project.

Always:
- Keep src/pages/index.astro as a composition file only.
- Put landing sections in src/sections.
- Put reusable UI in src/components.
- Put editable business data in src/content.
- Use src/lib/whatsapp.ts for WhatsApp links.
- Use src/lib/tracking.ts for tracking events.
- Keep mobile-first conversion design.

Never:
- Hardcode unverified prices.
- Invent dates, reviews or student numbers.
- Add large dependencies without explicit need.
- Move business logic into visual components unnecessarily.
```

---

## `embelleze-landing/.codex`

```txt
App: Embelleze Landing
Framework: Astro
Deploy: Railway
Domain: bellaembelleze.chat

Primary objective:
Convert visitors into qualified WhatsApp conversations with Bella.

Core sections:
- Hero
- BellaIntro
- LocalImpact
- CourseOffer
- DiscountTicket
- CoursesGrid
- ObjectionBreak
- SocialProof
- FutureSimulator
- MapPreview
- FinalCTA
- WhatsAppFloat

Implementation constraints:
- index.astro imports sections only.
- sections should remain focused and isolated.
- business data belongs in src/content.
- WhatsApp URL creation belongs in src/lib/whatsapp.ts.
- tracking event names belong in src/lib/tracking.ts.
```

---

# 17. README Inicial

```md
# Embelleze Landing

Landing page de captação e conversão para o Instituto Embelleze Trindade.

## Objetivo

Transformar visitantes em conversas qualificadas no WhatsApp com a Bella.

## Stack

- Astro
- Railway
- WhatsApp
- Futuro: PostgreSQL, Redis, tracking avançado

## Comandos

npm install
npm run dev
npm run build
```

---

# 18. Ordem de Implementação

```txt
1. Criar projeto Astro em embelleze-landing
2. Criar arquivos AGENTS/CONTEXT/SKILL/MEMORY/.cursorrules/.codex
3. Criar tokens visuais
4. Criar BaseLayout
5. Criar sections vazias
6. Montar index.astro importando seções
7. Criar lib/whatsapp.ts
8. Criar content/courses.json e offers.json
9. Implementar Hero
10. Implementar BellaIntro
11. Implementar CourseOffer
12. Implementar DiscountTicket
13. Implementar CoursesGrid
14. Implementar WhatsAppFloat
15. Implementar restante das seções
16. Criar /mapa
17. Criar /obrigado
18. Validar mobile
19. Subir no Railway
20. Conectar domínio
```

---

# 19. Critério de Pronto

A landing só está pronta quando:

```txt
Home abre rápido no mobile
CTA do WhatsApp funciona
Cada curso envia contexto correto
Bella aparece como elemento central
Ticket/desconto gera ação
Mapa/rota está acessível
Tracking mínimo está preparado
Nenhum dado não validado foi inventado
```

