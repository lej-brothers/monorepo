import { ICategoryCreate } from "common";
import requester from "../utils/requester";

const CategoryModule = {
  create: async (payload: ICategoryCreate) => {
    const category = await requester.post("/categories", payload);
    return category;
  },
};

export default CategoryModule;
