import { Router } from "express";
import { assertRequestInput } from "../../middlewares/assertRequestInput";
import ListCategory from "./list.controller";
import PostCategory from "./post.controller";

const router = Router({});

router.get(
  "/",
  assertRequestInput(ListCategory.validations),
  ListCategory.controller
);

router.post(
  "/",
  assertRequestInput(PostCategory.validations),
  PostCategory.controller
);

export default router;
