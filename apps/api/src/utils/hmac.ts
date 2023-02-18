import crypto from "crypto-js";

function hmac(key: string, data: string) {
  return crypto.HmacSHA256(data, key);
}

export default hmac;
