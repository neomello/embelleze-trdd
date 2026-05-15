import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let _systemPrompt: string | null = null;

function getSystemPrompt(): string {
  if (_systemPrompt) return _systemPrompt;
  const knowledgePath = join(__dirname, "../content/bella.knowledge.md");
  _systemPrompt = readFileSync(knowledgePath, "utf-8");
  return _systemPrompt;
}

function getAzureConfig() {
  return {
    endpoint: process.env.AZURE_OPENAI_ENDPOINT || import.meta.env.AZURE_OPENAI_ENDPOINT,
    apiKey: process.env.AZURE_OPENAI_API_KEY || import.meta.env.AZURE_OPENAI_API_KEY,
    apiVersion: process.env.AZURE_OPENAI_API_VERSION || import.meta.env.AZURE_OPENAI_API_VERSION || "2025-01-01-preview",
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || import.meta.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-4o",
    maxTokens: Number(process.env.BELLA_MAX_TOKENS || import.meta.env.BELLA_MAX_TOKENS || "800"),
    temperature: Number(process.env.BELLA_TEMPERATURE || import.meta.env.BELLA_TEMPERATURE || "0.7"),
  };
}

export async function generateBellaReply(payload: any): Promise<string> {
  const cfg = getAzureConfig();

  if (!cfg.endpoint || !cfg.apiKey) {
    console.warn("[Bella] Azure OpenAI não configurado — usando fallback.");
    const senderName = payload.senderName || "Cliente";
    return `Olá ${senderName}! Eu sou a Bella, consultora virtual do Instituto Embelleze Trindade. Como posso te ajudar hoje?`;
  }

  const message = payload.text?.message || payload.text || "";
  const senderName = payload.senderName || "";
  const userContent = senderName && senderName !== "Cliente"
    ? `[${senderName}]: ${message}`
    : message;

  const url = `${cfg.endpoint.replace(/\/$/, "")}/openai/deployments/${cfg.deployment}/chat/completions?api-version=${cfg.apiVersion}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": cfg.apiKey,
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: getSystemPrompt() },
        { role: "user", content: userContent },
      ],
      max_tokens: cfg.maxTokens,
      temperature: cfg.temperature,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[Bella] Azure OpenAI erro HTTP ${res.status}: ${err}`);
  }

  const data = (await res.json()) as any;
  const reply = data?.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    throw new Error("[Bella] Resposta vazia do Azure OpenAI");
  }

  return reply;
}
