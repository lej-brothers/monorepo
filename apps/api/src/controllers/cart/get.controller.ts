import { Request, Response } from "express";
import CartService from "../../services/cart.service";

const controller = async (req: Request, res: Response) => {
  const cart = await CartService.get(req.sessionID);
  res.send(cart);
};

export default { controller };
