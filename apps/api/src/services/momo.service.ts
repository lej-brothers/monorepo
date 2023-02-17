import { IMomoIPNPayload } from "common";
import OrderService from "./order.service";

const MomoService = {
  IPN: async (payload: IMomoIPNPayload) => {
    const order = await OrderService.getById(payload.orderId);
    if (!order) return false;

    
  },
};

export default MomoService;
