import { Request, Response } from "express";

import PromotionService from "../../services/promotion.service";

const validations: any[] = [];

const controller = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await PromotionService.update(id, req.body);
  res.send(category);
};

export default { validations, controller };
