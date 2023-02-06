import { Request, Response } from "express";

import PromotionService from "../../services/promotion.service";

const validations: any[] = [];

const controller = async (req: Request, res: Response) => {
  const category = await PromotionService.create(req.body);
  res.send(category);
};

export default { validations, controller };
