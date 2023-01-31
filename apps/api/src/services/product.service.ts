import { IProductCreate } from "common";
import { PaginateOptions } from "mongoose";
import { Product } from "../model/product.model";
import { Warehourse } from "../model/warehourse.model";

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
      product: product._id
    })

    product.warehourse = warehourse._id,
    await product.save()

    return product;
  },
  async update(payload: Partial<IProductCreate>) {
    return Product.findOneAndUpdate({ _id: payload._id }, payload, {
      timestamps: true,
    });
  },
};

export default ProductService;
