import { Request, Response } from "express";
import ProductService from "../../../services/product.service";

const controller = async (req: Request, res: Response) => {
  const { page, limit, title } = req.query;

  const optionSelector = {
    fields: {
      _id: 1,
      title: 1,
      description: 1,
      images: 1,
      slug: 1,
    },
  };

  let query: any = {};

  if (title) query.title = new RegExp("^" + title);

  const data = await ProductService.list(query, {
    page: Number(page),
    limit: Number(limit) || 20,
    ...optionSelector,
  });
  
  res.send(data);
};

export default { controller };
