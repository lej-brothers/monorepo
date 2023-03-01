import { AxiosResponse } from "axios";
import queryString from "query-string";
import {
  IMomoCreateResponse,
  IOrder,
  IOrderDeliveryInfo,
  IOrderParams,
  IPaginated,
} from "common";
import requester from "../configs/requester";

const OrderService = {
  list: async (page: number, limit: number, options: IOrderParams = {}) => {
    const params = queryString.stringify({
      page: String(page),
      limit: String(limit),
      ...options,
    });

    const res = await requester.get(params ? `/orders?${params}` : "/products");
    return res as AxiosResponse<IPaginated<IOrder>>;
  },
  get: async (id: string) => {
    const response = await requester.get(`/orders/${id}`);
    return response as AxiosResponse<IOrder>;
  },
  update: async (payload: IOrder) => {
    const response = await requester.patch(`/orders/${payload._id}`, payload);
    return response as AxiosResponse<IOrder>;
  },
  momo: async (deliveryInfo: IOrderDeliveryInfo) => {
    const response = await requester.post("/orders/momo", { deliveryInfo });
    return response as AxiosResponse<IMomoCreateResponse>;
  },
};

export default OrderService;
