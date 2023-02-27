import { Request, Response } from "express";
import OrderService from "../../services/order.service";
import { param } from "express-validator";

const validations = [param("id").isMongoId()];

const controller = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderService.update(id, req.body);
  res.send(order);
};

export default { validations, controller };
