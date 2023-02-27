import { Request, Response } from "express";
import { param } from "express-validator";
import OrderService from "../../services/order.service";

const validations = [param("page"), param("limit")];

const controller = async (req: Request, res: Response) => {
  const { page, limit } = req.params;

  const data = await OrderService.list({
    page: Number(page),
    limit: Number(limit) || 20,
  });

  res.send(data);
};

export default { validations, controller };
