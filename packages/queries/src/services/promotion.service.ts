import { AxiosResponse } from "axios";
import { IPaginated, IPromotion, IPromotionCreate } from "common";
import requester from "../configs/requester";

const PromotionService = {
  list: async (page: number, limit: number) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const res = await requester.get("/promotions", { params });
    return res as AxiosResponse<IPaginated<IPromotion>>;
  },

  create: async (product: IPromotionCreate) => {
    const res = await requester.post("/promotions", product);
    return res as AxiosResponse<IPromotion>;
  },
};

export default PromotionService;
