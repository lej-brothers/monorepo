import dotenv from "dotenv";

dotenv.config();

export const SECRET = process.env["SECRET"] || "";
export const MONGO_URL = process.env["MONGO_URL"] || "";
export const S3_ENDPOINT = process.env["S3_ENDPOINT"] || "";
export const S3_PORT = process.env["S3_PORT"] || 30000;
export const S3_ACCESS = process.env["S3_ACCESS"] || "";
export const S3_SECRET = process.env["S3_SECRET"] || "";
