import { Router } from "express";

import GetController from "./get.controller";

import momoRouter from "./momo/_.router";

const router = Router();

router.get("/:id", GetController.controller);

router.use("/momo", momoRouter);

export default router;
