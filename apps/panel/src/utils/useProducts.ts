import { useQuery } from "react-query";
import { IProduct, IPaginated } from "common";
import ProductModule from "../modules/product";

const useProducts = () =>
  useQuery<IPaginated<IProduct>>("products", () =>
    ProductModule.list(1, 100)
  );

export default useProducts;
