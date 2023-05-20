import { RedisClientType, createClient } from "redis";
import { REDIS_URL } from "./secrets";

const REDIS_CLIENT: RedisClientType = createClient({ legacyMode: true, url: REDIS_URL, socket: {
    connectTimeout: 60000
  } });
REDIS_CLIENT.connect().catch((error) => {
  console.error(error)
  process.exit(1)
})

export default REDIS_CLIENT;
