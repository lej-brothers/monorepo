import { useMutation, useQuery } from "react-query";
import { IProductCreate, IProductParams } from "common";
import ProductServcie from "../services/product.service";

const ProductQuery = {
  useList: (page: number = 1, limit: number = 100, params: IProductParams) => {
    return useQuery(
      ["products", page, limit, params.title, params.categories],
      async () => {
        try {
          const res = await ProductServcie.list(page, limit, params);
          return res.data;
        } catch (error) {
          return Promise.reject(error);
        }
      }
    );
  },

  useProduct: (handle?: string, options: any = {}) => {
    return useQuery(
      ["product", handle],
      async () => {
        try {
          if (!handle) return null;
          const res = await ProductServcie.get(handle);
          return res.data;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      { ...options }
    );
  },

  useProductOptions: (page: number = 1, limit: number = 100) => {
    return useQuery(["productOptions", page, limit], async () => {
      try {
        const res = await ProductServcie.options(page, limit);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  },

  useCreateProduct: () => {
    return useMutation("create-product", async (payload: IProductCreate) => {
      try {
        const res = await ProductServcie.create(payload);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  },

  useUpdateProduct: () => {
    return useMutation("update-product", async (payload: IProductCreate) => {
      try {
        const res = await ProductServcie.update(payload);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  },
};

export default ProductQuery;
