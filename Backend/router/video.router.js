import { Router } from "express";
import { handleAllVideos } from "../controller/video.controller.js";
import { authChecker } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/all-video',authChecker,handleAllVideos)

export default router;