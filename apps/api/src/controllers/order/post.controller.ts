import { Request, Response } from "express";
import OrderService from "../../services/order.service";

const validations: any = [];

const controller = async (req: Request, res: Response) => {
  const updated = await OrderService.update(req.body);
  res.send(updated);
};

export default { validations, controller };
