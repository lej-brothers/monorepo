import { IOrder } from "common";
import { Document, Schema, model } from "mongoose";

export interface IOrderDocument extends Omit<IOrder, "_id">, Document {}

export const OrderSchema = new Schema(
  {
    sessionId: String,
    products: [{ type: Schema.Types.ObjectId, ref: "products" }],
    /**
     * @type {ORDER_STATUS}
     * */
    status: Number,
    isPaid: Boolean,
    promotions: [{ type: Schema.Types.ObjectId, ref: "promotions" }],
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

export const Order = model<IOrderDocument>("orders", OrderSchema);
