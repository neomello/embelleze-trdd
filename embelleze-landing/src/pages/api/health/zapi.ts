import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const instanceId = process.env.ZAPI_INSTANCE_ID || import.meta.env.ZAPI_INSTANCE_ID;
  const token = process.env.ZAPI_TOKEN || import.meta.env.ZAPI_TOKEN;
  const dbUrl = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;

  // Verificação básica de presença de variáveis
  const envOk = !!(instanceId && token && dbUrl);
  const providerOk = !!(instanceId && token);
  const dbOk = !!dbUrl; 

  return new Response(
    JSON.stringify({
      status: envOk ? "ok" : "degraded",
      provider: providerOk ? "ok" : "missing_credentials",
      db: dbOk ? "ok" : "missing_url",
      env: envOk ? "ok" : "incomplete"
    }),
    { 
      status: envOk ? 200 : 500,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
