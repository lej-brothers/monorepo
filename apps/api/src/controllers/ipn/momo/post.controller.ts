import { IMomoIPNPayload, IMomoIPNResponse } from "common";
import { Request, Response } from "express";
import MomoService from "../../../services/momo.service";
import OrderService from "../../../services/order.service";
import MailService from "../../../services/mail.service";
import PromotionService from "../../../services/promotion.service";

const controller = async (req: Request, res: Response) => {
  const payload = req.body as IMomoIPNPayload;
  const success = await MomoService.IPN(payload);
  if (!success) return res.status(400).send();

  const order = await OrderService.getById(payload.orderId);

  /** CHECK PROMOTION */
  const promises = order.cart.promotions.map(async (promotion) => {
    const doc = await PromotionService.getByCode(promotion.code);
    doc.purchasesCount = (doc.purchasesCount || 0) + 1;
    await doc.save();
  });

  await Promise.all(promises);

  /** SEND EMAILS */
  await MailService.order(order);

  return res.status(204).send();
};

export default { controller };
