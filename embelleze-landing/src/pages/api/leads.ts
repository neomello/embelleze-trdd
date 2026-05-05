import type { APIRoute } from 'astro';
import { upsertLead } from '../../lib/db';

/**
 * Endpoint para captura de leads vindos da landing.
 * Aceita: phone (obrigatório), name, origin, course_interest, objective, status, last_message.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validação mínima
    if (!data.phone) {
      return new Response(JSON.stringify({ error: 'Telefone é obrigatório' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Tenta salvar no banco (falha silenciosa interna no lib/db)
    const leadId = await upsertLead({
      phone: data.phone,
      name: data.name,
      origin: data.origin || 'landing',
      course_interest: data.course_interest,
      objective: data.objective,
      status: data.status,
      last_message: data.last_message
    });

    return new Response(JSON.stringify({ 
      success: true, 
      id: leadId,
      message: leadId ? 'Lead registrado' : 'Lead processado sem persistência'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('[API-LEADS] Erro:', err);
    
    // Sempre retorna 200 ou 500 controlado para não assustar o frontend
    return new Response(JSON.stringify({ error: 'Falha ao processar requisição' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
