import { IPromotionCreate } from "common";
import { PaginateOptions } from "mongoose";
import { IPromotionDocument, Promotion } from "../model/promotion.model";

const PromotionService = {
  async get(id: string) {
    return Promotion.findById(id);
  },
  async getByCode(code: string) {
    return Promotion.findOne({ code }).populate('products') as any as IPromotionDocument;
  },
  async list(params: PaginateOptions) {
    return Promotion.paginate({}, params);
  },
  async create(payload: IPromotionCreate) {
    const product = await Promotion.create(payload);
    return product;
  },
  async update(id: string, payload: Partial<IPromotionCreate>) {
    return Promotion.findOneAndUpdate({ _id: id }, payload, {
      timestamps: true,
    });
  },
};

export default PromotionService;
