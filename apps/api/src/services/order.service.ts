import { IOrder, ORDER_STATUS } from "common";
import { Order } from "../model/order.model";

import ProductService from "./product.service";

const OrderService = {
  async get(sessionId: string) {
    const order = await Order.findOne({ sessionId });
    if (!order) return this.create(sessionId);
    return order;
  },
  async update(order: IOrder) {
    const updated = await Order.findOneAndUpdate({ _id: order._id }, order);
    return updated;
  },
  async create(sessionId: string) {
    const order = await Order.create({
      sessionId,
      status: ORDER_STATUS.Draft,
      isPaid: false,
    });
    return order;
  },

  async addPromotion(sid: string, promotionId: string) {},
  async removePromotion(sid: string, promotionId: string) {},
};

export default OrderService;
