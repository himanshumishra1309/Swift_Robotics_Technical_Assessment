import { Router } from "express";

import {
    getWatchlist,
    addTopic,
    deleteTopic,
    addSource,
    deleteSource,
    addCompetitor,
    deleteCompetitor,
} from "../controllers/watchlist.controller.js";

const router = Router();

router.get("/", getWatchlist);

router.post("/topic", addTopic);

router.delete("/topic/:value", deleteTopic);

router.post("/source", addSource);

router.delete("/source/:value", deleteSource);

router.post("/competitor", addCompetitor);

router.delete("/competitor/:value", deleteCompetitor);

export default router;