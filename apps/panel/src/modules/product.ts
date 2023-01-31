import { IPaginated, IProduct, IProductCreate } from "common";
import requester from "../utils/requester";

const ProductModule = {
  list: async (page: number, limit: number): Promise<IPaginated<IProduct>> => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
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
