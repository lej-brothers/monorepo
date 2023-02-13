import { Request, Response } from "express";
import { param } from "express-validator";
import ProductService from "../../services/product.service";

const validations = [param("slug")];

const controller = async (req: Request, res: Response) => {
  const product = await ProductService.getBySlug(req.params["slug"]);
  if (!product) return res.status(404).json({ error: "Product Not Found" });
  res.send(product);
};

export default { validations, controller };
