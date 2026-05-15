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

// Evita ALTER TABLE no hot path — executado uma única vez por processo
let probeltecColumnReady = false;

async function ensureProbeltecColumn(client: pg.PoolClient): Promise<void> {
  if (probeltecColumnReady) return;
  await client.query(
    `ALTER TABLE leads ADD COLUMN IF NOT EXISTS probeltec_synced_at TIMESTAMPTZ`,
  );
  probeltecColumnReady = true;
}

/**
 * Operação atômica: tenta reservar o slot de sync para o telefone dado.
 * Retorna true se esta chamada ganhou o slot (deve criar no CRM).
 * Retorna false se já estava sincronizado (outra instância ou chamada anterior).
 *
 * UPDATE ... WHERE probeltec_synced_at IS NULL é atômico no Postgres —
 * elimina race condition entre múltiplas instâncias do app.
 */
export async function claimProbeltecSync(phone: string): Promise<boolean> {
  const dbUrl = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;
  if (!dbUrl) return false;

  const cleanPhone = phone.replace(/\D/g, "");
  if (!cleanPhone) return false;

  let client;
  try {
    client = await pool.connect();
    await ensureProbeltecColumn(client);

    const res = await client.query(
      `UPDATE leads
       SET probeltec_synced_at = NOW()
       WHERE phone = $1 AND probeltec_synced_at IS NULL
       RETURNING phone`,
      [cleanPhone],
    );

    // rowCount > 0 → esta chamada ganhou o slot, deve criar no CRM
    return (res.rowCount ?? 0) > 0;
  } catch (err) {
    console.error("[DB] Erro ao reservar sync Probeltec:", err);
    return false;
  } finally {
    if (client) client.release();
  }
}

let leadEventsTableReady = false;

async function ensureLeadEventsTable(client: pg.PoolClient): Promise<void> {
  if (leadEventsTableReady) return;
  await client.query(`
    CREATE TABLE IF NOT EXISTS lead_events (
      id          SERIAL PRIMARY KEY,
      phone       TEXT NOT NULL,
      event_type  TEXT NOT NULL,
      metadata    JSONB,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  leadEventsTableReady = true;
}

export async function appendLeadEvent(
  phone: string,
  eventType: string,
  metadata: any = {},
): Promise<void> {
  const dbUrl = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;
  if (!dbUrl) return;

  const cleanPhone = phone.replace(/\D/g, "");
  if (!cleanPhone) return;

  let client;
  try {
    client = await pool.connect();
    await ensureLeadEventsTable(client);
    await client.query(
      `INSERT INTO lead_events (phone, event_type, metadata) VALUES ($1, $2, $3)`,
      [cleanPhone, eventType, JSON.stringify(metadata)],
    );
  } catch (err) {
    console.error(`[DB-EVENT] Erro ao registrar evento ${eventType}:`, err);
  } finally {
    if (client) client.release();
  }
}
