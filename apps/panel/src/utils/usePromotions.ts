import { useQuery } from "react-query";
import { IPromotion, IPaginated } from "common";
import PromotionModule from "../services/promotion";

const usePromotions = (page = 1, limit = 100) =>
  useQuery<IPaginated<IPromotion>>("promotions", () =>
    PromotionModule.list(page, limit)
  );

export default usePromotions;
