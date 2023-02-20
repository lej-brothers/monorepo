import { Router } from "express";

import GetController from "./get.controller";
import PostController from "./post.controller";
import { assertRequestInput } from "../../middlewares/assertRequestInput";

const router = Router();

router.get("/:id", GetController.controller);
router.post(
  "/",
  assertRequestInput(PostController.validations),
  PostController.controller
);

export default router;
