import { ICategoryCreate } from "common";
import { PaginateOptions } from "mongoose";
import Category from "../model/category.model";

const CategoryService = {
  async get(id: string) {
    return Category.findById(id);
  },
  async getBySlug(slug: string) {
    return Category.findOne({ slug });
  },
  async list(params: PaginateOptions) {
    return Category.paginate({}, params);
  },
  async create(payload: ICategoryCreate) {
    const product = await Category.create(payload);
    return product;
  },
  async update(payload: Partial<ICategoryCreate>) {
    return Category.findOneAndUpdate({ _id: payload._id }, payload, {
      timestamps: true,
    });
  },
};

export default CategoryService;
