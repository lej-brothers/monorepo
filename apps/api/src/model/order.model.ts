import { IOrder } from "common";
import { Document, Schema, model } from "mongoose";

export interface IOrderDocument extends Omit<IOrder, "_id">, Document {}

export const OrderSchema = new Schema(
  {
    sessionId: String,
    code: { type: String, unique: true },
    products: [Object],
    /**
     * @type {ORDER_STATUS}
     * */
    status: Number,
    isPaid: Boolean,
    promotions: [{ type: Schema.Types.ObjectId, ref: "promotions" }],
    deliveryInfo: Object,

    momo: { type: Schema.Types.ObjectId, ref: "Momo" },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrderDocument>("Orders", OrderSchema, "orders");
