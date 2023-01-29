import { IPromotion } from "common";
import { Document, PaginateModel, Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface IPromotionDocument extends Omit<IPromotion, "_id">, Document {}

export const PromotionSchema = new Schema(
  {
    title: String,
    description: String,
    code: String,
    activeFrom: Date,
    activeTo: Date,
    products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
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

PromotionSchema.plugin(paginate);

export const Promotion = model<
  IPromotionDocument,
  PaginateModel<IPromotionDocument>
>("Promotions", PromotionSchema, "promotions");
