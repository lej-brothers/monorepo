import { IProduct } from "common";
import { Product } from "../model/product.model";

const ProductService = {
  async get(id: string) {
    return Product.findById(id);
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
