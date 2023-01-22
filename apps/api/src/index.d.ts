import { IOrderDocument } from "./model/order.model";

declare module "express-serve-static-core" {
  export interface Request {
    order?: IOrderDocument;
  }
}
