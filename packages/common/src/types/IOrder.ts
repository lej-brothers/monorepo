import { ORDER_STATUS } from "../constants/ORDER_STATUS";
import { IProduct } from "./IProduct";
import { IPromotion } from "./IPromotion";

export interface IOrder {
  _id?: string;

  /**
   * Session which created this order.
   * Note: this is not a reference, but value we put here in the moment when creating an Order.
   * This is needed because we don't want to allow user to
   * change this data in his profile later so it effects user orders
   *
   * @type {IOrder}
   * @memberof IOrder
   */
  sessionId: string;

  /**
   * Same as for user, it's not a reference but copy of data about products
   *
   * @type {IOrderProductCreateObject[]}
   * @memberof IOrder
   */
  products: IProduct[];

  /**
   * Status of the Order ()
   *
   * @type {ORDER_STATUS}
   * @memberof IOrder
   */
  status?: ORDER_STATUS;

  /**
   * Either user paid for this order or not
   *
   * @type {boolean}
   * @memberof IOrder
   */
  isPaid?: boolean;

  /**
   * Promotions applied into this order
   */
  promotions: IPromotion[];
}
