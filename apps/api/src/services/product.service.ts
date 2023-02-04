import { IProductCreate } from "common";
import { PaginateOptions } from "mongoose";
import { Product } from "../model/product.model";
import { Warehourse } from "../model/warehourse.model";
import CategoryService from "./category.service";

const ProductService = {
  async get(id: string) {
    return Product.findById(id);
  },
  async getBySlug(slug: string) {
    return Product.findOne({ slug });
  },
  async list(params: PaginateOptions) {
    return Product.paginate(
      {},
      { ...params, populate: ["warehourse", "categories"] }
    );
  },
  async create(payload: IProductCreate) {
    const product = await Product.create({
      slug: payload.slug,
      title: payload.title,
      details: payload.details,
      description: payload.description,
      categories: payload.categories,
      isMetch: payload.isMetch,
    });

    const warehourse = await Warehourse.create({
      price: payload.price,
      count: payload.count,
      product: product._id,
    });

    const promises = payload.categories.map(async (id) => {
      const category = await CategoryService.get(id);
      if (!category) return null;
      category.products.push(id as any);
      return await category?.save();
    });

    await Promise.all(promises);

    (product.warehourse = warehourse._id), await product.save();

    return product;
  },
  async update(payload: Partial<IProductCreate>) {
    return Product.findOneAndUpdate({ _id: payload._id }, payload, {
      timestamps: true,
    });
  },
};

export default ProductService;
