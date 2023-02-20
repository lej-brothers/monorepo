import { IMomoCreateResponse, IOrderDeliveryInfo } from "common";
import requester from "../configs/requester";

const OrderModule = {
  momo: async (deliveryInfo: IOrderDeliveryInfo) => {
    const response = await requester.post("/orders/momo", { deliveryInfo });
    return response.data as IMomoCreateResponse;
  },
};

export default OrderModule;
