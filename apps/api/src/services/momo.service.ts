import { IMomoCreate, IMomoIPNPayload, ORDER_STATUS } from "common";
import { Momo } from "../model/momo.model";
import { Order } from "../model/order.model";
import OrderService from "./order.service";

const MomoService = {
  create: async (payload: IMomoCreate) => {
    const momo = await Momo.create({
      order: payload.order,
      transId: payload.transId,
      amount: payload.amount,
      currency: payload.currency,
    });

    const order = await Order.findById(payload.order);
    if (!order) return false;

    (order as any).momo = momo._id;
    await order.save();
    return momo;
  },

  IPN: async (payload: IMomoIPNPayload) => {
    const order = await OrderService.getById(payload.orderId);
    if (!order) return false;
    if (payload.resultCode !== 0) return false;

    const _ = await MomoService.create({
      order: payload.orderId,
      transId: payload.transId,
      amount: Number(payload.amount),
      currency: "VND",
    });

    // Change paid status
    order.isPaid = true;
    order.status = ORDER_STATUS.Confirmed;

    // Save changes
    await order.save();
    return true;
  },
};

export default MomoService;
