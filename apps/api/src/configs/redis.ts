import { RedisClientType, createClient } from "redis";
import { REDIS_URL } from "./secrets";

const REDIS_CLIENT: RedisClientType = createClient({ legacyMode: true, url: REDIS_URL });
REDIS_CLIENT.connect().catch(console.error)

export default REDIS_CLIENT;
