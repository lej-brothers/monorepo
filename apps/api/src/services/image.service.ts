import path from "path";
import { Express } from "express";
import { S3_ENDPOINT, S3_PORT } from "./../configs/secrets";
import { v4 } from "uuid";
import { UploadedObjectInfo } from "minio";
import MINIO from "../configs/minio";
import { S3_BUCKET } from "../configs/secrets";
import { Image } from "../model/images.model";

const ImageService = {
  get: (key: string) => `${S3_ENDPOINT}:${S3_PORT}/${S3_BUCKET}/${key}`,

  async upload(file: Express.Multer.File) {
    const key = v4() + path.extname(file.originalname);
    const res: undefined | UploadedObjectInfo = await new Promise(
      async (resolve) => {
        MINIO.putObject(S3_BUCKET, key, file.buffer, (err, result) => {
          if (err) resolve(undefined);
          resolve(result);
        });
      }
    );
    if (!res) return null;
    const image = await Image.create({
      key,
      width: 0,
      height: 0,
      orientation: 1,
    });

    return image.toJSON();
  },
};

export default ImageService;
