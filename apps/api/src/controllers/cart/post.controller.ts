import { Request, Response } from "express";
import CartService from "../../services/cart.service";

const validations: any = [];

const controller = async (req: Request, res: Response) => {
  const updated = await CartService.update(req.body);
  res.send(updated);
};

export default { validations, controller };
