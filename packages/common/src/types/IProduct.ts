import { ICategory } from "./ICategory";
import { IImage } from "./IImage";
import { IWarehourse, IWarehourseCreate} from "./IWarehouse";

export type IProduct = {
  _id?: string;
  slug: string;
  title: string;
  images: IImage[];
  details?: string;
  description: string;
  categories: ICategory[];
  warehourse: IWarehourse;
  isMetch: boolean;
};

export type IProductCreate = {
  _id?: string;
  slug: string;
  title: string;
  images: string[];
  details?: string;
  description: string;
  categories: string[];
  warehourse: Omit<IWarehourse, "product">;
  isMetch: boolean;
} & IWarehourseCreate;

export interface IProductImage {
  url: string;
  width: number;
  height: number;
  orientation: number;
}
