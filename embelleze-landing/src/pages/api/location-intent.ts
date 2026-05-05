import type { APIRoute } from 'astro';
import { trackLocationIntent } from '../../lib/redis';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validação básica
    if (!data.event) {
      return new Response(JSON.stringify({ error: 'Missing event' }), { status: 400 });
    }

    const result = await trackLocationIntent({
      ...data,
      source: 'landing_location_section',
      page: '/',
      destination: 'Instituto Embelleze Trindade',
      destinationAddress: 'Av. Manoel Monteiro, 1691 — Vila Padre Eterno, Trindade/GO',
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
