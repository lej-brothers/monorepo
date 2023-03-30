import { IPaginated, IProduct, IProductCreate, IProductParams } from "common";
import requester from "../configs/requester";
import queryString from "query-string";
import { AxiosResponse } from "axios";

const ProductServcie = {
  get: async (handle: string) => {
    const res = await requester.get(`/products/${handle}`);
    return res as AxiosResponse<IProduct>;
  },
  list: async (page: number, limit: number, options: IProductParams = {}) => {
    const params = queryString.stringify({
      page: String(page),
      limit: String(limit),
      ...options,
    });

    const res = await requester.get(
      params ? `/products?${params}` : "/products"
    );
    return res as AxiosResponse<IPaginated<IProduct>>;
  },

  options: async (page: number, limit: number) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      type: "option",
    });

    const res = await requester.get("/products", { params });
    return res as AxiosResponse<IPaginated<IProduct>>;
  },

  handles: async () => {
    const res = await requester.get("/products/handlers");
    return res as AxiosResponse<any>;
  },

  create: async (product: IProductCreate) => {
    const res = await requester.post("/products", product);
    return res as AxiosResponse<IProduct>;
  },

  update: async (product: IProductCreate) => {
    const res = await requester.patch(`/products/${product._id}`, product);
    return res as AxiosResponse<IProduct>;
  },
};

export default ProductServcie;
