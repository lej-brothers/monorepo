import { AxiosResponse } from "axios";
import { IOrder } from "common";
import requester from "../utils/requester";

const OrderService = {
  get: async (id: string) => {
    const response = await requester.get(`/orders/${id}`);
    return response as AxiosResponse<IOrder>;
  },
  update: async (id: string, update: Partial<IOrder>) => {
    const response = await requester.patch(`/orders/${id}`, update);
    return response as AxiosResponse<IOrder>;
  },
};

export default OrderService;
