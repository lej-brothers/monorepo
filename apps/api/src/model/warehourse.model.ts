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
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

export const Warehourse = model<IWarehourseDocument>(
  "warehourses",
  WarehourseSchema
);
