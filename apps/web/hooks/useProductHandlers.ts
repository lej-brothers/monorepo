import { QueryKey, UseQueryOptions, useQuery } from "react-query";
import queryString from "query-string";
import { IProduct, IPaginated, IProductParams } from "common";
import ProductModule from "../modules/product.module";

const useProducts = () => {
  return useQuery<IPaginated<IProduct>>("products/handlers", () =>
    ProductModule.handles()
  );
};

export default useProducts;
