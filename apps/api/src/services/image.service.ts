import path from "path";
import { Express } from "express";
import { S3_ENDPOINT, S3_PORT } from "./../configs/secrets";
import { v4 } from "uuid";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import S3, { PUT_BASE_PARAMS } from "../configs/s3";
import { S3_BUCKET } from "../configs/secrets";
import { Image } from "../model/images.model";
import { logger } from "../configs/pino";

const ImageService = {
  get: (key: string) => `http://${S3_BUCKET}.${S3_ENDPOINT}/${key}`,

  async upload(file: Express.Multer.File) {
    const key = v4() + path.extname(file.originalname);
    try {
      const data = await S3.send(new PutObjectCommand({
        ...PUT_BASE_PARAMS,
        Key: key,
        Body: file.buffer
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
