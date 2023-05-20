import { RedisClientType, createClient } from "redis";
import { REDIS_URL } from "./secrets";

const REDIS_CLIENT: RedisClientType = createClient({ url: REDIS_URL });
REDIS_CLIENT.connect().catch((error) => {
  console.error(error)
  process.exit(1)
})

export default REDIS_CLIENT;
