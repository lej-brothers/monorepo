import { Router } from "express";
import GetController from "./get.controller";
import ListController from "./list.controller";
import PatchController from "./patch.controller";
import PostController from "./post.controller";
import { assertRequestInput } from "../../middlewares/assertRequestInput";

const router = Router({});

router.get(
  "/",
  assertRequestInput(ListController.validations),
  ListController.controller
);

router.post(
  "/",
  assertRequestInput(PostController.validations),
  PostController.controller
);

router.patch(
  "/:id",
  assertRequestInput(PatchController.validations),
  PatchController.controller
);

router.get(
  "/:id",
  assertRequestInput(GetController.validations),
  GetController.controller
);

export default router;
