import { IProduct } from "./IProduct";

export interface IWarehourse {
  _id?: string;
  /**
   * Price of product
   *
   * It is especially true, when prices go down/up in some warehouses more quickly compared to others, etc.
   *
   * @type {number}
   * @memberof IWarehourse
   */
  price: number;

  initialPrice: number;

  /**
   * How many products (qty)
   *
   * @type {number}
   * @memberof IWarehourse
   */
  count?: number;

  /**
   * How many products are sold
   *
   * @type {number}
   * @memberof IWarehourse
   */
  soldCount?: number;

  /**
   * Is product aviavable
   *
   * @type {boolean}
   * @memberof IWarehourse
   */
  isProductAvailable?: boolean;

  /**
   * Point to Product
   *
   * @type {IProduct}
   * @memberof IWarehourse
   */
  product: IProduct;
}

export interface IWarehourseCreate {
  price: number;
  count: number;
}