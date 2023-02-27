import { IOrder } from "./IOrder";

export interface IMomo {
  _id: string;
  order: IOrder;
  transId: string;
  amount: number;
  currency: string;
  userInfo: IMomoUserInfo;
  deliveryInfo: IMomoDeliveryInfo;
}

export interface IMomoCreate {
  order: string;
  transId?: string;
  amount: number;
  currency: string;
}

export interface IMomoItem {
  id: string;
  name: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  manufacturer?: string;
  price: number;
  currency: "VND";
  quantity: number;
  unit?: string;
  totalPrice: number;
  taxAmount?: string;
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

export interface IMomoCreatePayload {
  partnerCode: string;
  partnerName: string;
  storeId?: string;
  requestId: string; // Order_id
  amount: number;
  orderId: string;
  orderInfo: string;
  orderGroupId?: string;
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

export type IMomoForm = Pick<IMomoCreatePayload, "deliveryInfo" | "userInfo">;

export interface IMomoCreateResponse {
  partnerCode: string;
  requestId: string;
  orderId: string;
  amount: number;
  responseTime: number;
  message: string;
  resultCode: string;
  payUrl: string;
  deeplink: string;
  qrCodeUrl: string;
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
  resultCode: number;
  message: string;
  payType: string;
  responseTime: string;
  extraData: string;
  signature: string;
}

export interface IMomoIPNResponse {
  status: number;
  message: string;
  amount: number;
  partnerRefId: string;
  momoTransId: string;
  signature: string;
}

export interface MomoCreateProps {
  userInfo: IMomoUserInfo;
  deliveryInfo: IMomoDeliveryInfo;
}
