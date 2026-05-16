/**
 * FlowPay Gmail Bridge — Google Apps Script
 *
 * Ouve emails de confirmação de pagamento do FlowPay na caixa
 * bellaembelleze.inteligencia@gmail.com e notifica o Railway
 * para atualizar o lead para PIX_PAGO e disparar o WhatsApp de confirmação.
 *
 * ── Instalação ────────────────────────────────────────────────────────────
 * 1. Acessar https://script.google.com com a conta bellaembelleze...@gmail.com
 * 2. Novo projeto → colar este código
 * 3. Executar setupProperties() uma vez (ajustar valores)
 * 4. Executar debugRecentEmails() para calibrar a query de busca
 * 5. Ajustar FLOWPAY_EMAIL_QUERY e PAID_KEYWORDS conforme email real
 * 6. Executar setupTrigger() uma vez para ativar polling de 5 em 5 min
 *
 * ── Dependências externas ─────────────────────────────────────────────────
 * Nenhuma. Usa apenas GmailApp, UrlFetchApp e PropertiesService nativos.
 */

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURAÇÃO (editada via setupProperties ou diretamente no painel do Script)
// ─────────────────────────────────────────────────────────────────────────────

function getConfig() {
  const props = PropertiesService.getScriptProperties();
  return {
    railwayUrl:   props.getProperty('RAILWAY_URL')
                  || 'https://embelleze-bella.online/api/payment/flowpay/webhook',
    webhookSecret: props.getProperty('FLOWPAY_SECRET') || '',
    // Ajustar após ver o remetente real do FlowPay
    searchQuery:  props.getProperty('FLOWPAY_EMAIL_QUERY')
                  || 'is:unread from:(flowpay)',
    processedLabel: 'flowpay-processed',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// LOOP PRINCIPAL — acionado pelo trigger a cada 5 minutos
// ─────────────────────────────────────────────────────────────────────────────

function checkPaymentEmails() {
  const config = getConfig();

  // Garantir que o label de controle existe
  const label = ensureLabel(config.processedLabel);

  const threads = GmailApp.search(config.searchQuery, 0, 10);
  if (threads.length === 0) return;

  Logger.log('[FlowPay Bridge] ' + threads.length + ' thread(s) encontrada(s)');

  threads.forEach(function(thread) {
    thread.getMessages().forEach(function(message) {
      if (!message.isUnread()) return;

      const subject  = message.getSubject();
      const body     = message.getPlainBody();
      const htmlBody = message.getBody();

      Logger.log('[FlowPay Bridge] Processando: "' + subject + '"');

      var parsed = parsePaymentEmail(subject, body, htmlBody);

      if (!parsed) {
        // Email não reconhecível: marcar como lido para não reprocessar
        message.markRead();
        Logger.log('[FlowPay Bridge] Email não parseável — ignorado');
        return;
      }

      if (!parsed.isPaid) {
        // Evento de status intermediário (pending, failed, etc.)
        message.markRead();
        Logger.log('[FlowPay Bridge] Evento não é pagamento confirmado: ' + parsed.rawStatus);
        return;
      }

      var success = notifyRailway(parsed, config);

      if (success) {
        message.markRead();
        thread.addLabel(label);
        Logger.log('[FlowPay Bridge] ✅ PIX_PAGO registrado — phone: ' + parsed.maskedPhone);
      } else {
        // Não marca como lido → será retentado no próximo ciclo (5 min)
        Logger.log('[FlowPay Bridge] ❌ Falha no Railway — retentará em 5 min');
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PARSER — ajustar após ver email real do FlowPay
// ─────────────────────────────────────────────────────────────────────────────

function parsePaymentEmail(subject, body, htmlBody) {
  // ── 1. Extrair phone ──────────────────────────────────────────────────────
  // Estratégia A: phone injetado como ?phone= na URL do checkout
  // (ZAPI webhook faz isso automaticamente antes de enviar ao cliente)
  var phone = extractPhoneFromUrl(body) || extractPhoneFromUrl(htmlBody);

  // Estratégia B: campo explícito no corpo do email
  if (!phone) phone = extractPhoneFromBody(body);

  // ── 2. Extrair transaction_id ─────────────────────────────────────────────
  // AJUSTAR conforme campo real no email FlowPay
  var txPatterns = [
    /(?:transaction[_\s]?id|id\s+da\s+transa[çc][ãa]o|payment[_\s]?id|pedido)[:\s#]+([A-Za-z0-9_\-]+)/i,
    /\b([A-Z0-9]{8,})\b/,  // Fallback: qualquer sequência alfanumérica longa
  ];
  var transaction_id = 'email-' + Date.now(); // fallback único
  for (var i = 0; i < txPatterns.length; i++) {
    var m = body.match(txPatterns[i]);
    if (m && m[1]) { transaction_id = m[1]; break; }
  }

  // ── 3. Detectar status de pagamento confirmado ────────────────────────────
  // AJUSTAR palavras-chave conforme assunto/corpo real do FlowPay
  var paidKeywords = ['aprovado', 'confirmado', 'approved', 'paid', 'pago', 'sucesso', 'concluído'];
  var combined = (subject + ' ' + body).toLowerCase();
  var isPaid = paidKeywords.some(function(kw) { return combined.indexOf(kw) !== -1; });

  if (!phone) {
    Logger.log('[FlowPay Bridge] Phone não encontrado. Primeiros 500 chars do body:\n'
               + body.slice(0, 500));
    return null;
  }

  var cleanPhone = phone.replace(/\D/g, '');
  return {
    phone:        cleanPhone,
    maskedPhone:  cleanPhone.slice(0, -4) + '****',
    transaction_id: transaction_id,
    isPaid:       isPaid,
    rawStatus:    isPaid ? 'PAID' : 'NON_PAID',
  };
}

function extractPhoneFromUrl(text) {
  if (!text) return null;
  // Extrai ?phone=5562XXXXXXXX do link de checkout injetado pelo ZAPI webhook
  var m = text.match(/[?&]phone=([0-9%2B+][0-9%20+\-]{8,})/);
  if (!m) return null;
  return decodeURIComponent(m[1]);
}

function extractPhoneFromBody(text) {
  if (!text) return null;
  var patterns = [
    /(?:telefone|celular|whatsapp|fone|phone)[:\s]+(\+?[\d\s\-\(\)]{10,15})/i,
    /(\+55[\s\-]?\d{2}[\s\-]?\d{4,5}[\s\-]?\d{4})/,
    /\b(55\d{10,11})\b/,
    /\b(0?[1-9]{2}[\s\-]?9?\d{4}[\s\-]?\d{4})\b/,
  ];
  for (var i = 0; i < patterns.length; i++) {
    var m = text.match(patterns[i]);
    if (m) return m[1];
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAMADA AO RAILWAY
// ─────────────────────────────────────────────────────────────────────────────

function notifyRailway(parsed, config) {
  var payload = {
    status: 'PAID',
    transaction_id: parsed.transaction_id,
    metadata: {
      phone: parsed.phone,
      source: 'gmail_bridge',
    },
  };

  try {
    var response = UrlFetchApp.fetch(config.railwayUrl, {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Bearer ' + config.webhookSecret,
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    });

    var code = response.getResponseCode();
    var body = response.getContentText();
    Logger.log('[FlowPay Bridge] Railway ' + code + ': ' + body);
    return code >= 200 && code < 300;
  } catch (e) {
    Logger.log('[FlowPay Bridge] Erro HTTP: ' + e.toString());
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITÁRIOS — executar manualmente para setup/debug
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Executar UMA VEZ para configurar as propriedades do script.
 * Substituir os valores antes de executar.
 */
function setupProperties() {
  var props = PropertiesService.getScriptProperties();
  props.setProperties({
    'RAILWAY_URL':          'https://embelleze-bella.online/api/payment/flowpay/webhook',
    'FLOWPAY_SECRET':       'SUBSTITUIR_PELO_SECRET_DO_RAILWAY',
    // Ajustar após ver remetente real — ex: 'is:unread from:pagamentos@flowpay.cash'
    'FLOWPAY_EMAIL_QUERY':  'is:unread from:(flowpay)',
  });
  Logger.log('Properties configuradas com sucesso.');
}

/**
 * Executar UMA VEZ para ativar o polling de 5 em 5 minutos.
 * Não duplica: remove triggers existentes antes de criar.
 */
function setupTrigger() {
  ScriptApp.getProjectTriggers()
    .filter(function(t) { return t.getHandlerFunction() === 'checkPaymentEmails'; })
    .forEach(function(t) { ScriptApp.deleteTrigger(t); });

  ScriptApp.newTrigger('checkPaymentEmails')
    .timeBased()
    .everyMinutes(5)
    .create();

  Logger.log('Trigger ativo: checkPaymentEmails a cada 5 minutos.');
}

/**
 * Executar para calibrar a query e ver o formato real dos emails do FlowPay.
 * Copie o output do Logger para ajustar FLOWPAY_EMAIL_QUERY e o parser.
 */
function debugRecentEmails() {
  var config = getConfig();
  var threads = GmailApp.search(config.searchQuery, 0, 5);

  if (threads.length === 0) {
    Logger.log('Nenhum email encontrado com a query: ' + config.searchQuery);
    Logger.log('Tente: GmailApp.search("from:flowpay", 0, 5) manualmente.');
    return;
  }

  threads.forEach(function(thread, i) {
    var msg = thread.getMessages()[0];
    Logger.log(
      '\n[' + (i+1) + '] From: ' + msg.getFrom() +
      '\n    Subject: ' + msg.getSubject() +
      '\n    Body (300 chars): ' + msg.getPlainBody().slice(0, 300) +
      '\n    ---'
    );
  });
}

/**
 * Disparar manualmente para um phone específico — útil para testar o pipeline
 * sem precisar de um pagamento real.
 */
function testPipeline() {
  var config = getConfig();
  var success = notifyRailway({
    phone: '5562000000000', // substituir por número de teste
    maskedPhone: '556200****',
    transaction_id: 'test-' + Date.now(),
    isPaid: true,
  }, config);
  Logger.log('Teste do pipeline: ' + (success ? '✅ OK' : '❌ FALHOU'));
}

// ─────────────────────────────────────────────────────────────────────────────

function ensureLabel(labelName) {
  try {
    return GmailApp.getUserLabelByName(labelName) || GmailApp.createLabel(labelName);
  } catch (e) {
    return GmailApp.createLabel(labelName);
  }
}
