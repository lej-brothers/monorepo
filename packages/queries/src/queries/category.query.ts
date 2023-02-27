import { useMutation, useQuery } from "react-query";
import CategoryService from "../services/category.service";
import { ICategoryCreate } from "common";

const CategoryQuery = {
  /**
   * Query a List of Categories
   * @param page Current Page
   * @param limit How many docs shows per page
   * @returns @type IPaginated<ICategory>
   */
  useList: (page: number = 1, limit: number = 100) => {
    return useQuery(["categories", page, limit], async () => {
      try {
        const res = await CategoryService.list(page, limit);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  },

  useCreate: async () => {
    return useMutation("createCategory", async (payload: ICategoryCreate) => {
      try {
        const res = await CategoryService.create(payload);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  },
};

export default CategoryQuery;
