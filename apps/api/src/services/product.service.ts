import { IProduct } from "common";
import { PaginateOptions } from "mongoose";
import { Product } from "../model/product.model";

const ProductService = {
  async get(id: string) {
    return Product.findById(id);
  },
  async getBySlug(slug: string) {
    return Product.findOne({ slug });
  },
  async list(params: PaginateOptions) {
    return Product.paginate({}, params);
  },
  async create(payload: IProduct) {
    const product = await Product.create(payload);
    return product;
  },
  async update(payload: Partial<IProduct>) {
    return Product.findOneAndUpdate({ _id: payload._id }, payload, {
      timestamps: true,
    });
  },
};

export default ProductService;
