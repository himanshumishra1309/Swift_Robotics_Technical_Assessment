import fetchNews from "./fetchNews.service.js";
import analyzeArticles from "./gemini.service.js";

import Watchlist from "../models/Watchlist.js";
import Article from "../models/Article.js";

const runPipeline = async () => {
    let watchlist = await Watchlist.findOne({
        country: process.env.DEFAULT_COUNTRY,
    });

    if (!watchlist) {
        watchlist = await Watchlist.create({
            country: process.env.DEFAULT_COUNTRY,
        });
    }

    const news = await fetchNews(
        watchlist.topics,
        watchlist.country
    );

    let fetched = news.length;

    const filtered = [];

    for (const article of news) {
        const exists = await Article.findOne({
            url: article.url,
        });

        if (!exists) filtered.push(article);
    }

    const aiResults = await analyzeArticles(
        filtered,
        watchlist.topics,
        watchlist.competitors
    );

    let kept = 0;

    let discarded = 0;

    for (let i = 0; i < aiResults.length; i++) {
        const result = aiResults[i];

        if (!result.keep) {
            discarded++;
            continue;
        }

        kept++;

        await Article.create({
            ...filtered[i],
            summary: result.summary,
            category: result.category,
            importance: result.importance,
            relatedCompetitor: result.relatedCompetitor,
        });
    }

    return {
        fetched,
        kept,
        discarded,
    };
};

export default runPipeline;