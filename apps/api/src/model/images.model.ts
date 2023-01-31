import { Schema, model } from "mongoose";
import { IImage } from "common";

export interface IImageDocument extends Omit<IImage, "_id">, Document {}

export const ImageSchema = new Schema<IImage>(
  {
    key: String,
    width: Number,
    height: Number,
    orientation: Number,
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

export const Image = model<IImageDocument>("images", ImageSchema);
