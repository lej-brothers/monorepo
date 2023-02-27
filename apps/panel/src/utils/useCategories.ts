import { useQuery } from "react-query";
import CategoryModule from "../services/category";
import { ICategory, IPaginated } from "common";

const useCategories = () =>
  useQuery<IPaginated<ICategory>>("categories", () =>
    CategoryModule.list(1, 100)
  );

export default useCategories;
