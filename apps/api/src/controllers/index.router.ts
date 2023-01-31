import { Router } from "express";

import CategoryRouter from "./categories/categories.router";
import ProductRouter from "./products/product.router";
import ImageRouter from "./images/image.router";
import VoidRouter from "./void.router";
import AuthRouter from "./auth/auth.router";

const router = Router({});

router.use("/void", VoidRouter);
router.use("/products", ProductRouter);
router.use("/categories", CategoryRouter);
router.use("/image", ImageRouter);
router.use("/auth", AuthRouter);

export default router;
