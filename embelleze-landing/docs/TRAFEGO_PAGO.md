# Tráfego Pago — Infraestrutura Técnica

## Status Atual

A landing page está tecnicamente preparada para receber tráfego pago. O que já está implementado e o que precisa ser ativado antes de subir as campanhas está detalhado abaixo.

---

## O que já está implementado

### Google Ads (AW-18004058795)

- Tag do Google Ads carregada em todas as páginas via `src/components/TrackingPixel.astro`
- ID de conversão: **AW-18004058795** (já ativo no código)
- Ainda falta: configurar os **eventos de conversão** no painel do Google Ads apontando para os eventos disparados (ver seção de eventos abaixo)

### Google Tag Manager

- Suporte completo já implementado
- Ativar: definir variável de ambiente `PUBLIC_GTM_ID=GTM-XXXXXXX` no Railway
- Enquanto não houver GTM_ID configurado, o bloco é simplesmente ignorado

### Meta Pixel (Facebook/Instagram Ads)

- Código do pixel já integrado e pronto
- Ativar: definir variável de ambiente `PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXXX` no Railway
- Ao ativar, o `PageView` é disparado automaticamente em todas as páginas

---

## Eventos de Tracking Implementados

Todos os eventos são disparados para GA4 e Meta Pixel automaticamente via `src/lib/tracking.ts` + `src/scripts/events.client.ts`.

```text
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━┓
┃ Evento                    ┃ Quando dispara               ┃ Campos enviados   ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━┫
┃ PAGE_VIEW                 ┃ Ao carregar qualquer página  ┃ origin (pathname) ┃
┃ CLICK_WHATSAPP            ┃ Clique em link wa.me         ┃ origin (botão)    ┃
┃ CLICK_COURSE              ┃ Clique em card de curso      ┃ course (nome)     ┃
┃ GENERATE_DISCOUNT_TICKET  ┃ Geração de código            ┃ — (desativada)    ┃
┃ OPEN_MAP                  ┃ Interação com mapa           ┃ —                 ┃
┃ START_FUTURE_SIMULATOR    ┃ Início do quiz               ┃ —                 ┃
┃ COMPLETE_FUTURE_SIMULATOR ┃ Conclusão do quiz            ┃ course, origin    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━┛
```

### Eventos de conversão recomendados para configurar no Google Ads

- `CLICK_WHATSAPP` → conversão principal (lead quente)
- `COMPLETE_FUTURE_SIMULATOR` → conversão secundária (lead qualificado)

---

## Captura de Leads (CRM)

Cada interação relevante registra o lead no banco de dados PostgreSQL:

```text
┏━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┓
┃ Origem           ┃ Endpoint                             ┃ Status      ┃
┣━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━┫
┃ Simulador (quiz) ┃ POST /api/leads                      ┃ QUALIFICADO ┃
┃ Clique WhatsApp  ┃ POST /api/leads (interceptor global) ┃ INTERESSADO ┃
┗━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━┛
```

Campos capturados: `phone`, `name`, `course_interest`, `objective`, `origin`, `status`.

---

## URLs de Conversão

```text
┏━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Página             ┃ URL       ┃ Uso recomendado                        ┃
┣━━━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ Home (principal)   ┃ /         ┃ Campanha geral de awareness            ┃
┃ Cursos             ┃ /cursos   ┃ Fundo de funil (cabeleireiro Trindade) ┃
┃ Mapa / Localização ┃ /mapa     ┃ Campanha local / proximidade           ┃
┃ Obrigado           ┃ /obrigado ┃ Confirmação pós-conversão (Pixel)      ┃
┗━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## Parâmetros UTM

A landing suporta UTMs nativamente (preservados na URL). Para rastreamento correto das campanhas, usar o padrão:

```
https://embelleze-bella.online/?utm_source=google&utm_medium=cpc&utm_campaign=cabeleireiro-trindade
```

O `origin` nos eventos de WhatsApp pode ser enriquecido com o UTM lendo `URLSearchParams` — melhoria futura de baixo esforço.

---

## Checklist antes de ativar as campanhas

- [ ] Configurar `PUBLIC_META_PIXEL_ID` no Railway (painel → Variables)
- [ ] Configurar `PUBLIC_GTM_ID` no Railway (se for usar GTM)
- [ ] No Google Ads: criar conversões apontando para `CLICK_WHATSAPP` e `COMPLETE_FUTURE_SIMULATOR`
- [ ] No Meta Ads: criar evento customizado `CLICK_WHATSAPP` como conversão
- [ ] Validar disparo dos eventos com Meta Pixel Helper e GA4 DebugView
- [ ] Definir URL de destino dos anúncios (recomendado: `/` com UTMs para awareness, `/cursos` para fundo de funil)
- [ ] Configurar público de remarketing para visitantes que não converteram

---

## Variáveis de Ambiente (Railway)

```env
PUBLIC_GTM_ID=GTM-XXXXXXX          # Google Tag Manager (opcional)
PUBLIC_META_PIXEL_ID=000000000000  # Meta Pixel ID
DATABASE_URL=postgresql://...       # Já configurado
REDIS_URL=redis://...               # Já configurado
```
