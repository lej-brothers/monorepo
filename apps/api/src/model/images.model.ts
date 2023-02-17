import { Schema, model } from "mongoose";
import { IImage } from "common";
import ImageService from "../services/image.service";

export interface IImageDocument extends Omit<IImage, "_id">, Document {}

export const ImageSchema = new Schema<IImage>(
  {
    key: String,
    width: Number,
    height: Number,
    orientation: Number,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

ImageSchema.virtual("url").get((doc) => {
  return ImageService.get(doc.key);
});

export const Image = model<IImageDocument>("Images", ImageSchema);
