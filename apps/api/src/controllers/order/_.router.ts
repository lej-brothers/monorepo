import { Router } from "express";

import GetController from "./get.controller";

const router = Router();

router.get("/", GetController.controller);

export default router;
