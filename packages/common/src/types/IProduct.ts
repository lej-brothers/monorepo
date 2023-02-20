import { ICategory } from "./ICategory";
import { IImage } from "./IImage";
import { IWarehourse, IWarehourseCreate } from "./IWarehouse";

export type IProduct = {
  _id?: string;
  slug: string;
  title: string;
  images: IImage[];
  details?: string;
  description: string;
  categories: ICategory[];
  warehourse: IWarehourse;
  isHighlight: boolean;
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
  isHighlight: boolean;
  isMetch: boolean;
} & IWarehourseCreate;


export type IProductParams = Partial<
  Pick<IProductCreate, "isMetch" | "isHighlight"> & { categories: string }
>;
