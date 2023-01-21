import { Document, Schema, model } from "mongoose";

import { IProduct } from "common";
import { ImageSchema } from "./images.model";
import { LocaleMemberSchema } from "./locale.model";

export interface IProductDocument extends Omit<IProduct, '_id'>, Document {}

export const ProductSchema = new Schema({
  title: [LocaleMemberSchema],
  details: [LocaleMemberSchema],
  description: [LocaleMemberSchema],
  categories: [{ type: Schema.Types.ObjectId, ref: "categories" }],
  warehourse: { type: Schema.Types.ObjectId, ref: "warehourses" },
  images: [ImageSchema],
}, {
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
});

export const Product = model<IProductDocument>("products", ProductSchema);

export default Product;
