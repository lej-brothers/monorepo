import { Router } from "express";

import CreatePostController from "./create.post.controller";

const router = Router();

router.post("/create", CreatePostController.controller);

export default router;
