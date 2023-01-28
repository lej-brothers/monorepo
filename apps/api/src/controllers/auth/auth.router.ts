import { Router } from "express";
import PostAuth from "./auth.post";
import passport from "passport";
import { assertRequestInput } from "../../middlewares/assertRequestInput";

const router = Router({});

router.post(
  "/",
  assertRequestInput(PostAuth.validations),
  passport.authenticate("authtoken", {
    failureMessage: "Authentication Failed",
  }),
  PostAuth.controller
);

export default router;
