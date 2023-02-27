import { useQuery } from "react-query";
import { IProduct, IPaginated } from "common";
import ProductModule from "../services/product";

const useProducts = (page = 1, limit = 100) =>
  useQuery<IPaginated<IProduct>>("products", () =>
    ProductModule.list(page, limit)
  );

export default useProducts;
