import { Schema } from "mongoose";
import { IImage } from "common";

export const ImageSchema = new Schema<IImage>({
  key: String,
  width: Number,
  height: Number,
  orientation: Number,
});
