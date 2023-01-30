import { ICategoryCreate } from "common";
import requester from "../utils/requester";

const CategoryModule = {
  list: async (page: number, limit: number) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const category = await requester.get("/categories", { params });
    return category.data;
  },

  create: async (payload: ICategoryCreate) => {
    const category = await requester.post("/categories", payload);
    return category.data;
  },
};

export default CategoryModule;
