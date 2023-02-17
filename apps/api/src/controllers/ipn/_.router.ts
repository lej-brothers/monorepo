import { Router } from "express";
import MomoRouter from "./momo/_.router";

const router = Router();

router.use("/momo", MomoRouter);

export default router;
