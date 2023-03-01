import { ICart } from "common";
import { Document, Schema, model } from "mongoose";

export interface ICartDocument extends Omit<ICart, "_id">, Document {}

export const CartSchema = new Schema({
  sessionId: String,
  products: [Object],
  promotions: [{ type: Schema.Types.ObjectId, ref: "Promotions" }],
});

export const Cart = model<ICartDocument>("Carts", CartSchema);
