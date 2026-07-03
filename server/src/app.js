import express from "express";
import cors from "cors";
import morgan from "morgan";

import articleRoutes from "./routes/article.routes.js";
import watchlistRoutes from "./routes/watchlist.routes.js";
import pipelineRoutes from "./routes/pipeline.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Economics News Monitoring API"
    });
});

app.use("/api/articles", articleRoutes);

app.use("/api/watchlist", watchlistRoutes);

app.use("/api/pipeline", pipelineRoutes);

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    });
});

export default app;