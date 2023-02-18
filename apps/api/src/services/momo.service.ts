import {
  FE_HOST,
  HOST,
  MOMO_ACCESS_KEY,
  MOMO_PARTNER_CODE,
  MOMO_SECRET_KEY,
} from "./../configs/secrets";
import {
  IMomoCreate,
  IMomoCreatePayload,
  IMomoCreateResponse,
  IMomoIPNPayload,
  ORDER_STATUS,
} from "common";
import { Momo } from "../model/momo.model";
import { Order } from "../model/order.model";
import OrderService from "./order.service";
import hmac from "../utils/hmac";
import { momoRequester } from "../configs/requester";

const MomoService = {
  init: async (payload: IMomoCreate) => {
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

  create: async (payload: IMomoCreatePayload) => {
    /**
     * Setup Signature Payload
     */

    const params = new URLSearchParams();

    params.set("accessKey", MOMO_ACCESS_KEY);
    params.set("amount", String(payload.amount));
    params.set("extraData", "");
    params.set("ipnUrl", `${HOST}/ipn/momo`);
    params.set("orderId", payload.orderId);
    params.set("orderInfo", payload.orderId);
    params.set("partnerCode", MOMO_PARTNER_CODE);
    params.set("redirectUrl", `${FE_HOST}?orderID=${payload.orderId}`);
    params.set("requestId", payload.orderId);
    params.set("requestType", "captureWallet");

    /**
     * Encrypt with SHA256 standard using MOMO_SECRET_KEY
     */

    const signature = hmac(MOMO_SECRET_KEY, params.toString()).toString();

    /**
     * Request response from MOMO Create API
     */

    const response = await momoRequester.post("/create", {
      ...payload,
      signature,
    });

    return response.data as IMomoCreateResponse;
  },

  IPN: async (payload: IMomoIPNPayload) => {
    const order = await OrderService.getById(payload.orderId);
    if (!order) return false;
    if (payload.resultCode !== 0) return false;

    const _ = await MomoService.init({
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
