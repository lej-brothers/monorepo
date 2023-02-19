import { Schema, model } from "mongoose";
import { IMomo } from "common";

export interface IMomoDocument extends Omit<IMomo, "_id">, Document {}

export const MomoSchema = new Schema<IMomo>(
  {
    order: { type: Schema.Types.ObjectId, ref: "orders", unique: true },
    amount: Number,
    currency: String,
    transId: String,
  },
  {
    timestamps: true,
  }
);

export const Momo = model<IMomoDocument>("Momo", MomoSchema);
