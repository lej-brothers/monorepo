import { S3_ENDPOINT, S3_ACCESS, S3_SECRET, S3_BUCKET } from "./secrets";
import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  endpoint: S3_ENDPOINT, // Find your endpoint in the control panel, under Settings. Prepend "https://".
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  credentials: {
    accessKeyId: S3_ACCESS, // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey: S3_SECRET // Secret access key defined through an environment variable.
  }
});

export const PUT_BASE_PARAMS = {
  Bucket: S3_BUCKET,
  ACL: "public",
}


export default s3Client;
