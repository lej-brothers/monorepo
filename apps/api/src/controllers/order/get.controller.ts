import { Request, Response } from "express";
import OrderService from "../../services/order.service";

const controller = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderService.get(id);
  if (!order) return res.status(404).send();
  res.send(order);
};

export default { controller };
