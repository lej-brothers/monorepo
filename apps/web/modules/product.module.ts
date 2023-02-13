import { IPaginated, IProduct, IProductCreate, IProductParams } from "common";
import requester from "../configs/requester";
import queryString from "query-string";

const ProductModule = {
  list: async (
    page: number,
    limit: number,
    options: IProductParams = {}
  ): Promise<IPaginated<IProduct>> => {
    const params = queryString.stringify({
      page: String(page),
      limit: String(limit),
      ...options,
    });

    const res = await requester.get(params ? `/products?${params}` : "/products");
    return res.data;
  },

  options: async (
    page: number,
    limit: number
  ): Promise<IPaginated<IProduct>> => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      type: "option",
    });

    const res = await requester.get("/products", { params });
    return res.data;
  },

  create: async (product: IProductCreate): Promise<IProduct> => {
    const res = await requester.post("/products", product);
    return res.data;
  },
};

export default ProductModule;
