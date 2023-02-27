import { Router } from "express";

import { assetAuthroized } from "../../middlewares/assetAuthorized";
import { assertRequestInput } from "../../middlewares/assertRequestInput";

import GetController from "./get.controller";
import ListController from "./list.controller";
import PatchController from "./patch.controller";

import momoRouter from "./momo/_.router";

const router = Router();

router.get(
  "/",
  assertRequestInput(ListController.validations),
  ListController.controller
);
router.get("/:id", GetController.controller);

router.patch(
  "/:id",
  assetAuthroized,
  assertRequestInput(PatchController.validations),
  PatchController.controller
);

router.use("/momo", momoRouter);

export default router;
