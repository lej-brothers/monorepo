import { ORDER_STATUS, PAYMENT_METHOD } from "common";
import { Request, Response } from "express";
import { body } from "express-validator";
import CartService from "../../../services/cart.service";
import MomoService from "../../../services/momo.service";
import OrderService from "../../../services/order.service";

const validations: any = [body("deliveryInfo")];

const controller = async (req: Request, res: Response) => {
  const { deliveryInfo } = req.body;
  const cart = await CartService.get(req.sessionID);

  const totalAmount = cart.products.reduce(
    (pre, cur) => pre + cur.afterPrice * cur.quantity,
    0
  );

  const order = await OrderService.create({
    cart: cart.toJSON(),
    status: ORDER_STATUS.Draft,
    method: PAYMENT_METHOD.MOMO,
    deliveryInfo,
    totalAmount,
  });

  const response = await MomoService.create(order, cart);
  if (!response) return res.status(504).send();

  await CartService.clean(req.sessionID);
  res.send(response);
};

export default { validations, controller };
