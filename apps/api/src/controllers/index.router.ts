import { Router } from "express";

import ProductRouter from "./products/product.router";
import VoidRouter from "./void.router";

const router = Router({});

router.use("/void", VoidRouter);
router.use("/products", ProductRouter);

export default router;
