import { getCache, setCache } from "../service/redis.js";

/**
 * @param {number} ttlSeconds - Time-to-live in seconds (default: 300 = 5 mins)
 */
export const cacheMiddleware = (ttlSeconds = 300) => {
    return async (req, res, next) => {
        // Only cache GET requests
        if (req.method !== "GET") return next();

        // Key is based on full URL including query params (e.g. 'cache:/api/products?page=1')
        const cacheKey = `cache:${req.originalUrl}`;

        try {
            const cachedData = await getCache(cacheKey);
            if (cachedData) {
                res.setHeader("X-Cache", "HIT");
                return res.status(200).json(cachedData);
            }

            // Cache MISS: Intercept res.json to capture response
            res.setHeader("X-Cache", "MISS");
            const originalJson = res.json.bind(res);

            res.json = (body) => {
                if (res.statusCode === 200 && body?.success) {
                    setCache(cacheKey, body, ttlSeconds);
                }
                return originalJson(body);
            };

            next();
        } catch {
            next(); // If cache fails, proceed to database
        }
    };
};