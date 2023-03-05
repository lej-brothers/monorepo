import { IProductCreate } from "common";
import { PaginateOptions } from "mongoose";
import { IProductDocument, Product } from "../model/product.model";
import { Warehourse } from "../model/warehourse.model";
import CategoryService from "./category.service";
import ImageService from "./image.service";

const ProductService = {
  async get(id: string) {
    const product = await Product.findById(id)
      .populate("warehourse")
      .populate("images")
      .populate("categories");

    return product as IProductDocument;
  },

  async isDuplicate(slug: string) {
    const count = await Product.findOne({ slug }).count()
    const duplicated = count !== 0
    return duplicated;
  },

  async getBySlug(slug: string) {
    const product = await Product.findOne({ slug })
      .populate("warehourse")
      .populate("images")
      .populate("categories")
      .lean();

    product!.images = product!.images.map((image) => ({
      ...image,
      url: ImageService.get(image.key),
    }));

    return product;
  },

  async getHandlers() {
    return Product.find({}).select("slug");
  },

  async list(query: any, params: PaginateOptions) {
    const products = await Product.paginate(query, {
      ...params,
      populate: ["warehourse", "categories", "images"],
      lean: true,
    });

    products.docs = products.docs.map((product) => {
      product.images = product.images.map((image) => ({
        ...image,
        url: ImageService.get(image.key),
      }));

      return product;
    });

    return products;
  },

  async listByCategory(params: PaginateOptions, categories: string[]) {
    const categoryIds = (
      await Promise.all(
        categories.map((category) => CategoryService.getBySlug(category))
      )
    ).map((category) => category!._id);

    const products = await Product.paginate(
      { categories: { $in: categoryIds } },
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

    products.docs = products.docs.filter(
      (doc) =>
        !!doc.categories.filter((category) =>
          categories.includes(category.slug)
        ).length
    );

    products.totalDocs = products.docs.length;

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
