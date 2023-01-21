import { RedisClientType, createClient } from "redis";

const REDIS_CLIENT: RedisClientType = createClient({ legacyMode: true });
REDIS_CLIENT.connect().catch(console.error)

export default REDIS_CLIENT;
