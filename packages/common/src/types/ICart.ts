import { IPriceVariant } from './IWarehouse';
import { IProduct } from "./IProduct";
import { IPromotion } from "./IPromotion";

export interface ICart {
  _id: string;

  /**
   * Session which created this order.
   * Note: this is not a reference, but value we put here in the moment when creating an Order.
   * This is needed because we don't want to allow user to
   * change this data in his profile later so it effects user orders
   *
   * @type {ICart}
   * @memberof ICart
   */
  sessionId: string;

  /**
   * Same as for user, it's not a reference but copy of data about products
   *
   * @type {IProduct[]}
   * @memberof ICart
   */
  products: ICartProduct[];

  /**
   * Promotions applied into this order
   */
  promotions: IPromotion[];
}

export interface ICartProduct
  extends Omit<
    IProduct,
    "images" | "categories" | "warehourse" | "isHighlight" | "isMetch"
  > {
  _id: string;
  price: IPriceVariant;
  grind: string;
  afterPrice: number;
  categories: string[];
  quantity: number;
  notes: string;
}

export type ICartCreate = Omit<ICart, 'promotions'> & {
  promotions: string[]
}