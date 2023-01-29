import { Document, PaginateModel, Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

import { IProduct } from "common";
import { ImageSchema } from "./images.model";

export interface IProductDocument extends Omit<IProduct, "_id">, Document {}

export const ProductSchema = new Schema(
  {
    title: String,
    details: String,
    description: String,
    slug: { type: String, unique: true, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "categories" }],
    warehourse: { type: Schema.Types.ObjectId, ref: "warehourses" },
    images: [ImageSchema],
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

ProductSchema.plugin(paginate);

export const Product = model<IProductDocument, PaginateModel<IProductDocument>>(
  "Products",
  ProductSchema,
  "products"
);

export default Product;
