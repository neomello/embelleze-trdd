# Roadmap de Execução e Integrações — Instituto Embelleze Trindade

## 1. Objetivo do Projeto

Construir um sistema comercial completo para o Instituto Embelleze Trindade, integrando:

- Landing page de conversão
- Agente SDR/Atendimento via WhatsApp: **Bella**
- CRM para gestão de leads
- Tráfego pago Google Ads + Meta Ads
- Tracking de conversão
- Relatórios de performance
- Fluxos de recuperação e follow-up

O objetivo não é apenas gerar leads, mas transformar o WhatsApp em uma operação previsível de matrícula.

---

## 2. Visão Geral da Arquitetura

```txt
Landing Page
        ↓
Bella — Agente SDR
        ↓
CRM / Planilha Comercial / PostgreSQL
        ↓
Anúncios Google / Meta
        ↓
WhatsApp com contexto
        ↓
Vendedora Humana
        ↓
Matrícula / Reserva PIX
        ↓
Relatório e otimização
```

---

## 3. Stack Recomendada

## 3.1 Landing Page

### Opção principal

- **Framework:** Astro
- **Hospedagem:** Railway
- **Domínio:** `bellaembelleze.chat`

### Por que Vercel

- Deploy rápido
- Boa performance
- HTTPS automático
- Fácil versionamento
- Integração simples com tags e pixels

---

## 3.2 Domínio

### Caminho ideal

Usar domínio/subdomínio oficial da unidade.

Exemplos:

- `cursos.institutoembellezetrindade.com.br`
- `matricula.institutoembellezetrindade.com.br`
- `trindadeembelleze.com.br`

### Caminho provisório

Usar domínio FlowOFF para acelerar validação:

- `embelleze-trindade.flowoff.xyz`

### Critério

Começar rápido com FlowOFF e migrar para domínio oficial quando o cliente liberar DNS.

---

## 3.3 WhatsApp / Bella

### Função da Bella

Bella será o agente SDR/Atendimento do Instituto Embelleze Trindade.

Ela deve:

- Receber leads
- Identificar intenção
- Perguntar objetivo
- Recomendar curso
- Tratar objeções
- Encaminhar lead quente para vendedora
- Registrar informações no CRM
- Acionar follow-up automático

### Mensagem atual da Bella

```txt
Olá! 👋 Sou a Bella, e estou aqui para te ajudar a dar o primeiro passo na sua nova carreira no mundo da beleza!

Seja muito bem-vinda(o) ao Instituto Embelleze Trindade. 💅💇‍♂️

Me conta, você já estuda com a gente ou está buscando uma nova oportunidade para sua vida?
```

### Ajuste recomendado

```txt
Olá! 👋 Eu sou a Bella, consultora virtual do Instituto Embelleze Trindade.

Estou aqui para te ajudar a encontrar o curso ideal para começar ou crescer na área da beleza.

Me conta: você já é aluna(o) da Embelleze ou está buscando uma nova oportunidade profissional?
```

---

## 3.4 CRM

### Opção rápida

- Google Sheets estruturado
- Airtable
- Notion Database

### Opção recomendada para operação comercial

- RD Station CRM
- Kommo CRM
- HubSpot CRM
- Pipedrive

### Escolha inicial recomendada

Dashboard usando dados do **PostgreSQL no Railway**, com possibilidade de visualização simples em painel administrativo ou planilha espelhada.

Motivos:

- Mantém a base de leads sob controle técnico
- Permite histórico real de interações
- Facilita tracking por UTM, curso e status
- Permite dashboard operacional
- Não prende a operação em ferramenta externa desde o início

### Campos mínimos do CRM

```txt
Nome
Telefone
Origem
Curso de interesse
Objetivo do aluno
Status do lead
Objeção principal
Data do primeiro contato
Última interação
Responsável humano
Status da matrícula
Observações
```

### Status comerciais

```txt
NOVO
QUALIFICADO
PEDIU_PRECO
EM_ATENDIMENTO
QUENTE
AGENDADO
RESERVA_PIX
MATRICULADO
PERDIDO
REATIVAR
```

---

## 3.5 APIs e Integrações

### WhatsApp

Opção inicial em avaliação:

- **ManyChat WhatsApp**, avaliando forma de entrada mais estratégica e proprietária

Plano paralelo:

- Estudar alternativa Web3/soberana para futura camada própria de atendimento, identidade e registro de interações

### IA

- Desenvolvimento via Azure
- OpenAI API para raciocínio e atendimento
- Base de conhecimento estruturada em JSON/Markdown
- Redis no Railway para memória latente e contexto operacional
- PostgreSQL no Railway para leads, eventos e histórico comercial

### Email / Notificações

- Resend
- Gmail
- WhatsApp interno para alertar vendedora

### Pagamento / Reserva PIX

Inicialmente manual:

```txt
PIX CNPJ: 19.367.067/0001-97
Instituto da Beleza Goiana de Ensino e Serviços LTDA
```

Fase posterior:

- OpenPix
- Mercado Pago
- Woovi
- Asaas

---

## 3.6 Tracking

### Ferramentas

- Google Tag Manager
- Google Analytics 4
- Meta Pixel
- Google Ads Conversion Tag

### Eventos mínimos

```txt
page_view
click_whatsapp
select_course
start_conversation
lead_qualified
pix_reservation_intent
matricula_confirmed
```

### UTM padrão

```txt
utm_source=meta
utm_medium=paid_social
utm_campaign=embelleze_trindade_maio_2026
utm_content=criativo_01
utm_term=curso_sobrancelhas
```

---

## 4. Roadmap de Execução

## Fase 0 — Setup e Diagnóstico

### Prazo

Dia 0 a Dia 1

### Ações

- Confirmar escopo contratado
- Coletar acessos
- Confirmar lista de cursos
- Confirmar preços e condições
- Confirmar datas das próximas turmas
- Confirmar responsável comercial
- Mapear chatbot atual da Bella
- Registrar baseline atual

### Baseline atual

```txt
Conversão estimada: 15%
Capacidade: 100 alunos
Ocupação média: 50 alunos
Meta mensal: R$ 30.000
```

### Entregáveis

- Checklist de acessos
- Documento de baseline
- Mapa do funil atual

---

## Fase 1 — Base Comercial e Conteúdo da Bella

### Prazo

Dia 1 a Dia 3

### Ações

- Criar playbook comercial da Bella
- Criar árvore de decisão
- Criar respostas por objeção
- Criar classificação de leads
- Criar handoff para vendedora
- Criar mensagens de recuperação

### Objeções principais

```txt
Preço
Tempo
Medo de não conseguir
Comparação com concorrentes
Precisa falar com família
Quer atendimento humano
```

### Entregáveis

- Script da Bella
- Prompt operacional da Bella
- Fluxo de qualificação
- Fluxo de handoff
- Fluxo de follow-up

---

## Fase 2 — Landing Page

### Prazo

Dia 2 a Dia 5

### Ações

- Definir copy da página
- Criar layout
- Inserir cursos
- Inserir CTAs por curso
- Conectar WhatsApp com contexto
- Instalar tracking
- Publicar em domínio provisório

### Estrutura da landing

```txt
Hero
Promessa principal
Cursos disponíveis
Diferenciais
Prova social
Como funciona
CTA WhatsApp
FAQ
```

### Entregáveis

- Landing publicada
- Botões por curso
- Tracking básico
- Versão mobile validada

---

## Fase 3 — CRM e Registro Comercial

### Prazo

Dia 3 a Dia 6

### Ações

- Criar base de leads
- Definir campos
- Integrar origem do lead
- Registrar curso de interesse
- Registrar status comercial
- Criar visão de funil

### Entregáveis

- CRM mínimo operacional
- Pipeline de matrícula
- Campos padronizados
- Relatório inicial

---

## Fase 4 — Integração WhatsApp + IA

### Prazo

Dia 4 a Dia 8

### Ações

- Configurar canal WhatsApp
- Conectar Bella ao fluxo
- Testar mensagens iniciais
- Testar classificação
- Testar pedido de humano
- Testar encaminhamento para vendedora
- Testar registro no CRM

### Regra crítica

Sempre detectar:

```txt
“quero falar com humano”
“isso é robô?”
“atendimento automatizado”
“tem alguém aí?”
```

Resposta padrão:

```txt
Sim, eu sou a Bella, assistente virtual do Instituto Embelleze Trindade. 😊

Estou aqui para adiantar seu atendimento e te ajudar com as primeiras informações. Se preferir, posso chamar uma consultora agora para continuar com você.
```

### Entregáveis

- Bella operando
- Handoff testado
- Registro no CRM testado
- Logs básicos ativos

---

## Fase 5 — Tráfego Pago

### Prazo

Dia 6 a Dia 10

### Google Ads

Campanhas por intenção:

```txt
Curso de cabeleireiro Trindade
Curso de maquiagem Trindade
Curso de barbeiro Trindade
Curso de manicure Trindade
Curso de sobrancelhas Trindade
Curso de beleza profissional
```

### Meta Ads

Campanhas por desejo:

```txt
Renda extra
Nova profissão
Começar do zero
Curso rápido
Independência financeira
```

### Entregáveis

- Conta organizada
- Campanhas criadas
- Criativos iniciais
- Copy dos anúncios
- Pixel instalado
- Primeira verba rodando

---

## Fase 6 — Otimização e Relatórios

### Prazo

A partir do Dia 10

### Rotina semanal

- Analisar leads
- Cortar anúncios ruins
- Ajustar copy
- Revisar respostas da Bella
- Mapear objeções novas
- Comparar taxa de conversão
- Ajustar investimento

### Relatório semanal

```txt
Leads gerados
Custo por lead
Leads qualificados
Cursos mais buscados
Taxa de resposta
Taxa de handoff
Reservas PIX
Matrículas
Motivos de perda
Próximas ações
```

---

## 5. Integrações Prioritárias

## Prioridade 1 — Obrigatórias

```txt
Landing → WhatsApp
WhatsApp → Bella
Bella → CRM
Landing → Meta Pixel
Landing → Google Tag
Anúncios → Landing
```

## Prioridade 2 — Alta relevância

```txt
Bella → alerta para vendedora
Bella → follow-up automático
CRM → relatório semanal
WhatsApp → tags por curso
```

## Prioridade 3 — Evolução

```txt
PIX automático
Confirmação automática de pagamento
Integração com calendário de turmas
Dashboard avançado
Remarketing por status do lead
```

---

## 6. Cronograma Resumido

| Período | Foco | Resultado |
|---|---|---|
| Dia 0–1 | Diagnóstico e acessos | Base pronta |
| Dia 1–3 | Bella e playbook | Atendimento estruturado |
| Dia 2–5 | Landing | Página publicada |
| Dia 3–6 | CRM | Funil visível |
| Dia 4–8 | WhatsApp + IA | Bella operando |
| Dia 6–10 | Tráfego | Campanhas no ar |
| Dia 10+ | Otimização | Crescimento e ajuste |

---

## 7. Checklist de Acessos

## Cliente precisa liberar

```txt
WhatsApp Business
Instagram
Facebook Page
Meta Business Suite
Google Ads
Google Analytics / Tag Manager
Domínio / DNS
Lista de cursos
Valores e condições
Fotos reais da unidade
Depoimentos
Responsável comercial
```

---

## 8. Métricas de Sucesso

## Meta inicial

```txt
Conversão: sair de 15% para 25%+
Tempo de resposta: abaixo de 2 minutos
Leads perdidos: reduzir semanalmente
Ocupação: aproximar de 100 alunos
Meta financeira: contribuir para R$ 30.000/mês
```

## Métricas operacionais

```txt
CPL — custo por lead
CPQL — custo por lead qualificado
Taxa de clique WhatsApp
Taxa de conversa iniciada
Taxa de handoff
Taxa de reserva PIX
Taxa de matrícula
```

---

## 9. Riscos e Controles

## Risco 1 — Lead chega quente e ninguém atende

Controle:

```txt
Alerta imediato para vendedora
Status LEAD_QUENTE
SLA máximo de atendimento humano
```

## Risco 2 — Bella parecer robótica

Controle:

```txt
Revisão semanal de conversas
Ajuste de linguagem
Respostas mais locais e humanas
```

## Risco 3 — Tráfego gerar lead curioso demais

Controle:

```txt
Refinar criativos
Ajustar público
Usar perguntas de qualificação
Separar campanha por intenção
```

## Risco 4 — Falta de dados de matrícula

Controle:

```txt
Rotina obrigatória de atualização do CRM
Vendedora registra status final
Relatório semanal compara lead vs matrícula
```

---

## 10. Ordem de Execução Recomendada

```txt
1. Fechar acessos e dados dos cursos
2. Documentar funil atual
3. Criar script completo da Bella
4. Criar CRM mínimo
5. Publicar landing
6. Conectar WhatsApp com contexto
7. Instalar tracking
8. Subir campanhas
9. Medir primeira semana
10. Otimizar Bella + anúncios + landing
```

---

## 11. Princípio do Projeto

A Bella não deve ser tratada como robô de respostas.

Ela é a primeira camada comercial do Instituto Embelleze Trindade.

O sistema deve fazer três coisas todos os dias:

```txt
Capturar intenção
Conduzir decisão
Gerar matrícula
```

---

## 12. Identidade Visual e Configuração Técnica Base

### 🎨 Cores Oficiais da Unidade

```txt
Laranja: #de583d
Roxo: #5f3080
Branco: #ffffff
```

Uso recomendado:

- Laranja → CTA, botões, destaque
- Roxo → base institucional, títulos, fundo secundário
- Branco → contraste, leitura, áreas limpas

---

### 📱 WhatsApp Oficial

```txt
6298483-6550
```

Deve ser usado em:

- Landing page (botões principais)
- Anúncios
- Assinaturas
- Integrações com Bella

---

### 🗂️ Estrutura de Workspace

```txt
Root Workspace:
Embelleze/Users/nettomello/CODIGOS/projects/embelleze-trdd/

Landing Page:
Embelleze/Users/nettomello/CODIGOS/projects/embelleze-trdd/embelleze-landing
```

Diretrizes:

- Manter separação clara entre backend (IA/CRM) e frontend (landing)
- Versionar landing separadamente
- Preparar para deploy contínuo (Railway)

---

## 13. Dossiê de Presença Digital Atual

Objetivo: mapear a presença pública atual do Instituto Embelleze Trindade antes da implementação para comparar depois.

### Fontes a registrar

```txt
Site oficial da franquia
Instagram
Facebook
Google Maps / Perfil da Empresa
Reclame Aqui
Jusbrasil / processos públicos
Diretórios empresariais
Páginas de curso indexadas
Concorrentes locais
```

### Dados a extrair

```txt
URLs encontradas
Nome usado em cada canal
Telefone
Email
Endereço
Cursos divulgados
Promessas comerciais
Provas sociais
Reclamações públicas
Avaliações positivas
Avaliações negativas
Concorrentes citados
Lacunas de posicionamento
Oportunidades para landing
```

### Registro inicial encontrado

```txt
CNPJ: 19.367.067/0001-97
Razão Social: Instituto da Beleza Goiana de Ensino e Serviços LTDA - ME
Nome Fantasia: Instituto Embelleze Trindade
Situação: Ativa
Fundação: 28/11/2013
Endereço principal: Av. Manoel Monteiro, 1691 — Vila Padre Eterno — Trindade/GO
Telefone encontrado: (62) 3506-4497 / 62984836550
Email encontrado: go.trindade@institutoembelleze.com
Instagram encontrado: @institutoembellezetrindadego
Facebook encontrado: Instituto Embelleze Trindade
```

### Hipóteses para landing a partir da presença atual

```txt
Explorar prática real e técnica, não promessa vazia
Usar Bella como ponte humana para reduzir fricção
Destacar início imediato / vagas limitadas com cuidado
Reposicionar curso como formação profissional e oportunidade de renda
Usar prova social local: fotos de aulas, formaturas, transformações e depoimentos
Mapear reclamações nacionais para criar respostas preventivas sobre início de turma, certificado, contrato e suporte
```

---

## 14. Próximos Artefatos a Criar

- Prompt operacional completo da Bella
- Base de conhecimento dos cursos
- Copy final da landing
- Estrutura das campanhas Google Ads
- Estrutura das campanhas Meta Ads
- Template do CRM
- Relatório semanal padrão
- Dossiê de marca e público local
- Guia visual oficial da Bella

