import { Request, Response } from "express";
import { param } from "express-validator";

import ProductService from "../../services/product.service";
import CategoryService from "../../services/category.service";

const validations = [param("page"), param("limit")];

const controller = async (req: Request, res: Response) => {
  const { page, limit, categories, isHighlight, title } = req.query;

  let query: any = {};

  if (title) query.title = { "$regex": title, "$options": "i" };
  if (isHighlight) query.isHighlight = true;

  if (categories) {
    let ids: string[] = [];
    const slugs = (categories as string).split(",");
    const promises = slugs.map(async (slug) => {
      const category = await CategoryService.getBySlug(slug);
      if (!category) return null;

      ids.push(String(category._id));
    });

    await Promise.all(promises);

    query.categories = { $in: ids };
  }

  const data = await ProductService.list(query, {
    page: Number(page),
    limit: Number(limit) || 20,
  });

  res.send(data);
};

export default { validations, controller };
