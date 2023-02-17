import { IOrder } from "./IOrder";

export interface IMomo {
  _id: string;
  order: IOrder;

  momoTransId: string;
}

export interface IMomoItem {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  manufacturer: string;
  price: number;
  currency: "VND";
  quantity: number;
  unit: string;
  totalPrice: string;
  taxAmount: string;
}

export interface IMomoDeliveryInfo {
  deliveryAddress: string;
  deliveryFee: string;
  quantity: string;
}

export interface IMomoUserInfo {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface IMomoCreate {
  partnerCode: string;
  partnerName: string;
  storeId?: string;
  requestId: string; // Order_id
  amount: number;
  orderId: string;
  orderInfo: string;
  orderGroupId: string;
  redirectUrl: string;
  ipnUrl: string; // server
  requestType: "captureWallet";
  extraData: string;
  items: IMomoItem[];
  deliveryInfo: IMomoDeliveryInfo;
  userInfo: IMomoUserInfo;
  autoCapture?: boolean;
  lang: "vi" | "en";
  signature: string;
}

export interface IMomoIPNPayload {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: string;
  orderInfo: string;
  partnerUserId: string;
  orderType: "momo_wallet";
  transId: string;
  resultCode: string;
  message: string;
  payType: string;
  responseTime: string;
  extraData: string;
  signature: string;
}
