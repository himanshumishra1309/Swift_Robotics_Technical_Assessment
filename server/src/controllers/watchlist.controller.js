import Watchlist from "../models/Watchlist.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getWatchlist = asyncHandler(async (req, res) => {
    let watchlist = await Watchlist.findOne({
        country: process.env.DEFAULT_COUNTRY,
    });

    if (!watchlist) {
        watchlist = await Watchlist.create({
            country: process.env.DEFAULT_COUNTRY,
        });
    }

    return res.json(new ApiResponse(200, watchlist));
});

const addTopic = asyncHandler(async (req, res) => {
    const { value } = req.body;

    const watchlist = await Watchlist.findOne({
        country: process.env.DEFAULT_COUNTRY,
    });

    if (!watchlist.topics.includes(value))
        watchlist.topics.push(value);

    await watchlist.save();

    res.json(new ApiResponse(200, watchlist));
});

const deleteTopic = asyncHandler(async (req, res) => {
    const { value } = req.params;

    const watchlist = await Watchlist.findOne({
        country: process.env.DEFAULT_COUNTRY,
    });

    watchlist.topics = watchlist.topics.filter((t) => t !== value);

    await watchlist.save();

    res.json(new ApiResponse(200, watchlist));
});

const addSource = asyncHandler(async (req, res) => {
    const { value } = req.body;

    const watchlist = await Watchlist.findOne({
        country: process.env.DEFAULT_COUNTRY,
    });

    if (!watchlist.sources.includes(value))
        watchlist.sources.push(value);

    await watchlist.save();

    res.json(new ApiResponse(200, watchlist));
});

const deleteSource = asyncHandler(async (req, res) => {
    const { value } = req.params;

    const watchlist = await Watchlist.findOne({
        country: process.env.DEFAULT_COUNTRY,
    });

    watchlist.sources = watchlist.sources.filter((t) => t !== value);

    await watchlist.save();

    res.json(new ApiResponse(200, watchlist));
});

const addCompetitor = asyncHandler(async (req, res) => {
    const { value } = req.body;

    const watchlist = await Watchlist.findOne({
        country: process.env.DEFAULT_COUNTRY,
    });

    if (!watchlist.competitors.includes(value))
        watchlist.competitors.push(value);

    await watchlist.save();

    res.json(new ApiResponse(200, watchlist));
});

const deleteCompetitor = asyncHandler(async (req, res) => {
    const { value } = req.params;

    const watchlist = await Watchlist.findOne({
        country: process.env.DEFAULT_COUNTRY,
    });

    watchlist.competitors =
        watchlist.competitors.filter((t) => t !== value);

    await watchlist.save();

    res.json(new ApiResponse(200, watchlist));
});

export {
    getWatchlist,
    addTopic,
    deleteTopic,
    addSource,
    deleteSource,
    addCompetitor,
    deleteCompetitor,
};