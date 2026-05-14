export async function sendTextMessage(phone: string, message: string) {
  const instanceId = process.env.ZAPI_INSTANCE_ID || import.meta.env.ZAPI_INSTANCE_ID;
  const token = process.env.ZAPI_TOKEN || import.meta.env.ZAPI_TOKEN;
  const clientToken = process.env.ZAPI_CLIENT_TOKEN || import.meta.env.ZAPI_CLIENT_TOKEN;

  if (!instanceId || !token) {
    throw new Error("Z-API credentials missing (ZAPI_INSTANCE_ID or ZAPI_TOKEN)");
  }

  // Validação básica
  if (!phone || !phone.replace(/\D/g, "")) {
    throw new Error("Telefone inválido");
  }
  if (!message) {
    throw new Error("Mensagem vazia");
  }

  const url = `https://api.z-api.io/instances/${instanceId}/token/${token}/send-messages`;

  // Timeout de 5 segundos
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Token": clientToken || ""
      },
      body: JSON.stringify({
        phone: phone,
        message: message
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro na Z-API: ${response.status} - ${errorText}`);
    }

    console.log(`[ZAPI] Mensagem enviada para ${phone.slice(0, -4)}****`);
    return await response.json();
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Timeout na requisição para Z-API");
    }
    throw error;
  }
}
