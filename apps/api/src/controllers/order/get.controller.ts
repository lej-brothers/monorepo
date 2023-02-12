import { Request, Response } from "express";
import OrderService from "../../services/order.service";

const controller = async (req: Request, res: Response) => {
  const order = await OrderService.get(req.session.id);
  res.send(order);
};

export default { controller };
