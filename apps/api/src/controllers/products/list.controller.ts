import { Request, Response } from "express";
import { param } from "express-validator";

import ProductService from "../../services/product.service";

const validations = [param("page"), param("limit")];

const controller = async (req: Request, res: Response) => {
  const { page, limit, type } = req.params;

  const optionSelector =
    type === "option"
      ? {
          fields: {
            _id: 1,
            title: 1,
            description: 1,
            images: 1,
            slug: 1,
          },
        }
      : {};

  const data = await ProductService.list({
    page: Number(page),
    limit: Number(limit) || 20,
    ...optionSelector,
  });
  res.send(data);
};

export default { validations, controller };
