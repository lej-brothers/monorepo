import { S3_ENDPOINT, S3_PORT, S3_ACCESS, S3_SECRET } from "./secrets";
import { Client } from "minio";

const MINIO = new Client({
  endPoint: S3_ENDPOINT,
  port: Number(S3_PORT),
  useSSL: false,
  accessKey: S3_ACCESS,
  secretKey: S3_SECRET,
});

export default MINIO;
