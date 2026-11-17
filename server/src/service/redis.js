import { createClient } from "redis";

const getCleanRedisUrl = () => {
  const rawUrl = (process.env.REDIS_URL || "redis://localhost:6379").trim();
  // Strip accidental "REDIS_URL=" prefix or surrounding quotes if copied with key
  return rawUrl
    .replace(/^REDIS_URL\s*=\s*/i, "")
    .replace(/^["']|["']$/g, "")
    .trim();
};

let client;
try {
  client = createClient({
    url: getCleanRedisUrl(),
    socket: {
      reconnectStrategy: (retries) => {
        if (retries > 3) return false;
        return Math.min(retries * 500, 2000);
      }
    }
  });
  client.on("error", (err) => console.error("Redis error:", err.message));
} catch (err) {
  console.error("Failed to initialize Redis client:", err.message);
  client = { isOpen: false };
}

export const redis = client;

export async function connectRedis() {
  try {
    if (redis && typeof redis.connect === "function" && !redis.isOpen) {
      await redis.connect();
      console.log("Connected to Redis");
    }
  } catch (err) {
    console.warn("Redis connection failed, running without cache:", err.message);
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