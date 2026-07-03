import Article from "../models/Article.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getArticles = asyncHandler(async (req, res) => {
    const articles = await Article.find().sort({
        importance: -1,
        publishedAt: -1,
    });

    res.json(new ApiResponse(200, articles));
});

export { getArticles };