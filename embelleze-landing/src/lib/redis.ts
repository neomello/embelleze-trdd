import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Singleton para o cliente Redis
let redis: Redis;

try {
  redis = new Redis(REDIS_URL);
} catch (error) {
  console.error('Failed to connect to Redis:', error);
}

/**
 * Registra uma intenção de localização no Redis
 */
export async function trackLocationIntent(data: any) {
  if (!redis) return { success: false, error: 'Redis not initialized' };

  const timestamp = new Date().toISOString();
  const dateKey = timestamp.split('T')[0];
  
  const payload = {
    ...data,
    timestamp,
    userAgent: 'server', // SSR context
  };

  try {
    const pipeline = redis.pipeline();

    // 1. Append na lista de intents brutos (cap at 1000 entries, expire daily keys after 90 days)
    pipeline.lpush('location:intents', JSON.stringify(payload));
    pipeline.ltrim('location:intents', 0, 999);

    // 2. Incrementa contador geral
    pipeline.incr('location:intents:count');

    // 3. Incrementa contador do dia (expire after 90 days)
    pipeline.incr(`location:intents:${dateKey}`);
    pipeline.expire(`location:intents:${dateKey}`, 60 * 60 * 24 * 90);

    // 4. Incrementa contador por bairro se existir
    if (data.neighborhood && data.neighborhood !== 'Outro') {
      pipeline.hincrby('location:intents:neighborhoods', data.neighborhood, 1);
    }

    // 5. Incrementa contador de permissão
    if (data.permission) {
      pipeline.hincrby('location:intents:permissions', data.permission, 1);
    }

    await pipeline.exec();
    return { success: true };
  } catch (error) {
    console.error('Redis Track Error:', error);
    return { success: false, error };
  }
}
