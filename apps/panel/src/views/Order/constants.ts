import { DefaultOptionType } from "antd/es/select";
import { ORDER_STATUS } from "common";

export const STATUS_OPTIONS: DefaultOptionType[] = [
  {
    label: "Đợi giao hàng",
    value: ORDER_STATUS.Confirmed,
  },
  {
    label: "Sẵn sàng để giao",
    value: ORDER_STATUS.ReadyToDelivery,
  },
  {
    label: "Đã giao hàng",
    value: ORDER_STATUS.Delivery,
  },
];


export enum ORDER_MODAL {
  NONE = 0,
  PRODUCT_PREVIEW = 1,
}