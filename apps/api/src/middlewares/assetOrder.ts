import { Request, Response, NextFunction } from "express";
import OrderService from "../services/order.service";

const assetOrder = async (req: Request, res: Response, next: NextFunction) => {
  const order = await OrderService.get(req.sessionID);
  (req.session as any).order = order._id;
  next();
};

export default assetOrder;
