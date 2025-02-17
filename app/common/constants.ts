export const IS_PROD = import.meta.env.PROD;
export const JWT_KEY = "ACCESS_TOKEN";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const TRPC_URL = process.env.VITE_BASE_URL + "/trpc";
