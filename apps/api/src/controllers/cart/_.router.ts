import { Router } from "express";
import GetController from "./get.controller";
import PostController from "./post.controller";

const router = Router();

router.get("/", GetController.controller);
router.post("/", PostController.controller);

export default router;
