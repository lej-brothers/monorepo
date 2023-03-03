import { Request, Response } from "express";
import CartService from "../../services/cart.service";
import MailService from "../../services/mail.service";
import OrderService from "../../services/order.service";

const controller = async (req: Request, res: Response) => {
  const cart = await CartService.get(req.sessionID);

  const order = await OrderService.getById('63f2f4d5550cc19751df171c');
  MailService.order(order)

  res.send(cart);
};

export default { controller };
