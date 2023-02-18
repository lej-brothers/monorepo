import { Request, Response } from "express";
import { param } from "express-validator";
import ProductService from "../../services/product.service";

const controller = async (req: Request, res: Response) => {
  const handles = await ProductService.getHandlers();
  res.send(handles);
};

export default { controller };
