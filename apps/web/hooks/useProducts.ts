import { QueryKey, UseQueryOptions, useQuery } from "react-query";
import queryString from "query-string";
import { IProduct, IPaginated, IProductParams } from "common";
import ProductModule from "../modules/product.module";

const useProducts = (
  page = 1,
  limit = 100,
  options: IProductParams = {},
  query?: Omit<
    UseQueryOptions<
      IPaginated<IProduct>,
      unknown,
      IPaginated<IProduct>,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  const params = queryString.stringify(options);
  return useQuery<IPaginated<IProduct>>(
    "products" + params.toString(),
    () =>
      ProductModule.list(page, limit, {
        ...options,
      }),
    query
  );
};

export default useProducts;
