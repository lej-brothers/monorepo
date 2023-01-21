import { Request, Response, NextFunction } from "express";
import OrderService from "services/order.service";

const assetOrder = async (req: Request, _: Response, next: NextFunction) => {
  await OrderService.get(req.sessionID);
  next();
};

export default assetOrder;
