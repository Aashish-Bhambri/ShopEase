import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = createClient({ url: redisUrl });
redis.on("error", (err) => console.error("Redis error:", err));

export async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
}

export async function getCache(key) {
  try {
    if (!redis.isOpen) return null;
    const data = await redis.get(key); 
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
}

export async function setCache(key, value, ttlSeconds = 300) {
  try {
    if (!redis.isOpen) return;
    await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });

  } catch (error) {
    console.warn(`Redis set error for ${key}:`, err.message);
  }
}

export async function deleteCache(keys) {
  try {
    if (!redis.isOpen) return;
    const keyList = Array.isArray(keys) ? keys : [keys];
    if (keyList.length > 0) await redis.del(keyList);
  } catch (err) {
    console.warn("Redis delete error:", err.message);
  }
}

export async function deleteCacheByPattern(pattern) {
  try {
    if (!redis.isOpen) return;
    let cursor = 0;
    do {
      const reply = await redis.scan(cursor, { MATCH: pattern, COUNT: 50 });
      cursor = reply.cursor;
      if (reply.keys.length > 0) {
        await redis.del(reply.keys);
      }
    } while (cursor !== 0);
  } catch (err) {
    console.warn("Redis scan/delete error:", err.message);
  }
}