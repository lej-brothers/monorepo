import { Router } from "express";
import VoidRouter from "./void.router";

const router = Router({});

router.use("/void", VoidRouter);

export default router;