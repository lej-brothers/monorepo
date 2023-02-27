import { Router } from "express";
import ListController from "./list.controller";

const router = Router();

router.get("/", ListController.controller);

export default router;
