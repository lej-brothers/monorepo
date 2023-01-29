import { ICategory } from "./ICategory";
import { IWarehourse } from "./IWarehouse";

export type IProduct = {
  _id?: string;
  slug: string;
  title: string;
  images: IProductImage[];
  details?: string;
  description: string;
  categories: ICategory[];
  warehourse: IWarehourse;
};

export interface IProductImage {
  url: string;
  width: number;
  height: number;
  orientation: number;
}
