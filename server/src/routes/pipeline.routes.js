import { Router } from "express";
import { run } from "../controllers/pipeline.controller.js";

const router = Router();

router.post("/run", run);

export default router;