import { Schema, Document, model } from "mongoose";
import { LocaleMemberSchema } from "./locale.model";
import { ImageSchema } from "./images.model";
import { ICategory } from "common";

interface ICategoryDocument extends Omit<ICategory, "_id">, Document {}

const CategorySchema = new Schema(
  {
    name: [LocaleMemberSchema],
    slug: { type: String, unique: true, required: true },
    description: [LocaleMemberSchema],
    image: ImageSchema,
    products: [{ type: Schema.Types.ObjectId, ref: "products" }],
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const Category = model<ICategoryDocument>("categories", CategorySchema);

export default Category;
