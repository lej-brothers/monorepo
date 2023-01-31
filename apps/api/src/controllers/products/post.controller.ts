import { Request, Response } from "express";
import { body } from "express-validator";

import ProductService from "../../services/product.service";
import slug from "slug";

const validations = [
  body("title").isString(),
  body("details").isString(),
  body("description").isString(),
  body("categories").isArray().isMongoId(),
  body("images"),
];

const controller = async (req: Request, res: Response) => {
  const payloads = req.body;
  payloads.slug = slug(payloads.title);
  const duplicated = await ProductService.getBySlug(payloads.slug);
  if (duplicated) return res.status(400).json({ error: "Product Duplicated" });
  const product = await ProductService.create(payloads);
  res.send(product.toJSON());
};

export default { validations, controller };
