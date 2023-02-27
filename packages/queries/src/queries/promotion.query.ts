import { useMutation, useQuery } from "react-query";
import PromotionService from "../services/promotion.service";
import { IPromotionCreate } from "common";

const PromotionQuery = {
  useList: (page: number = 1, limit: number = 100) => {
    return useQuery(["promotions", page, limit], async () => {
      try {
        const res = await PromotionService.list(page, limit);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  },

  useCreate: () => {
    return useMutation("promotionCreate", async (payload: IPromotionCreate) => {
      try {
        const res = await PromotionService.create(payload);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  },
};

export default PromotionQuery;
