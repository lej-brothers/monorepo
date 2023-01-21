import dotenv from 'dotenv';

dotenv.config()

export const SECRET = process.env["SECRET"] || "";
export const MONGO_URL = process.env['MONGO_URL'] || ''