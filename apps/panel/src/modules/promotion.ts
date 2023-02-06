import { IPaginated, IPromotion, IPromotionCreate } from "common";
import requester from "../utils/requester";

const PromotionModule = {
  list: async (
    page: number,
    limit: number
  ): Promise<IPaginated<IPromotion>> => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const res = await requester.get("/promotions", { params });
    return res.data;
  },

  create: async (product: IPromotionCreate): Promise<IPromotion> => {
    const res = await requester.post("/promotions", product);
    return res.data;
  },
};

export default PromotionModule;
