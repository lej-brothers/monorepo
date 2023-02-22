import { IMomoCreateResponse, IOrder, IOrderDeliveryInfo } from "common";
import requester from "../configs/requester";

const OrderModule = {
  get: async (id: string) => {
    const response = await requester.get(`/orders/${id}`);
    return response.data as IOrder;
  },
  momo: async (deliveryInfo: IOrderDeliveryInfo) => {
    const response = await requester.post("/orders/momo", { deliveryInfo });
    return response.data as IMomoCreateResponse;
  },
};

export default OrderModule;
