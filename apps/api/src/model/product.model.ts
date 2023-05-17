import { Document, PaginateModel, Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

import { IProduct } from "common";

export interface IProductDocument extends Omit<IProduct, "_id">, Document {}

export const ProductSchema = new Schema(
  {
    title: String,
    details: String,
    description: String,
    slug: { type: String, unique: true, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "categories" }],
    warehourse: { type: Schema.Types.ObjectId, ref: "warehourses" },
    images: [{ type: Schema.Types.ObjectId, ref: "Images" }],
    isHighlight: Boolean,
    isMetch: Boolean,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

ProductSchema.plugin(paginate);
ProductSchema.plugin(aggregatePaginate)

export const Product = model<IProductDocument, PaginateModel<IProductDocument>>(
  "Products",
  ProductSchema,
  "products"
);

export default Product;
