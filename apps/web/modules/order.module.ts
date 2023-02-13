import { IOrder, IOrderProduct } from "common";
import requester from "../configs/requester";

const OrderModule = {
  get: async (): Promise<IOrder> => (await requester.get("/orders")).data,
  update: async (order: IOrder) => {
    const updated = await requester.post("/orders", order);
    return updated.data as IOrder;
  },
};

export default OrderModule;
