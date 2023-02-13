import { useQuery } from "react-query";
import { IProduct } from "common";
import ProductModule from "../modules/product.module";

const useProduct = (slug: string) =>
  useQuery<IProduct>("product" + slug, () =>
    ProductModule.get(slug)
  );

export default useProduct;
