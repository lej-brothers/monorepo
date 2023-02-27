import { useQuery } from "react-query";
import { IProduct, IPaginated } from "common";
import ProductModule from "../services/product";

const useProductOptions = (page = 1, limit = 1000) =>
  useQuery<IPaginated<IProduct>>("products", () =>
    ProductModule.options(page, limit)
  );

export default useProductOptions;
