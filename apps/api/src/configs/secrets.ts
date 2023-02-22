import dotenv from "dotenv";

dotenv.config();

export const HOST = process.env["HOST"] || "http://localhost:4000";
export const FE_HOST = process.env["FE_HOST"] || "http://localhost:4001";
export const SECRET = process.env["SECRET"] || "";
export const MONGO_URL = process.env["MONGO_URL"] || "";
export const S3_ENDPOINT = process.env["S3_ENDPOINT"] || "";
export const S3_PORT = process.env["S3_PORT"] || 30000;
export const S3_ACCESS = process.env["S3_ACCESS"] || "";
export const S3_SECRET = process.env["S3_SECRET"] || "";
export const S3_BUCKET = process.env["S3_BUCKET"] || "lej-marketplace";
export const SENDGRID_API_KEY = process.env["SENDGRID_API_KEY"] || "";
export const IS_PRODUCTION = process.env["NODE_ENV"] === "production";

export const MOMO_BASE_URL = IS_PRODUCTION
  ? "https://payment.momo.vn/v2/gateway/api"
  : "https://test-payment.momo.vn/v2/gateway/api";

export const MOMO_PARTNER_CODE = process.env["MOMO_PARTNER_CODE"] || "";
export const MOMO_ACCESS_KEY = process.env["MOMO_ACCESS_KEY"] || "";
export const MOMO_SECRET_KEY = process.env["MOMO_SECRET_KEY"] || "";
