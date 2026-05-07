import pg from "pg";
const { Pool } = pg;

// Conexão resiliente: se não houver DATABASE_URL, o sistema não quebra
const dbUrl = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;

const pool = new Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false, // Comum em instâncias Railway/AWS/Render
  },
  max: 10, // Limite de conexões simultâneas
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export interface LeadData {
  phone: string;
  name?: string;
  origin?: string;
  course_interest?: string;
  objective?: string;
  status?: "NOVO" | "QUALIFICADO" | "INTERESSADO";
  last_message?: string;
  assigned_to?: string;
}

/**
 * Realiza o UPSERT atômico do lead baseado no telefone (ID natural).
 * Single-statement INSERT ... ON CONFLICT elimina race condition de concorrência.
 * Lógica de status: INTERESSADO nunca regride para QUALIFICADO.
 */
export async function upsertLead(data: LeadData) {
  const dbUrl = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;

  if (!dbUrl) {
    console.warn("[DB] DATABASE_URL não configurada. Lead não registrado no Postgres.");
    return null;
  }

  const cleanPhone = data.phone.replace(/\D/g, "");
  if (!cleanPhone) return null;

  let client;
  try {
    client = await pool.connect();

    const res = await client.query(
      `INSERT INTO leads (phone, name, origin, course_interest, objective, status, last_message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (phone) DO UPDATE SET
         name             = COALESCE(EXCLUDED.name,            leads.name),
         origin           = COALESCE(EXCLUDED.origin,          leads.origin),
         course_interest  = COALESCE(EXCLUDED.course_interest, leads.course_interest),
         objective        = COALESCE(EXCLUDED.objective,       leads.objective),
         status           = CASE
                              WHEN leads.status = 'INTERESSADO' AND EXCLUDED.status = 'QUALIFICADO'
                              THEN 'INTERESSADO'
                              ELSE COALESCE(EXCLUDED.status, leads.status)
                            END,
         last_message     = COALESCE(EXCLUDED.last_message,    leads.last_message),
         updated_at       = NOW()
       RETURNING id`,
      [
        cleanPhone,
        data.name || null,
        data.origin || null,
        data.course_interest || null,
        data.objective || null,
        data.status || "NOVO",
        data.last_message || null,
      ],
    );

    return res.rows[0].id as string;
  } catch (err) {
    console.error("[DB] Erro ao salvar lead:", err);
    return null;
  } finally {
    if (client) client.release();
  }
}

/**
 * Estrutura preparada para futura tabela de eventos.
 * Permite rastrear cada passo do lead sem poluir a tabela principal.
 */
export async function appendLeadEvent(
  phone: string,
  eventType: string,
  metadata: any = {},
) {
  // TODO: Implementar quando a tabela lead_events for criada
  console.log(`[DB-EVENT] ${phone}: ${eventType}`, metadata);
}
