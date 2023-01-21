import { IPromotion } from "common";
import { Document, Schema, model } from "mongoose";
import { LocaleMemberSchema } from "./locale.model";

export interface IPromotionDocument extends Omit<IPromotion, "_id">, Document {}

export const PromotionSchema = new Schema(
  {
    title: [LocaleMemberSchema],
    description: [LocaleMemberSchema],
    code: String,
    activeFrom: Date,
    activeTo: Date,
    products: [{ type: Schema.Types.ObjectId, ref: "products" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "categories" }],
    purchasesLimit: Number,
    purchasesCount: Number,
    promoPrice: Number,
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

export const Promotion = model<IPromotionDocument>(
  "promotions",
  PromotionSchema
);
