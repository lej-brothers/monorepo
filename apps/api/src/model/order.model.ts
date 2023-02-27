import { IOrder } from "common";
import { Document, PaginateModel, Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface IOrderDocument extends Omit<IOrder, "_id">, Document {}

export const OrderSchema = new Schema(
  {
    code: { type: String, unique: true },
    cart: Object,
    status: Number,
    method: String,
    isPaid: Boolean,
    totalAmount: Number,
    deliveryInfo: Object,
    momo: { type: Schema.Types.ObjectId, ref: "Momo" },
  },
  {
    timestamps: true,
  }
);

OrderSchema.plugin(paginate);

export const Order = model<IOrderDocument, PaginateModel<IOrderDocument>>(
  "Orders",
  OrderSchema,
  "orders"
);
