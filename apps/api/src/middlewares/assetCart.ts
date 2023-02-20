import { Request, Response, NextFunction } from "express";
import CartService from "../services/cart.service";

const assetCart = async (req: Request, res: Response, next: NextFunction) => {
  const cart = await CartService.get(req.sessionID);
  (req.session as any).cart = cart._id;
  next();
};

export default assetCart;
