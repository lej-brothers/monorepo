import { Router } from "express";

import CategoryRouter from "./categories/_.router";
import ProductRouter from "./products/_.router";
import ImageRouter from "./images/_.router";
import VoidRouter from "./void.router";
import OrderRouter from "./order/_.router";
import PromotionRouter from "./promotions/_.router";
import AuthRouter from "./auth/_.router";

const router = Router({});

router.use("/void", VoidRouter);
router.use("/products", ProductRouter);
router.use("/orders", OrderRouter);
router.use("/promotions", PromotionRouter);
router.use("/categories", CategoryRouter);
router.use("/image", ImageRouter);
router.use("/auth", AuthRouter);

export default router;
