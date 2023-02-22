import { customAlphabet } from "nanoid";
import { IOrder, ORDER_STATUS } from "common";
import { IOrderDocument, Order } from "../model/order.model";

import { ALPHABET } from "../constants/alphabet";

const nanoid = customAlphabet(ALPHABET, 12);

const OrderService = {
  async get(id: string) {
    const order = await Order.findOne({ _id: id });
    if (!order) return null;
    return order;
  },
  async getByCode(code: string) {
    const order = await Order.findOne({ code }).populate("momo");
    return order;
  },
  async getById(orderId: string) {
    const order = await Order.findById(orderId).populate("momo");
    return order as any as IOrderDocument;
  },
  async update(order: IOrder) {
    const updated = await Order.findOneAndUpdate(
      { _id: order._id },
      order
    ).populate("momo");
    return updated;
  },
  async create(payload: Partial<IOrder>) {
    const order = await Order.create({
      ...payload,
      code: nanoid(),
    });
    return order;
  },

  async addPromotion(sid: string, promotionId: string) {},
  async removePromotion(sid: string, promotionId: string) {},
};

export default OrderService;
