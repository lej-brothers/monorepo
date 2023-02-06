import { IProduct } from "./IProduct";
import { ICategory } from "./ICategory";

export interface IPromotion {
  _id?: string;
  /**
   * Code for user to input
   *
   * @type {string}
   * @memberof IPromotion
   */
  code: string;

  /**
   * Promotion description locale
   *
   * @type {IPromotionDescription[]}
   * @memberof IPromotion
   */
  description: string;

  /**
   * @type {Date}
   * @memberof IPromotion
   */
  activeFrom: Date;

  /**
   * @type {Date}
   * @memberof IPromotion
   */
  activeTo: Date;

  /**
   * If the value is not null, meaning this will
   * apply for an specific collection, if this and `categories` is null
   * mean this promotion is globally inside store.
   *
   * @type {IProduct[]}
   * @memberof IPromotion
   */
  products?: IProduct[];

  /**
   * If the value is not null, meaning this will
   * apply for an specific collection, if this and `productId` is null
   * mean this promotion is globally inside store.
   *
   * @type {ICategory[]}
   * @memberof IPromotion
   */
  categories?: ICategory[];

  purchasesLimit?: number;

  /**
   * @type {number}
   * @memberof IPromotion
   */
  purchasesCount: number;

  /**
   * If it less than 1, means it percent, others mean exact number
   * @type {number}
   * @memberof IPromotion
   */
  promoPrice: number;
}

export interface IPromotionCreate
  extends Omit<IPromotion, "categories" | "products"> {
  categories: string[];
  products: string[];
}
