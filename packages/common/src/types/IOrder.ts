import { IMomo } from "./IMomo";
import { ORDER_STATUS } from "../constants/ORDER_STATUS";
import { ICart } from "./ICart";
import { PAYMENT_METHOD } from "../..";

export interface IOrder {
  _id: string;
  /**
   * Short ID for this order
   */
  code: string;

  /**
   * An Instance of Cart at the time created this order
   */

  cart: ICart;

  /**
   * Status of the Order ()
   *
   * @type {ORDER_STATUS}
   * @memberof IOrder
   */
  status: ORDER_STATUS;

  /**
   *
   */
  method: PAYMENT_METHOD;

  /**
   * Delivery Info
   */

  deliveryInfo: IOrderDeliveryInfo;

  /**
   * Either user paid for this order or not
   *
   * @type {boolean}
   * @memberof IOrder
   */
  isPaid?: boolean;

  /**
   * Total Amount of VND to complete this Order
   */
  totalAmount: number;

  momo: IMomo;

  createdAt: string;
  updatedAt: string;

}

export interface IOrderDeliveryInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export type IOrderParams = Partial<Pick<IOrder, "code"> & {}>;
