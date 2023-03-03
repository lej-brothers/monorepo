import { Router } from "express";
import PostAuth from "./get.controller";
import passport from "passport";

const router = Router({});

router.post(
  "/",
  passport.authenticate("authtoken", {
    failureMessage: "Authentication Failed",
  }),
  PostAuth.controller
);

export default router;