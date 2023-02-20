import {
  FE_HOST,
  HOST,
  MOMO_ACCESS_KEY,
  MOMO_PARTNER_CODE,
  MOMO_SECRET_KEY,
} from "./../configs/secrets";
import {
  ICart,
  ICartProduct,
  IMomoCreate,
  IMomoCreatePayload,
  IMomoCreateResponse,
  IMomoIPNPayload,
  IMomoItem,
  IOrder,
  IOrderDeliveryInfo,
  IProduct,
  ORDER_STATUS,
  PAYMENT_METHOD,
} from "common";
import { Momo } from "../model/momo.model";
import { Order } from "../model/order.model";
import OrderService from "./order.service";
import hmac from "../utils/hmac";
import { momoRequester } from "../configs/requester";
import ProductService from "./product.service";

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

    (order as any).momo = (momo as any)._id;
    console.log(order, momo);
    await order.save();
    return momo;
  },

  create: async (order: IOrder, cart: ICart) => {
    /** Setup Payload */
    const products: Array<IProduct & ICartProduct> = await Promise.all(
      cart.products.map(async ({ _id, ...rest }) => {
        const product = await ProductService.get(_id);
        return { ...product.toJSON(), ...rest, _id } as any;
      })
    );

    const items: IMomoItem[] = products.map((product) => ({
      id: String(product._id),
      name: product.title,
      description: product.description,
      category: product.categories
        ?.map((category: any) => category.slug)
        .join(","),
      price: product.price,
      currency: "VND",
      quantity: product.quantity,
      totalPrice: product.price * product.quantity,
      imageUrl: product.images[0].url,
    }));

    const amount = items.reduce((pre, cur) => {
      return pre + Number(cur.totalPrice);
    }, 0);

    /**
     * Setup Order
     */

    /**
     * Setup Signature Payload
     */

    const params = new URLSearchParams();

    params.set("accessKey", MOMO_ACCESS_KEY);
    params.set("amount", String(amount));
    params.set("extraData", "");
    params.set("ipnUrl", `${HOST}/ipn/momo`);
    params.set("orderId", String(order._id));
    params.set("orderInfo", String(order._id));
    params.set("partnerCode", MOMO_PARTNER_CODE);
    params.set("redirectUrl", `${FE_HOST}?orderID=${String(order._id)}`);
    params.set("requestId", String(order._id));
    params.set("requestType", "captureWallet");

    params.sort();

    const rawSignature =
      "accessKey=" +
      MOMO_ACCESS_KEY +
      "&amount=" +
      String(amount) +
      "&extraData=" +
      "&ipnUrl=" +
      `${HOST}/ipn/momo` +
      "&orderId=" +
      String(order._id) +
      "&orderInfo=" +
      String(order._id) +
      "&partnerCode=" +
      MOMO_PARTNER_CODE +
      "&redirectUrl=" +
      `${FE_HOST}?orderID=${String(order._id)}` +
      "&requestId=" +
      String(order._id) +
      "&requestType=" +
      "captureWallet";

    /**
     * Encrypt with SHA256 standard using MOMO_SECRET_KEY
     */

    const signature = hmac(MOMO_SECRET_KEY, rawSignature);

    /**
     * Request response from MOMO Create API
     */

    const data: Partial<IMomoCreatePayload> = {
      partnerCode: MOMO_PARTNER_CODE,
      partnerName: "LeJ'Cafe",
      requestType: "captureWallet",
      requestId: String(order._id),
      orderId: String(order._id),
      orderInfo: String(order._id),
      redirectUrl: `${FE_HOST}?orderID=${String(order._id)}`,
      ipnUrl: `${HOST}/ipn/momo`,
      lang: "en",
      extraData: "",
      signature,
      amount,
      items,
    };

    const response = await momoRequester.post("/create", data, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status !== 200) return null;

    const _ = await MomoService.init({
      order: String(order._id),
      amount: amount,
      currency: "VND",
    });

    /**
     * Save changes to database
     */

    return response.data as IMomoCreateResponse;
  },

  IPN: async (payload: IMomoIPNPayload) => {
    const order = await OrderService.getById(payload.orderId);
    if (!order) return false;
    if (payload.resultCode !== 0) {
      order.status = ORDER_STATUS.Cancelled;
      await order.save();
      return false;
    }

    // Change paid status
    order.isPaid = true;
    order.status = ORDER_STATUS.Confirmed;

    // Save changes
    await order.save();
    return true;
  },
};

export default MomoService;
