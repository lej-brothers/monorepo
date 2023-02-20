import crypto from "crypto";

function hmac(key: string, data: string) {
  const hmac = crypto.createHmac('sha256', key);
  const item = hmac.update(data)
  
  return item.digest('hex')
}

export default hmac;
