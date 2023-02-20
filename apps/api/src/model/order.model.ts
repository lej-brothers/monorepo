import { IOrder } from "common";
import { Document, Schema, model } from "mongoose";

export interface IOrderDocument extends Omit<IOrder, "_id">, Document {}

export const OrderSchema = new Schema(
  {
    code: { type: String, unique: true },
    cart: Object,
    status: Number,
    isPaid: Boolean,
    totalAmount: Number,
    deliveryInfo: Object,

    momo: { type: Schema.Types.ObjectId, ref: "Momo" },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrderDocument>("Orders", OrderSchema, "orders");
