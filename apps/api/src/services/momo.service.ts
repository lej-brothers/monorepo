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
import { IOrderDocument, Order } from "../model/order.model";
import OrderService from "./order.service";
import hmac from "../utils/hmac";
import { momoRequester } from "../configs/requester";

const MomoService = {
  init: async (payload: IMomoCreate) => {
    const momo = await Momo.findOneAndUpdate({
      order: payload.order,
      transId: payload.transId,
      amount: payload.amount,
      currency: payload.currency,
    }, { upsert: true });

    const order = await Order.findById(payload.order);
    if (!order) return false;

    (order as any).momo = (momo as any)._id;
    await order.save();
    return momo;
  },

  create: async (
    payload: Omit<IMomoCreatePayload, "ipnUrl" | "redirectUrl" | "signature">
  ) => {
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
    params.set("requestId", payload.requestId);
    params.set("requestType", "captureWallet");

    params.sort();

    const rawSignature =
      "accessKey=" +
      MOMO_ACCESS_KEY +
      "&amount=" +
      String(payload.amount) +
      "&extraData=" +
      "&ipnUrl=" +
      `${HOST}/ipn/momo` +
      "&orderId=" +
      payload.orderId +
      "&orderInfo=" +
      payload.orderId +
      "&partnerCode=" +
      MOMO_PARTNER_CODE +
      "&redirectUrl=" +
      `${FE_HOST}?orderID=${payload.orderId}` +
      "&requestId=" +
      payload.requestId +
      "&requestType=" +
      payload.requestType;

    /**
     * Encrypt with SHA256 standard using MOMO_SECRET_KEY
     */

    const signature = hmac(MOMO_SECRET_KEY, rawSignature);

    /**
     * Request response from MOMO Create API
     */

    const data = {
      redirectUrl: `${FE_HOST}?orderID=${payload.orderId}`,
      ipnUrl: `${HOST}/ipn/momo`,
      ...payload,
      signature,
    };

    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    const response = await momoRequester.post("/create", data, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("--------------------RESPONSE----------------");
    console.log(response.data);

    if (response.status !== 200) return null;

    const _ = await MomoService.init({
      order: payload.orderId,
      amount: Number(payload.amount),
      currency: "VND",
    });

    /**
     * Save changes to database
     */

    const order = await OrderService.getById(payload.orderId);

    order.deliveryInfo = {
      name: payload.userInfo.name,
      email: payload.userInfo.email,
      phone: payload.userInfo.phoneNumber,
      address: payload.deliveryInfo.deliveryAddress,
    };

    return response.data as IMomoCreateResponse;
  },

  IPN: async (payload: IMomoIPNPayload) => {
    const order = await OrderService.getById(payload.orderId);
    if (!order) return false;
    if (payload.resultCode !== 0) return false;

    // Change paid status
    order.isPaid = true;
    order.status = ORDER_STATUS.Confirmed;

    // Save changes
    await order.save();
    return true;
  },
};

export default MomoService;
