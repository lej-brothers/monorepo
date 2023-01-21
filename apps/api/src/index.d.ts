import { IOrderDocument } from "./model/order.model";

declare global {
  namespace Express {
    interface Request {
      order?: IOrderDocument;
    }
  }
}

export {};
