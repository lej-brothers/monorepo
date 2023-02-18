import MomoService from "../../services/momo.service";
import { Request, Response } from "express";

const controller = async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await MomoService.create(payload);

  res.send(data);
};

export default { controller };
