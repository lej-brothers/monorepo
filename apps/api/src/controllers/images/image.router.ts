import { Router } from "express";
import Multer from 'multer'
import PostController from './post.controller'

const router = Router();

router.post('/', Multer({storage: Multer.memoryStorage()}).single("upload"), PostController.controller)

export default router;