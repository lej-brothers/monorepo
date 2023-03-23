import { Request, Response } from "express";
import { param } from "express-validator";
import OrderService from "../../services/order.service";
import { ORDER_STATUS } from "common";

const validations = [param("page"), param("limit")];

const controller = async (req: Request, res: Response) => {
  const { page, limit } = req.params;

  const data = await OrderService.list(
    {
      status: { $in: [ORDER_STATUS.Confirmed, ORDER_STATUS.Delivery, ORDER_STATUS.ReadyToDelivery] },
    },
    {
      page: Number(page),
      limit: Number(limit) || 20,
    }
  );

  res.send(data);
};

export default { validations, controller };
