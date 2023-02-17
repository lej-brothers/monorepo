import { IMomoIPNPayload, IMomoIPNResponse } from "common";
import { Request, Response } from "express";
import MomoService from "services/momo.service";

const controller = async (req: Request, res: Response) => {
  const payload = req.body as IMomoIPNPayload;
  const success = await MomoService.IPN(payload);
  if (!success) return res.status(400).send()

  return res.status(204).send()
};

export default { controller };
