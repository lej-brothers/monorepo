import { Schema, Document, model, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";

import { ICategory } from "common";

interface ICategoryDocument extends Omit<ICategory, "_id">, Document {}

const CategorySchema = new Schema(
  {
    name: String,
    slug: { type: String, unique: true, required: true },
    description: String,
    image: [{ type: Schema.Types.ObjectId, ref: "Images" }],
    products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  },
  {
    timestamps: true,
  }
);

CategorySchema.plugin(paginate);

const Category = model<ICategoryDocument, PaginateModel<ICategoryDocument>>(
  "categories",
  CategorySchema
);

export default Category;
