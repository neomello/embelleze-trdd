import type { APIRoute } from "astro";
import { generateBellaReply } from "../../../lib/bella";
import { claimProbeltecSync, upsertLead } from "../../../lib/db";
import { createLead } from "../../../lib/probeltec";
import { sendTextMessage } from "../../../lib/zapi";

export const POST: APIRoute = async ({ request }) => {
  try {
    const isProd = process.env.NODE_ENV === "production";

    // 7. Webhook security: validar secret/token da Z-API
    const clientTokenHeader = request.headers.get("Client-Token");
    const clientToken =
      process.env.ZAPI_CLIENT_TOKEN || import.meta.env.ZAPI_CLIENT_TOKEN;

    if (clientToken && clientTokenHeader !== clientToken) {
      console.warn("[ZAPI Webhook] Tentativa de acesso não autorizada.");
      return new Response(JSON.stringify({ status: "unauthorized" }), {
        status: 401,
      });
    }

    const rawPayload = await request.json();

    // 8. Logs: não logar payload completo em produção
    if (!isProd) {
      console.log(
        "[ZAPI Webhook] Raw Payload:",
        JSON.stringify(rawPayload, null, 2),
      );
    }

    // 3. Normalizar dados
    const phone = rawPayload.phone || rawPayload.chatId?.replace("@c.us", "");
    const message = rawPayload.text?.message || rawPayload.text || "";
    const senderName = rawPayload.senderName || "Cliente";
    const fromMe = rawPayload.fromMe !== undefined ? rawPayload.fromMe : true;

    // Mascarar telefone para log
    const maskedPhone = phone ? `${phone.slice(0, -4)}****` : "N/A";
    console.log(`[ZAPI Webhook] Mensagem recebida de ${maskedPhone}`);

    // 4. Ignorar mensagens fromMe (enviadas pelo próprio bot)
    if (fromMe) {
      return new Response(
        JSON.stringify({ status: "ignored", reason: "message from me" }),
        { status: 200 },
      );
    }

    // 5. Salvar/atualizar lead no nosso Postgres
    // Regra: Se banco falhar, não quebrar resposta do WhatsApp
    try {
      if (phone) {
        await upsertLead({
          phone: phone,
          name: senderName,
          last_message: message,
          status: "NOVO",
          origin: "whatsapp_zapi",
        });
      }
    } catch (dbError) {
      console.error(
        "[ZAPI Webhook] Erro ao salvar no DB (Silenciado):",
        dbError,
      );
    }

    // 5b. Sync com Probeltec CRM — só quando temos telefone e nome real.
    // "Cliente" é o fallback de senderName ausente; sem nome real não criamos.
    // claimProbeltecSync() é atômico: ganha o slot ou devolve false se já sincronizado.
    const hasRealName = senderName && senderName !== "Cliente";
    if (phone && hasRealName) {
      try {
        const claimed = await claimProbeltecSync(phone);
        if (claimed) {
          await createLead({ name: senderName, phone });
          console.log(`[Probeltec] Lead criado no CRM: ${maskedPhone}`);
        }
      } catch (crmError) {
        // Probeltec falhou — conversa continua normalmente
        console.error(
          "[Probeltec] Erro ao sincronizar lead (Silenciado):",
          (crmError as Error).message,
        );
      }
    }

    // 4. Bella mock (agora extraída)
    const replyMessage = generateBellaReply(rawPayload);

    // 2. Usar src/lib/zapi.ts para envio
    // Regra: Se Bella falhar, responder fallback humano
    try {
      await sendTextMessage(phone, replyMessage);
    } catch (sendError) {
      console.error("[ZAPI Webhook] Erro ao enviar mensagem:", sendError);

      // Fallback humano
      const fallbackMessage = `Olá ${senderName}! Tivemos um probleminha técnico em nosso sistema de IA, mas um de nossos consultores humanos já vai te atender.`;

      try {
        await sendTextMessage(phone, fallbackMessage);
      } catch (fallbackError) {
        console.error("[ZAPI Webhook] Erro no fallback:", fallbackError);
      }
    }

    return new Response(JSON.stringify({ status: "success" }), { status: 200 });
  } catch (error) {
    console.error("[ZAPI Webhook] Erro ao processar webhook:", error);
    return new Response(
      JSON.stringify({ status: "error", message: "Internal Server Error" }),
      { status: 500 },
    );
  }
};
