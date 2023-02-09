import { IProductCreate } from "common";
import { PaginateOptions } from "mongoose";
import { Product } from "../model/product.model";
import { Warehourse } from "../model/warehourse.model";
import CategoryService from "./category.service";
import ImageService from "./image.service";

const ProductService = {
  async get(id: string) {
    return Product.findById(id);
  },
  async getBySlug(slug: string) {
    return Product.findOne({ slug });
  },
  async list(params: PaginateOptions) {
    const products = await Product.paginate(
      {},
      {
        ...params,
        populate: ["warehourse", "categories", "images"],
        lean: true,
      }
    );

    products.docs = products.docs.map((product) => {
      product.images = product.images.map((image) => ({
        ...image,
        url: ImageService.get(image.key),
      }));

      return product;
    });

    return products;
  },
  async create(payload: IProductCreate) {
    const product = await Product.create({
      slug: payload.slug,
      title: payload.title,
      details: payload.details,
      images: payload.images,
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
