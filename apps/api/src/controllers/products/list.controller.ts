import { Request, Response } from "express";
import { param } from "express-validator";

import ProductService from "../../services/product.service";

const validations = [param("page"), param("limit")];

const controller = async (req: Request, res: Response) => {
  const { page, limit, categories, title } = req.query;

  if (categories) {
    const dataByCategory = await ProductService.listByCategory(
      { page: Number(page), limit: Number(limit) || 20 },
      (categories as string).split(",")
    );
    return res.send(dataByCategory);
  }

  let query: any = {};

  if (title) query.title = new RegExp("^" + title);

  const data = await ProductService.list(query, {
    page: Number(page),
    limit: Number(limit) || 20,
  });
  
  res.send(data);
};

export default { validations, controller };
