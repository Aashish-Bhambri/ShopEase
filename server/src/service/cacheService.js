import { deleteCache, deleteCacheByPattern } from "./redis.js";

export const invalidateProductCache = async (slug, id) => {
  const specificKeys = [
    "cache:/api/products/bestsellers",
    "cache:admin:stats"
  ];

  if (slug) specificKeys.push(`cache:/api/products/${slug}`);
  if (id) specificKeys.push(`cache:/api/products/${id}`);

  // Delete specific product & bestsellers
  await deleteCache(specificKeys);

  // Invalidate any paginated or filtered catalog list (e.g. /api/products?...)
  await deleteCacheByPattern("cache:/api/products*");
};