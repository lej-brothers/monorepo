import { Request, Response, NextFunction } from "express";
import OrderService from "services/order.service";

const assetOrder = async (req: Request, res: Response, next: NextFunction) => {
  await OrderService.get(req.sessionID);
  next();
};

export default assetOrder;
