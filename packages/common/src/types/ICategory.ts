import { IProduct } from "./IProduct";
import { IImage } from "./IImage";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image?: IImage;
  products: IProduct[];
}

export interface ICategoryCreate {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export interface ICategoryCreate {}
