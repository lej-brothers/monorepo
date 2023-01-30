import { Request, Response } from "express";
import { param } from "express-validator";

import CategoryService from "../../services/category.service";

const validations: any[] = [];

const controller = async (req: Request, res: Response) => {
  const category = await CategoryService.create(req.body);
  res.send(category);
};

export default { validations, controller };
