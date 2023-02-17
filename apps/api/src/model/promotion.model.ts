import { IPromotion } from "common";
import { Document, PaginateModel, Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface IPromotionDocument extends Omit<IPromotion, "_id">, Document {}

export const PromotionSchema = new Schema(
  {
    code: String,
    description: String,
    activeFrom: Date,
    activeTo: Date,
    products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
    purchasesLimit: Number,
    purchasesCount: Number,
    promoPrice: Number,
  },
  {
    timestamps: true,
  }
);

PromotionSchema.plugin(paginate);

export const Promotion = model<
  IPromotionDocument,
  PaginateModel<IPromotionDocument>
>("Promotions", PromotionSchema, "promotions");
