import { S3_BUCKET } from "./secrets";

export const PUT_BASE_PARAMS = {
  Bucket: S3_BUCKET,
  ACL: "public"
};