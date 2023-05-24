import path from "path";
import { Express } from "express";
import { S3_ACCESS, S3_ENDPOINT, S3_SECRET } from "./../configs/secrets";
import { v4 } from "uuid";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import S3 from "../configs/s3";
import { S3_BUCKET } from "../configs/secrets";
import { Image } from "../model/images.model";
import { logger } from "../configs/pino";
import { PUT_BASE_PARAMS } from "../configs/PUT_BASE_PARAMS";

const ImageService = {
  get: (key: string) => `http://${S3_BUCKET}.${S3_ENDPOINT.replace('https://', '')}/${key}`,

  async upload(file: Express.Multer.File) {
    const key = v4() + path.extname(file.originalname);
    try {
      
      const data = await S3.send(new PutObjectCommand({
        ...PUT_BASE_PARAMS,
        ACL: 'public-read',
        Key: key,
        Body: file.buffer,
        Metadata: {  }
      }));
      
      const image = await Image.create({
        key,
        width: 0,
        height: 0,
        orientation: 1,
      });
      return image.toJSON();
    } catch (err) {
      logger.error(err);
      return null
    }
  },
};

export default ImageService;
