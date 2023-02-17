import { IWarehourse } from "common";
import { Document, Schema, model } from "mongoose";

export interface IWarehourseDocument
  extends Omit<IWarehourse, "_id">,
    Document {}

export const WarehourseSchema = new Schema(
  {
    price: Number,
    initialPrice: Number,
    count: Number,
    soldCount: Number,
    isProductAvailable: Boolean,
    product: { type: Schema.Types.ObjectId, ref: "products" },
  },
  {
    timestamps: true,
  }
);

export const Warehourse = model<IWarehourseDocument>(
  "warehourses",
  WarehourseSchema
);
