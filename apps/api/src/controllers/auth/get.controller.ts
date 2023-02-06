import { Request, Response } from "express";
import { body } from "express-validator";

const validations = [body("token")];

const controller = async (req: Request, res: Response) => {
  res.send(req.isAuthenticated());
};

export default { validations, controller };
