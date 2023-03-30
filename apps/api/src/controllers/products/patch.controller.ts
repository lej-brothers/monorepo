import { Request, Response } from "express";
import { param } from "express-validator";

import ProductService from "../../services/product.service";

const validations = [param("id").isMongoId()];

const controller = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.update({
    _id: id,
    ...req.body,
  });
  res.send(product);
};

export default { validations, controller };
