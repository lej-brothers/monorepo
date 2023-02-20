import { Router } from "express";
import PostController from "./post.controller";
import { assertRequestInput } from "middlewares/assertRequestInput";

const router = Router();

router.post(
  "/",
  assertRequestInput(PostController.validations),
  PostController.controller
);

export default router;
