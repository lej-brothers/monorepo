import { AxiosResponse } from "axios";
import { IMomoCreateResponse, IOrder, IOrderDeliveryInfo } from "common";
import requester from "../configs/requester";

const OrderService = {
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
