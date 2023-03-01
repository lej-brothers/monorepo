import { Request, Response } from "express";
import CartService from "../../services/cart.service";
import { ICartCreate } from "common";

const validations: any = [];

const controller = async (req: Request, res: Response) => {
  const payload: ICartCreate = req.body
  const updated = await CartService.update(payload);
  res.send(updated);
};

export default { validations, controller };
