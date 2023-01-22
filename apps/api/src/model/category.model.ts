import { Schema, Document, model, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";

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
    products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

CategorySchema.plugin(paginate);

const Category = model<ICategoryDocument, PaginateModel<ICategoryDocument>>(
  "Categories",
  CategorySchema,
  "categories"
);

export default Category;
