import { ICategory } from "./ICategory";
import { ILocaleMember } from "./ILocale";
import { IWarehourse } from "./IWarehouse";

export type IProduct = {
  _id: string;
  slug: string;
  title: IProductTitle[];
  images: IProductImage[];
  details?: IProductDetails[];
  description: IProductDescription[];
  categories: ICategory[];
  warehourse: IWarehourse;
};

export interface IProductImage {
  url: string;
  width: number;
  height: number;
  orientation: number;
}

export interface IProductTitle extends ILocaleMember {}

export interface IProductDetails extends ILocaleMember {}

export interface IProductDescription extends ILocaleMember {}