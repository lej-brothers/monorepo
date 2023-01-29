import { Response, Request, NextFunction } from "express";

export function assetAuthroized(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) return next();
  res.status(400).json({ error: "Authentication Required" });
}
