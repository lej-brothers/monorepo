import { Router } from "express";
import PostController from "./post.controller";

const router = Router();

router.post("/", PostController.controller);

export default router;
