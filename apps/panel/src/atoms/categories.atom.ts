import { selector } from "recoil";
import CategoryModule from "../services/category";

const categoryQuery = selector({
  key: "categoryQuery",
  get: async () => {
    const response = await CategoryModule.list(1, 100);
    return response;
  },
});

export default categoryQuery;
