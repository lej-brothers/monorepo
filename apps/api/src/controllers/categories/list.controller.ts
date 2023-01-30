import { Request, Response } from "express";
import { param } from "express-validator";
import CategoryService from "../../services/category.service";

const validations = [param("page"), param("limit")];

const controller = async (req: Request, res: Response) => {
  const { page, limit } = req.params;
  const data = await CategoryService.list({
    page: Number(page),
    limit: Number(limit) || 20,
  });
  res.send(data);
};

export default { validations, controller };
