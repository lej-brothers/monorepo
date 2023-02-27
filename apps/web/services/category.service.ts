import { AxiosResponse } from "axios";
import { ICategory, ICategoryCreate, IPaginated } from "common";
import requester from "../configs/requester";

const CategoryService = {
  list: async (page: number, limit: number) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const category = await requester.get("/categories", { params });
    return category as AxiosResponse<IPaginated<ICategory>>;
  },

  create: async (payload: ICategoryCreate) => {
    const category = await requester.post("/categories", payload);
    return category as AxiosResponse<ICategory>;
  },
};

export default CategoryService;
