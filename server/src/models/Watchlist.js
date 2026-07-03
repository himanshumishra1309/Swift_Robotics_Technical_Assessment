import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
    {
        country: {
            type: String,
            required: true,
            unique: true
        },

        topics: {
            type: [String],
            default: ["GDP", "Inflation", "Employment"]
        },

        sources: {
            type: [String],
            default: ["gnews"]
        },

        competitors: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Watchlist", watchlistSchema);