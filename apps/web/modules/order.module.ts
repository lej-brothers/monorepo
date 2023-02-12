import { IOrder } from "common";
import requester from "../configs/requester";

const OrderModule = {
  get: async (): Promise<IOrder> => (await requester.get("/orders")).data,
};

export default OrderModule;
