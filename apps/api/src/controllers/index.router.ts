import { Router } from "express";

import ProductRouter from "./products/product.router";
import VoidRouter from "./void.router";
import AuthRouter from './auth/auth.router'

const router = Router({});

router.use("/void", VoidRouter);
router.use("/products", ProductRouter);
router.use('/auth', AuthRouter)

export default router;
