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
 * Realiza o UPSERT do lead baseado no telefone (ID natural).
 * Decisão técnica: Deduplicação via código para flexibilidade.
 */
export async function upsertLead(data: LeadData) {
  const dbUrl = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;
  
  if (!dbUrl) {
    console.warn(
      "[DB] DATABASE_URL não configurada. Lead não registrado no Postgres.",
    );
    return null;
  }

  // Limpeza básica do telefone (apenas números)
  const cleanPhone = data.phone.replace(/\D/g, "");
  if (!cleanPhone) return null;

  let client;
  try {
    client = await pool.connect();

    // 1. Verificar se o lead já existe
    const checkQuery = "SELECT id, status FROM leads WHERE phone = $1";
    const checkRes = await client.query(checkQuery, [cleanPhone]);

    if (checkRes.rows.length > 0) {
      // 2. UPDATE: Lead já existe
      const existingLead = checkRes.rows[0];

      // Lógica de evolução de status
      // Se já era QUALIFICADO/INTERESSADO, não volta para NOVO
      let newStatus = data.status || existingLead.status;
      if (
        existingLead.status === "INTERESSADO" &&
        data.status === "QUALIFICADO"
      ) {
        newStatus = "INTERESSADO"; // Mantém o status mais "quente"
      }

      const updateQuery = `
        UPDATE leads 
        SET 
          name = COALESCE($2, name),
          origin = COALESCE($3, origin),
          course_interest = COALESCE($4, course_interest),
          objective = COALESCE($5, objective),
          status = $6,
          last_message = COALESCE($7, last_message),
          updated_at = NOW()
        WHERE phone = $1
        RETURNING id
      `;

      const res = await client.query(updateQuery, [
        cleanPhone,
        data.name || null,
        data.origin || null,
        data.course_interest || null,
        data.objective || null,
        newStatus,
        data.last_message || null,
      ]);

      console.log(`[DB] Lead atualizado: ${cleanPhone}`);
      return res.rows[0].id;
    } else {
      // 3. INSERT: Novo lead
      const insertQuery = `
        INSERT INTO leads (
          phone, name, origin, course_interest, objective, status, last_message
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `;

      const res = await client.query(insertQuery, [
        cleanPhone,
        data.name || null,
        data.origin || null,
        data.course_interest || null,
        data.objective || null,
        data.status || "NOVO",
        data.last_message || null,
      ]);

      console.log(`[DB] Novo lead registrado: ${cleanPhone}`);
      return res.rows[0].id;
    }
  } catch (err) {
    // Falha silenciosa para não quebrar a landing
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
