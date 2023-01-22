import { Router } from "express";

import { assertRequestInput } from "../../middlewares/assertRequestInput";

import ListController from "./list.controller";
import GetController from "./get.controller";
import PostController from './post.controller'

const router = Router();

router.get(
  "/",
  assertRequestInput(ListController.validations),
  ListController.controller
);

router.post('/', assertRequestInput(PostController.validations), PostController.controller)


router.get(
  "/:id",
  assertRequestInput(GetController.validations),
  GetController.controller
);

export default router;
