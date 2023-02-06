import { Request, Response } from "express";
import { param } from "express-validator";
import PromotionService from "../../services/promotion.service";

const validations = [param("id")];

const controller = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await PromotionService.get(id);
  res.send(data);
};

export default { validations, controller };
