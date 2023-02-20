import { ORDER_STATUS, PAYMENT_METHOD } from "common";
import { Request, Response } from "express";
import { body } from "express-validator";
import CartService from "../../../services/cart.service";
import MomoService from "../../../services/momo.service";
import ProductService from "../../../services/product.service";
import OrderService from "services/order.service";

const validations: any = [body("deliveryInfo")];

const controller = async (req: Request, res: Response) => {
  const { deliveryInfo } = req.body;
  const cart = await CartService.get(req.sessionID);

  const order = await OrderService.create({
    cart: cart.toJSON(),
    status: ORDER_STATUS.Draft,
    method: PAYMENT_METHOD.MOMO,
    deliveryInfo,
  });

  const response = await MomoService.create(order, cart, deliveryInfo);
  return response;
};

export default { validations, controller };
