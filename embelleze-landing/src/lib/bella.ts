/**
 * Gera a resposta da Bella para o cliente.
 * Atualmente funciona como um mock, mas está isolada para facilitar
 * a futura integração com a Azure OpenAI sem mexer no webhook.
 */
export function generateBellaReply(payload: any): string {
  const senderName = payload.senderName || "Cliente";
  
  // Mock inicial de resposta
  return `Olá ${senderName}! Eu sou a Bella, sua assistente do Instituto Embelleze. Como posso te ajudar hoje?`;
}
