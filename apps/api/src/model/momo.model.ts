import { Schema, model } from "mongoose";
import { IMomo } from "common";

export interface IMomoDocument extends Omit<IMomo, "_id">, Document {}

export const MomoSchema = new Schema<IMomo>(
  {
    order: { type: Schema.Types.ObjectId, ref: "orders" },
    momoTransId: String,
  },
  {
    timestamps: true,
  }
);

export const Order = model<IMomoDocument>("Momo", MomoSchema, "momo");
