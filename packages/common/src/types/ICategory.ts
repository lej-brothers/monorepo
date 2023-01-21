import { IProduct } from "./IProduct";
import { IImage } from "./IImage";
import { ILocaleMember } from "./ILocale";

export interface ICategory {
  _id: string;
  name: ICategoryName[];
  slug: string;
  description: ICategoryDescription[];
  image?: IImage;
  products: IProduct[];
}

export interface ICategoryName extends ILocaleMember {}

export interface ICategoryDescription extends ILocaleMember {}
