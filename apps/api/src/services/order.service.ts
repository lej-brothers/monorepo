import { ORDER_STATUS } from "common";
import { Order } from "../model/order.model";

import ProductService from "./product.service";

const OrderService = {
  async get(sessionId: string) {
    const order = await Order.findOne({ sessionId });
    if (!order) return this.create(sessionId);
    return order;
  },
  async create(sessionId: string) {
    const order = await Order.create({
      sessionId,
      status: ORDER_STATUS.Draft,
      isPaid: false,
    });
    return order;
  },
  async addProduct(sid: string, productId: string) {
    const order = await this.get(sid);
    const product = await ProductService.get(productId);
    if (!product) return false;
    order.products.push(product);
    await order.save();
    return true;
  },
  async removeProduct(sid: string, productId: string) {
    const order = await this.get(sid);
    const product = await ProductService.get(productId);
    if (!product) return false;
    order.products.filter((orderProduct) => orderProduct._id !== product._id);
    await order.save();
    return true;
  },
  async addPromotion(sid: string, promotionId: string) {},
  async removePromotion(sid: string, promotionId: string) {},
};

export default OrderService;
